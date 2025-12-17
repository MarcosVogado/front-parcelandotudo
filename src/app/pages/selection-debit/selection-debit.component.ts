import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { fadeUp, slideInRight, staggerFadeList } from '../../animations';
import { Debito, DebitoStatus, DebitosResponse, SelectionDebitService } from './selection-debit.service';

type StepKey = 'consulta' | 'selecao' | 'parcelamento' | 'confirmacao';

@Component({
  selector: 'app-selection-debit',
  templateUrl: './selection-debit.component.html',
  styleUrls: ['./selection-debit.component.scss'],
  animations: [fadeUp, slideInRight, staggerFadeList]
})
export class SelectionDebitComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('renavamInput') renavamInput?: ElementRef<HTMLInputElement>;

  form = this.fb.group({
    renavam: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern(/^[0-9]+$/)]]
  });

  steps: { key: StepKey; label: string; helper: string; icon: string }[] = [
    { key: 'consulta', label: 'Consulta', helper: 'RENAVAM', icon: 'fa-solid fa-magnifying-glass' },
    { key: 'selecao', label: 'Seleção', helper: 'Débitos', icon: 'fa-regular fa-square-check' },
    { key: 'parcelamento', label: 'Parcelamento', helper: 'Opções', icon: 'fa-solid fa-credit-card' },
    { key: 'confirmacao', label: 'Confirmação', helper: 'Resumo', icon: 'fa-regular fa-circle-check' }
  ];

  activeStep = 0;
  state: 'idle' | 'loading' | 'loaded' | 'error' = 'idle';
  parcelando = false;
  consultaError = '';
  copyTooltip = 'Copiar RENAVAM';
  renavamProgress = 0;
  consultaExpanded = true;

  sortDirection: 'asc' | 'desc' = 'asc';
  groupByYear = false;

  debitos: Debito[] = [];
  selection = new Set<string>();
  vehicleSummary: (DebitosResponse & { quantidade: number }) | null = null;

  private sub?: Subscription;
  private copyTimeout?: number;
  private focusTimeout?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: SelectionDebitService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.sub = this.renavamControl.valueChanges?.pipe(debounceTime(80)).subscribe((value) => {
      const digits = (value || '').toString().replace(/\D/g, '').slice(0, 11);
      if (digits !== value) {
        this.renavamControl.setValue(digits, { emitEvent: false });
      }
      this.renavamProgress = Math.min(Math.round((digits.length / 11) * 100), 100);
    });

    const queryRenavam = this.route.snapshot.queryParamMap.get('renavam');
    if (queryRenavam) {
      this.renavamControl.setValue(queryRenavam);
      this.submitConsulta();
    }
  }

  ngAfterViewInit(): void {
    this.focusTimeout = window.setTimeout(() => this.renavamInput?.nativeElement.focus(), 200);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);
    }
  }

  get renavamControl(): FormControl {
    return this.form.get('renavam') as FormControl;
  }

  get isRenavamValid(): boolean {
    return this.renavamControl.valid;
  }

  get allSelected(): boolean {
    return this.debitos.length > 0 && this.selection.size === this.debitos.length;
  }

  get selectedCount(): number {
    return this.selection.size;
  }

  get selectedTotal(): number {
    return this.debitos.filter((d) => this.selection.has(d.id)).reduce((acc, cur) => acc + (cur.valor || 0), 0);
  }

  get selectedVencidosCount(): number {
    return this.debitos.filter((d) => d.status === 'vencido' && this.selection.has(d.id)).length;
  }

  get selectedUpcomingCount(): number {
    return this.debitos.filter((d) => (d.status === 'a-vencer' || d.status === 'hoje') && this.selection.has(d.id)).length;
  }

  get sortDirectionLabel(): string {
    return this.sortDirection === 'asc' ? 'crescente' : 'decrescente';
  }

  get masterCheckboxLabel(): string {
    if (!this.debitos.length) return 'Selecionar todos os débitos';
    if (this.selection.size === 0) return 'Selecionar todos os débitos';
    if (this.selection.size === this.debitos.length) return 'Todos selecionados';
    return `${this.selection.size} de ${this.debitos.length} selecionados`;
  }

  get viewDebitos(): Debito[] {
    const items = [...this.debitos];
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    items.sort((a, b) => {
      const da = new Date(a.vencimento).getTime();
      const db = new Date(b.vencimento).getTime();
      const va = Number.isNaN(da) ? 0 : da;
      const vb = Number.isNaN(db) ? 0 : db;
      if (va !== vb) return (va - vb) * dir;
      return a.descricao.localeCompare(b.descricao) * dir;
    });
    return items;
  }

  get groupedDebitos(): { year: number; items: Debito[]; count: number; total: number; vencidos: number }[] {
    const groups = new Map<number, Debito[]>();
    for (const d of this.viewDebitos) {
      const year = d.anoDebito ?? new Date().getFullYear();
      const current = groups.get(year) ?? [];
      current.push(d);
      groups.set(year, current);
    }

    const years = Array.from(groups.keys()).sort((a, b) => b - a);
    return years.map((year) => {
      const items = groups.get(year) ?? [];
      const total = items.reduce((acc, cur) => acc + (cur.valor || 0), 0);
      const vencidos = items.filter((d) => d.status === 'vencido').length;
      return { year, items, count: items.length, total, vencidos };
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatStatus(status: DebitoStatus): string {
    if (status === 'hoje') return 'Vence hoje';
    if (status === 'a-vencer') return 'A vencer';
    return 'Vencido';
  }

  getBadgeClass(status: DebitoStatus): string {
    if (status === 'hoje') return 'badge success';
    if (status === 'a-vencer') return 'badge warning';
    return 'badge danger';
  }

  onRenavamInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = (input.value || '').replace(/\D/g, '').slice(0, 11);
    input.value = digits;
    this.renavamControl.setValue(digits);
  }

  submitConsulta(): void {
    if (!this.isRenavamValid) {
      this.renavamControl.markAsDirty();
      this.renavamControl.markAsTouched();
      this.message.warning('Informe um RENAVAM válido.');
      return;
    }

    this.state = 'loading';
    this.consultaError = '';
    this.debitos = [];
    this.selection.clear();
    this.vehicleSummary = null;
    this.activeStep = 0;
    this.consultaExpanded = true;

    this.service.getDebitos(this.renavamControl.value).subscribe({
      next: (res) => {
        this.debitos = res.debitos || [];
        this.vehicleSummary = {
          renavam: res.renavam,
          placa: res.placa,
          modelo: res.modelo,
          cor: res.cor,
          ano: res.ano,
          total: res.total,
          vencidos: res.vencidos,
          quantidade: res.quantidade,
          protocol: res.protocol,
          referenceId: res.referenceId,
          debitos: res.debitos
        };
        this.state = 'loaded';
        this.activeStep = 1;
        this.consultaExpanded = false;
        this.message.success('Débitos carregados com sucesso.');
      },
      error: (err) => {
        this.state = 'error';
        this.consultaError = err?.error?.message || 'Não foi possível consultar agora.';
        this.consultaExpanded = true;
        this.message.error(this.consultaError);
      }
    });
  }

  retry(): void {
    this.submitConsulta();
  }

  clear(): void {
    this.form.reset();
    this.debitos = [];
    this.selection.clear();
    this.vehicleSummary = null;
    this.state = 'idle';
    this.activeStep = 0;
    this.renavamProgress = 0;
    this.consultaExpanded = true;
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.debitos.forEach((d) => this.selection.add(d.id));
    } else {
      this.selection.clear();
    }
  }

  toggleItem(event: Event, id: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selection.add(id);
    } else {
      this.selection.delete(id);
    }
  }

  toggleConsultaExpanded(force?: boolean): void {
    this.consultaExpanded = typeof force === 'boolean' ? force : !this.consultaExpanded;
    if (this.consultaExpanded) {
      window.setTimeout(() => this.renavamInput?.nativeElement.focus(), 150);
    }
  }

  toggleSortByVencimento(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  selectOnlyStatus(status: DebitoStatus): void {
    this.selection.clear();
    this.debitos.filter((d) => d.status === status).forEach((d) => this.selection.add(d.id));
  }

  selectOnlyUpcoming(): void {
    this.selection.clear();
    this.debitos.filter((d) => d.status === 'a-vencer' || d.status === 'hoje').forEach((d) => this.selection.add(d.id));
  }

  invertSelection(): void {
    const next = new Set<string>();
    this.debitos.forEach((d) => {
      if (!this.selection.has(d.id)) {
        next.add(d.id);
      }
    });
    this.selection = next;
  }

  trackByDebitoId(_: number, item: Debito): string {
    return item.id;
  }

  trackByGroupYear(_: number, item: { year: number }): number {
    return item.year;
  }

  parcelar(): void {
    if (!this.vehicleSummary || this.selection.size === 0) {
      this.message.info('Selecione ao menos um débito para parcelar.');
      return;
    }

    this.parcelando = true;
    this.service.parcelar(this.vehicleSummary.renavam, Array.from(this.selection)).subscribe({
      next: (res) => {
        this.parcelando = false;
        this.activeStep = 2;
        this.message.success(`${res.message} Protocolo ${res.protocolo}`);
      },
      error: () => {
        this.parcelando = false;
        this.message.error('Não foi possível iniciar o parcelamento agora.');
      }
    });
  }

  copyRenavam(): void {
    if (!this.vehicleSummary?.renavam) return;
    const value = this.vehicleSummary.renavam;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(() => this.copyFeedback());
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.copyFeedback();
    }
  }

  private copyFeedback(): void {
    this.copyTooltip = 'Copiado!';
    this.message.success('RENAVAM copiado.');
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    this.copyTimeout = window.setTimeout(() => {
      this.copyTooltip = 'Copiar RENAVAM';
    }, 1600);
  }
}

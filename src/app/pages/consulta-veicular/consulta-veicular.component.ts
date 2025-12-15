import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fadeUp, slideInRight, staggerFadeList } from '../../animations';

@Component({
  selector: 'app-consulta-veicular',
  templateUrl: './consulta-veicular.component.html',
  styleUrls: ['./consulta-veicular.component.scss'],
  animations: [fadeUp, slideInRight, staggerFadeList]
})
export class ConsultaVeicularComponent implements OnInit, AfterViewInit, OnDestroy {
  discoveries = [
    { icon: 'fa-solid fa-ticket', label: 'Multas', detail: 'Pendentes e em aberto' },
    { icon: 'fa-solid fa-receipt', label: 'Débitos IPVA', detail: 'Inclui anos em aberto' },
    { icon: 'fa-solid fa-id-card', label: 'Licenciamento', detail: 'Taxa e atrasos' },
    { icon: 'fa-solid fa-file-invoice-dollar', label: 'Taxas em aberto', detail: 'Demais débitos do veículo' }
  ];

  highlights = [
    { icon: 'fa-solid fa-shield', title: 'Dados Oficiais', desc: 'Informações direto da base do DETRAN' },
    { icon: 'fa-solid fa-stopwatch', title: 'Consulta Rápida', desc: 'Resultado em poucos segundos' },
    { icon: 'fa-solid fa-file-lines', title: 'Histórico Completo', desc: 'Multas, débitos e restrições' },
    { icon: 'fa-solid fa-lock', title: '100% Seguro', desc: 'Seus dados protegidos' }
  ];

  stats = [
    { icon: 'fa-solid fa-people-group', target: 120000, label: 'veículos consultados', format: 'k-plus' as const },
    { icon: 'fa-regular fa-star', target: 4.9, label: 'avaliação média', format: 'decimal' as const, decimals: 1 },
    { icon: 'fa-solid fa-arrow-trend-up', target: 98, label: 'satisfação', format: 'percent' as const }
  ];
  displayStats: number[] = [];
  private metricsObserver?: IntersectionObserver;
  private hasAnimatedMetrics = false;
  private highlightsObserver?: IntersectionObserver;
  private focusTimeout?: number;
  highlightVisible = false;

  @ViewChild('metricsSection') metricsSection?: ElementRef<HTMLElement>;
  @ViewChild('highlightsSection') highlightsSection?: ElementRef<HTMLElement>;
  @ViewChild('renavamInput') renavamInput?: ElementRef<HTMLInputElement>;
  renavamValue = '';
  renavamError = '';
  renavamTouched = false;

  testimonials = [
    {
      initials: 'CM',
      name: 'Carlos M.',
      location: 'São Paulo, SP',
      quote: 'Consegui parcelar o IPVA atrasado em 12x. Muito prático!',
      image: 'assets/images/homem-perfil-1.jpg',
      rating: 5
    },
    {
      initials: 'AS',
      name: 'Ana Paula S.',
      location: 'Rio de Janeiro, RJ',
      quote: 'Descobri multas que nem sabia que tinha. Site confiável.',
      image: 'assets/images/mulher-perfil-2.jpg',
      rating: 5
    },
    {
      initials: 'RF',
      name: 'Roberto F.',
      location: 'Belo Horizonte, MG',
      quote: 'Atendimento rápido e informações precisas. Recomendo!',
      image: 'assets/images/homem-perfil-2.jpg',
      rating: 4
    }
  ];

  steps = [
    {
      step: 'Passo 01',
      title: 'Consulte seu veículo',
      desc: 'Digite o RENAVAM do seu veículo para iniciar a consulta. É rápido e fácil!',
      icon: 'fa-solid fa-magnifying-glass'
    },
    {
      step: 'Passo 02',
      title: 'Acesse as informações',
      desc: 'Visualize os débitos do veículo: pendências, multas e restrições.',
      icon: 'fa-solid fa-file-lines'
    },
    {
      step: 'Passo 03',
      title: 'Parcele em até 18x',
      desc: 'Quite as pendências do veículo com pagamento seguro e parcelado.',
      icon: 'fa-solid fa-credit-card'
    }
  ];

  faqs = [
    {
      question: 'O que é o RENAVAM?',
      answer:
        'O RENAVAM (Registro Nacional de Veículos Automotores) é um código único, normalmente com 11 dígitos, que funciona como o "CPF" do veículo e reúne o histórico e a situação atual.'
    },
    {
      question: 'Onde encontro o RENAVAM do meu veículo?',
      answer: 'No CRLV/CRV (documento do veículo) ou em apps do Detran do seu estado.'
    },
    { question: 'As informações são atualizadas?', answer: 'Sim, consultamos bases oficiais (Denatran/Serpro/Detran) em tempo real.' },
    { question: 'A consulta é gratuita?', answer: 'A verificação de débitos é gratuita; você só paga se optar por quitar/parcelar.' },
    { question: 'É seguro fazer pagamentos pelo site?', answer: 'Usamos ambiente seguro, criptografia e não armazenamos o RENAVAM.' },
    { question: 'Posso parcelar multas e IPVA atrasado?', answer: 'Sim, após a consulta você pode parcelar multas, IPVA e taxas pendentes.' }
  ];

  openFaqIndex: number | null = 0;

  ngOnInit(): void {
    this.displayStats = this.stats.map(() => 0);
  }

  ngAfterViewInit(): void {
    this.focusTimeout = window.setTimeout(() => {
      this.renavamInput?.nativeElement.focus();
    });

    if (this.metricsSection?.nativeElement) {
      this.metricsObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.hasAnimatedMetrics) {
            this.hasAnimatedMetrics = true;
            this.animateStats();
            this.metricsObserver?.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      this.metricsObserver.observe(this.metricsSection.nativeElement);
    }

    if (this.highlightsSection?.nativeElement) {
      this.highlightsObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.highlightVisible) {
            this.highlightVisible = true;
            this.highlightsObserver?.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      this.highlightsObserver.observe(this.highlightsSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.metricsObserver?.disconnect();
    this.highlightsObserver?.disconnect();

    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);
    }
  }

  toggleFaq(idx: number): void {
    this.openFaqIndex = this.openFaqIndex === idx ? null : idx;
  }

  clearRenavam(input: HTMLInputElement): void {
    input.value = '';
    this.renavamValue = '';
    this.renavamTouched = false;
    this.renavamError = '';
  }

  getFormattedStat(index: number): string {
    const stat = this.stats[index];
    const value = this.displayStats[index] ?? 0;

    if (stat.format === 'k-plus') {
      return `+${Math.round(value / 1000)}k`;
    }

    if (stat.format === 'percent') {
      return `${Math.round(value)}%`;
    }

    if (stat.format === 'decimal') {
      const decimals = stat.decimals ?? 1;
      return value.toFixed(decimals);
    }

    return Math.round(value).toString();
  }

  private animateStats(): void {
    const duration = 1600;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.displayStats = this.stats.map((stat, idx) => {
        const target = stat.target ?? 0;
        return idx === 1 ? Number((target * eased).toFixed(2)) : target * eased;
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.displayStats = this.stats.map((stat) => stat.target ?? 0);
      }
    };

    requestAnimationFrame(step);
  }

  onRenavamInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = (input.value || '').replace(/\D/g, '').slice(0, 11);
    this.renavamValue = digits;
    input.value = digits;
    this.renavamTouched = true;
    this.validateRenavam();
  }

  private validateRenavam(): void {
    if (!this.renavamTouched) {
      this.renavamError = '';
      return;
    }

    if (!this.renavamValue) {
      this.renavamError = 'Informe o RENAVAM.';
      return;
    }

    if (this.renavamValue.length < 9) {
      this.renavamError = 'O RENAVAM deve ter pelo menos 9 dígitos.';
      return;
    }

    if (this.renavamValue.length > 11) {
      this.renavamError = 'O RENAVAM deve ter no máximo 11 dígitos.';
      return;
    }

    this.renavamError = '';
  }

  get isRenavamValid(): boolean {
    return !this.renavamError && this.renavamValue.length >= 9 && this.renavamValue.length <= 11;
  }
}

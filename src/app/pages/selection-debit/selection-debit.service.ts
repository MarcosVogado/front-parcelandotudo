import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type DebitoStatus = 'vencido' | 'a-vencer' | 'hoje';

export interface Debito {
  id: string;
  renavam: string;
  placa: string;
  modelo: string;
  cor: string;
  ano: number;
  descricao: string;
  anoDebito: number;
  vencimento: string;
  valor: number;
  status: DebitoStatus;
}

export interface DebitosResponse {
  renavam: string;
  placa?: string;
  modelo?: string;
  cor?: string;
  ano?: number;
  quantidade: number;
  total: number;
  vencidos: number;
  debitos: Debito[];
  protocol?: string;
  referenceId?: string;
}

@Injectable({ providedIn: 'root' })
export class SelectionDebitService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDebitos(renavam: string): Observable<DebitosResponse> {
    const params = new HttpParams().set('renavam', renavam);
    return this.http.get<any>(`${this.baseUrl}/debitos`, { params }).pipe(
      // Normaliza formato real: { debtList, itemCount, totalAmount, protocol, referenceId, ... }
      map((res: any) => {
        const debtList = Array.isArray(res?.debtList) ? res.debtList : [];
        const sorted: Debito[] = debtList.map((d: any) => ({
          id: String(d.debitId ?? d.id ?? ''),
          renavam,
          placa: res.plate ?? '',
          modelo: res.model ?? '',
          cor: res.color ?? '',
          ano: res.vehicleYear ?? d.year ?? new Date().getFullYear(),
          descricao: d.itemDescription ?? '',
          anoDebito: d.year ?? d.anoDebito ?? new Date().getFullYear(),
          vencimento: d.dueDate ?? d.paymentDueDate ?? '',
          valor: d.total ?? 0,
          status: this.mapStatusCode(d.statusCode)
        }));

        const total = res.totalAmount ?? sorted.reduce((acc: number, cur: Debito) => acc + (cur.valor || 0), 0);
        const vencidos = sorted.filter((d) => d.status === 'vencido').length;

        return {
          renavam,
          placa: res.plate ?? '',
          modelo: res.model ?? '',
          cor: res.color ?? '',
          ano: res.vehicleYear ?? sorted[0]?.ano ?? new Date().getFullYear(),
          quantidade: res.itemCount ?? sorted.length,
          total,
          vencidos,
          debitos: sorted,
          protocol: res.protocol,
          referenceId: res.referenceId
        } as DebitosResponse;
      })
    );
  }

  parcelar(renavam: string, ids: string[]): Observable<{ message: string; protocolo: string }> {
    return this.http.post<{ message: string; protocolo: string }>(`${this.baseUrl}/parcelar`, { renavam, ids });
  }

  private mapStatusCode(statusCode: string | undefined): DebitoStatus {
    if (!statusCode) return 'a-vencer';
    const code = statusCode.toUpperCase();
    if (['VENC', 'VCD', 'VENCIDO'].includes(code)) return 'vencido';
    if (['HOJE'].includes(code)) return 'hoje';
    // PCR e demais códigos tratados como a vencer
    return 'a-vencer';
  }
}

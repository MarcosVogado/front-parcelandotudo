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
  placa: string;
  modelo: string;
  cor: string;
  ano: number;
  quantidade: number;
  total: number;
  vencidos: number;
  debitos: Debito[];
}

@Injectable({ providedIn: 'root' })
export class SelectionDebitService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDebitos(renavam: string): Observable<DebitosResponse> {
    const params = new HttpParams().set('renavam', renavam);
    return this.http.get<DebitosResponse | Debito[]>(`${this.baseUrl}/debitos`, { params }).pipe(
      // Normaliza caso o backend retorne direto o array do json-server
      map((res: DebitosResponse | Debito[]) => {
        if (Array.isArray(res)) {
          const sorted = [...res].sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime());
          const total = sorted.reduce((acc, cur) => acc + (cur.valor || 0), 0);
          const vencidos = sorted.filter((d) => d.status === 'vencido').length;
          const vehicle = sorted[0] as Debito | undefined;
          return {
            renavam: vehicle?.renavam ?? renavam,
            placa: vehicle?.placa ?? '',
            modelo: vehicle?.modelo ?? '',
            cor: vehicle?.cor ?? '',
            ano: vehicle?.ano ?? new Date().getFullYear(),
            quantidade: sorted.length,
            total,
            vencidos,
            debitos: sorted
          };
        }
        return res;
      })
    );
  }

  parcelar(renavam: string, ids: string[]): Observable<{ message: string; protocolo: string }> {
    return this.http.post<{ message: string; protocolo: string }>(`${this.baseUrl}/parcelar`, { renavam, ids });
  }
}

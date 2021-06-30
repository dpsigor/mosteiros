import { IMosteiro } from '@mosteiros/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  mosteiros$ = new BehaviorSubject<MosteiroJ[]>([]);

  constructor(private readonly http: HttpClient) {}

  async loadMosteiros() {
    this.http.get<{ mosteiros: IMosteiro[] }>(`${environment.apiUrl}/mosteiros`)
    .subscribe(res => {
      const mjs = res.mosteiros.map(m => {
        // const json = Array.from(new Set(JSON.stringify(m).split(''))).toString();
        let resumo = '';
        resumo += m.nome;
        resumo += m.logradouro;
        resumo += m.bairro;
        resumo += m.cidade;
        resumo += m.uf;
        resumo += m.cep;
        resumo = resumo.replace(/\s/g, '').toLowerCase();
        return { ...m, resumo };
      });
      this.mosteiros$.next(mjs);
    });
  }

  getMosteirosListener(): Observable<MosteiroJ[]> {
    return this.mosteiros$.asObservable();
  }
}

interface ObjResumo { resumo: string };
export type MosteiroJ = IMosteiro & ObjResumo;

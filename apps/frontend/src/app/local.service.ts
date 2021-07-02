import { Injectable } from '@angular/core';
import { IMosteiro, MosteiroJ } from '@mosteiros/core';
import mosteiros from '../assets/mosteiros.json';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  mosteiros: MosteiroJ[] = [];

  getMosteiros(): MosteiroJ[] {
    // mosteiros.forEach(obj => {
    //   const m: IMosteiro = {
    //     nome: obj.nome,
    //     bairro: obj.bairro,

    //   }
    // })
    this.mosteiros = mosteiros.map(m => this.fillResumo(m));
    return this.mosteiros;
  }

  fillResumo(m: IMosteiro): MosteiroJ {
    let resumo = '';
    resumo += m.nome;
    resumo += m.logradouro;
    resumo += m.bairro;
    resumo += m.cidade;
    resumo += m.uf;
    resumo += m.cep;
    resumo = resumo.replace(/\s/g, '').toLowerCase();
    return { ...m, resumo };
  }
}

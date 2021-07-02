import { Injectable } from '@angular/core';
import { mosteirosCSV, IMosteiro } from '@mosteiros/core';
import { MosteiroJ } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  mosteiros: MosteiroJ[] = [];

  getMosteiros(): MosteiroJ[] {
    const ms = mosteirosCSV.split('\n').map(row => {
      const raw = row.split(';');
      const d = raw.map(r => r.trim());
      if (!d[0]) return null;
      const m: IMosteiro = {
        nome: d[0],
        logradouro: d[1] || '',
        bairro: d[2] || '',
        cep: d[3] || '',
        cidade: d[4] || '',
        emails: d[5] && d[5].split(' ').filter(x => !!x && x.length > 5) || [],
        telefones: d[6] && d[6].split(' ').filter(x => !!x && x.length > 5) || [],
        sites: d[7] && d[7].split(' ').filter(x => !!x && x.length > 5).map(s => s.replace(/\?.*/, '')) || [],
        uf:  d[8] || '',
        lat: parseFloat(d[9]),
        lng: parseFloat(d[10]),
        foto: d[11] || '',
      }
      return m;
    });
    for (const m of ms) {
      if (m) this.mosteiros.push(this.fillResumo(m));
    };
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

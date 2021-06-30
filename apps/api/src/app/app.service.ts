import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mosteiro, MosteiroDocument } from './Models/Mosteiro';
import { mosteirosCSV } from '@mosteiros/core';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('Mosteiro') private readonly mosteiroModel: Model<Mosteiro>,
  ) {}

  async onModuleInit() {
    try {
      // await this.mosteiroModel.deleteMany({});
      const notEmpty = await this.mosteiroModel.findOne();
      if (notEmpty) return;
      const rows = mosteirosCSV.split('\n');
      const mosteiros: Mosteiro[] = [];
      rows.forEach(row => {
        const raw = row.split(';');
        const d = raw.map(r => r.trim());
        const m = new Mosteiro();
        m.nome = d[0] || '';
        if (!m.nome) return;
        m.logradouro = d[1] || '';
        m.bairro = d[2] || '';
        m.cep = d[3] || '';
        m.cidade = d[4] || '';
        m.emails = d[5] && d[5].split(' ').filter(x => !!x && x.length > 5) || [];
        m.telefones = d[6] && d[6].split(' ').filter(x => !!x && x.length > 5) || [];
        m.sites = d[7] && d[7].split(' ').filter(x => !!x && x.length > 5).map(s => s.replace(/\?.*/, '')) || [];
        m.uf =  d[8] || '';
        m.foto = d[9] || '';
        mosteiros.push(m);
      });
      const res = await this.mosteiroModel.insertMany(mosteiros);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }

  async allMosteiros(): Promise<MosteiroDocument[]> {
    const docs = await this.mosteiroModel.find();
    return docs;
  }
}

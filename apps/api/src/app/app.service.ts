import { Model } from 'mongoose';
import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mosteiro, MosteiroDocument } from './Models/Mosteiro';
import { mosteirosCSV } from '@mosteiros/core';
import { writeFileSync } from 'fs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('Mosteiro') private readonly mosteiroModel: Model<Mosteiro>,
    private readonly httpService: HttpService,
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
        if (d[9]) m.lat = parseFloat(d[9]);
        if (d[10]) m.lng = parseFloat(d[10]);
        m.foto = d[11] || '';
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

  async cepToCoords(cep: string) {
    const token = 'alou';
    const url = 'https://www.cepaberto.com/api/v3/cep';
    const options = {
      headers: {'Authorization': `Token token=${token}`},
      params: {
        cep: cep.replace(/-/g, ''),
      },
    };
    const res = await this.httpService.get<CepAbertoRes>(url, options).toPromise();
    const lat = res.data.latitude;
    const lng = res.data.longitude;
  }
}


interface CepAbertoRes {
  altitude: number;
  cep: string,
  latitude: string,
  longitude: string,
  logradouro: string,
  bairro: string,
  cidade: { ddd: number, ibge: string, nome: string },
  estado: { sigla: string }
}

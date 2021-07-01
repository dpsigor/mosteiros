import { IMosteiro } from '@mosteiros/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MosteiroDocument = Mosteiro & Document;

@Schema()
export class Mosteiro implements IMosteiro {
  @Prop()
  nome: string;

  @Prop()
  logradouro: string;

  @Prop()
  bairro: string;

  @Prop()
  cep: string;

  @Prop()
  cidade: string;

  @Prop()
  emails: string[];

  @Prop()
  telefones: string[];

  @Prop()
  sites: string[];

  @Prop()
  uf: string;

  @Prop()
  foto: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

export const MosteiroSchema = SchemaFactory.createForClass(Mosteiro);

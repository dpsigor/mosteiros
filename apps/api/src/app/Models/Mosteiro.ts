import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MosteiroDocument = Mosteiro & Document;

@Schema()
export class Mosteiro {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const MosteiroSchema = SchemaFactory.createForClass(Mosteiro);

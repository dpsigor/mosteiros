import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mosteiro, MosteiroDocument } from './Models/Mosteiro';
import { libName } from '@dpdev/mosteiros';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('Mosteiro') private readonly mosteiroModel: Model<Mosteiro>,
  ) {}

  async onModuleInit() {
    try {
      console.log(libName);
      // const isEmpty = await this.mosteiroModel.findOne();
      // if (!isEmpty) return;
      // const mosteiros = 
    } catch (e) {
      console.error(e);
    }
  }

  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }
}

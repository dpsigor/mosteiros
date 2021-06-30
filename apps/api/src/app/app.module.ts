import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mosteiro, MosteiroSchema } from './Models/Mosteiro';

@Module({
  imports: [
    MongooseModule.forRoot(environment.dbUri),
    MongooseModule.forFeature([
      { name: Mosteiro.name, schema: MosteiroSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

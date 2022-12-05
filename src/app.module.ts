import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [MedicationModule,MongooseModule.forRoot('mongodb://localhost:27017/m4q')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

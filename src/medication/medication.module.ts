import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicationController } from './medication.controller';
import { Medication, MedicationSchema } from './schema/medication.schema';
import { MedicationService } from './medication.service';
import { GetMedMiddleware } from './getMed.middleware';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medication.name, schema: MedicationSchema },
    ]),
  ],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetMedMiddleware).forRoutes(MedicationController);
  }
}

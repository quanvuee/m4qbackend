import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument  } from 'mongoose';

export type MedicationDocument = HydratedDocument<Medication>;

@Schema()
class Dosage {
    @Prop()
    value: number;
    @Prop()
    unit: string;
}
@Schema()
class Treatment {
    @Prop()
    name: string;
    @Prop()
    method: string;
    @Prop()
    frequency: string;
    @Prop()
    dosage: Dosage;
    @Prop()
    total: Dosage;
}

@Schema()
export class Medication {
  @Prop()
  conclution: string;

  @Prop()
  time: number;

  @Prop([String])
  symptoms: string[];

  @Prop()
  treatment: Treatment[];
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);
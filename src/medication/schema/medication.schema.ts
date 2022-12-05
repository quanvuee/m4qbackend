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
  name: string;

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

// interface Medication {
//     conclution: string,
//     time: number,
//     symptoms: string[],
//     treatment: [{ name: string }]
// }

// export type MedicationDocument = HydratedDocument<Medication>;

// export const MedicationSchema = new mongoose.Schema({
//     conclution: String,
//     time: {type: Date, default: Date.now},
//     symptoms: [String],
//     treatment: [{ name: String }]
// })
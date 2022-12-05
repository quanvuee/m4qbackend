import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicaionDto } from './dto/create-medication';
import { Medication, MedicationDocument } from './schema/medication.schema';

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication.name) private medModel: Model<MedicationDocument>,
  ) {}
  async create(createMedDto: CreateMedicaionDto): Promise<Medication> {
    const createMed = await this.medModel.create(createMedDto);
    return createMed;
  }
  async findAll(): Promise<Medication[]> {
    return this.medModel.find().exec();
  }
  async delete(id: string) {
    const deleteMed = await this.medModel.findByIdAndRemove({ _id: id }).exec();
    return deleteMed;
  }
}

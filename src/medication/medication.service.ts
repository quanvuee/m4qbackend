import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MergeType, Model } from 'mongoose';
import { CreateMedicaionDto } from './dto/create-medication';
import { Medication, MedicationDocument } from './schema/medication.schema';

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication.name) private medModel: Model<MedicationDocument>,
  ) {}
  async create(createMedDto: CreateMedicaionDto): Promise<MedicationDocument> {
    const createMed = await this.medModel.create(createMedDto);
    return createMed;
  }
  async findAll(): Promise<MedicationDocument[]> {
    return this.medModel.find().exec();
  }
  async findOne(id: string): Promise<MedicationDocument> {
    return await this.medModel.findById(id);
  }
  async editMed(
    medDto: CreateMedicaionDto,
    med: MedicationDocument,
  ): Promise<MedicationDocument> {
    med = Object.assign(med, medDto);
    return await med.save();
  }
  async delete(med: MedicationDocument) {
    await med.remove();
  }
}

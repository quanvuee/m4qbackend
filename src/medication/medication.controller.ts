import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { get } from 'http';
import { CreateMedicaionDto } from './dto/create-medication';
import { CustomRequest } from './getMed.middleware';
import { MedicationService } from './medication.service';
import { Medication } from './schema/medication.schema';

@Controller('medication')
export class MedicationController {
  constructor(private medService: MedicationService) {}

  @Post()
  async create(@Body() createMedDto: CreateMedicaionDto) {
    this.medService.create(createMedDto);
  }

  @Get()
  async findAll(): Promise<Medication[]> {
    return this.medService.findAll();
  }

  @Get(':id')
  async findMed(@Req() req: CustomRequest): Promise<Medication> {
    return req.medication;
  }

  @Patch(':id')
  async editMed(
    @Body() medDto: CreateMedicaionDto,
    @Req() req: CustomRequest,
  ): Promise<Medication> {
    return this.medService.editMed(medDto, req.medication);
  }
  
  @Delete(':id')
  async delete(@Req() req: CustomRequest) {
    return this.medService.delete(req.medication);
  }
}

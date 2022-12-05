import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateMedicaionDto } from './dto/create-medication';
import { MedicationService } from './medication.service';
import { Medication } from './schema/medication.schema';

@Controller('medication')
export class MedicationController {
    constructor(private medService: MedicationService){}

    @Post()
    async create(@Body() createMedDto: CreateMedicaionDto) {
        this.medService.create(createMedDto);
    }

    @Get()
    async findAll():Promise<Medication[]>{
        return this.medService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.medService.delete(id);
    }
}

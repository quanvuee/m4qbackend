import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { MedicationService } from "./medication.service";
import { MedicationDocument } from "./schema/medication.schema";

export interface CustomRequest extends Request {
    medication: MedicationDocument
}

@Injectable()
export class GetMedMiddleware implements NestMiddleware {
    constructor(private readonly medService: MedicationService){}
    async use(req: CustomRequest, res: Response, next: NextFunction){
        const med = await this.medService.findOne(req.params.id);
        req.medication = med;
        next();
    }
}
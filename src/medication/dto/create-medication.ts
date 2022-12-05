export class CreateMedicaionDto {
  readonly conclution: string;
  readonly time: number;
  readonly symptoms: string[];
  readonly treatment: [{ 
    name: string,
    method: string;
    frequency: string;
    dosage: {
      value: number;
      unit: string;
    };
    total: {
      value: number;
      unit: string;
    };
  }];
}

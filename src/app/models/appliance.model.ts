// models/appliance.model.ts

export interface Appliance {
  id?: number;
  serialNumber: string;
  brand: string;
  model: string;
  status: string;
  dateBought: string;
}

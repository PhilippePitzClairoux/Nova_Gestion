import {Maintenance} from './maintenance';
import {Model} from './model';

export class Machine {
  idMachine: number;
  name: string;
  acquisitionDate: Date;
  serialNumber: string;
  model: Model;
  maintenances: Maintenance[];
}

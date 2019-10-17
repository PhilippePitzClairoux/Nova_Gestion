import {CoolantHole} from './coolant-hole';
import {Grade} from './grade';

export class Blank {
  idBlank: number;
  name: string;
  stockQuantity: number;
  minimumQuantity: number;
  diameter: number;
  length: number;
  grade: Grade;
  coolantHole: CoolantHole;
}

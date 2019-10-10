import {Client} from './client';

export class Tool {
  id: number;
  name: string;
  stockQuantity: number;
  minimumQuantity: number;
  client: Client;
}

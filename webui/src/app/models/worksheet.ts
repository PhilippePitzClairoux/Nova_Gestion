import {Client} from './client';
import {Status} from './status';

export class Worksheet {
  public idWorkSheet: number;
  public quantity: number;
  public orderNumber: string;
  public dueDate: Date;
  public dateCreation: Date;
  public client: Client;
  public status: Status;
  //public program: Program;
}

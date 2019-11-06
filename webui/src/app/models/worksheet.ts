import {Client} from './client';

export class Worksheet {
  public idWorkSheet: number;
  public quantity: number;
  public orderNumber: string;
  public dueDate: Date;
  public dateCreation: Date;
  public client: Client;
  //public program: Program;
}

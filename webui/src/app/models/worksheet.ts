import {Client} from './client';
import {Status} from './status';
import {Program} from './program.model';
import {Task} from './task';

export class Worksheet {
  public idWorkSheet: number;
  public quantity: number;
  public orderNumber: string;
  public dueDate: Date;
  public dateCreation: Date;
  public client: Client;
  public status: Status;
  public program: Program;
  public tasks: Task[];
}

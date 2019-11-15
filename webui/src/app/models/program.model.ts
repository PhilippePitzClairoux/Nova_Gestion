import { Tool } from './tool';
import { Machine } from './machine';
import { Client } from './client';
import { Blank } from './blank';

export class Program {
  public idProgram?: number;
  public name: string;
  public machine: Machine;
  public file: string;
  public blank: Blank;
  public tool: Tool;
  public clients: Client[];

}

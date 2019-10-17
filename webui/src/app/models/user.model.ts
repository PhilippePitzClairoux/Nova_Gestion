import { Employee } from './employee.model';
import { TypeUser } from './user-type.model';

export class User {
  public idUser?: number;
  public email: string;
  public password: string;
  public typeUser: TypeUser;
  public employee: Employee;
}

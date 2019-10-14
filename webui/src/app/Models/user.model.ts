import { Employee } from './employee.model';
import { UserType } from './user-type.model';

export class User {
  public id: number;
  public email: string;
  public password: string;
  public typeUser: UserType;
  public employee: Employee;
}

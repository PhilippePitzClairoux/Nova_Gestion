import {TaskType} from './task-type';
import {User} from './user.model';

export class Task {
  idTask: number;
  startTime: string;
  endTime: string;
  taskType: TaskType;
  idWorkSheet: number;
  duration: string;
  user: User;
}

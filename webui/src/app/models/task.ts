import {TaskType} from './task-type';

export class Task {
  idTask: number;
  startTime: Date;
  endTime: Date;
  taskType: TaskType;
  idWorkSheet: number;
  duration: number;
}

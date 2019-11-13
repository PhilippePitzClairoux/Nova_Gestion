import {TaskType} from './task-type';

export class Task {
  idTask: number;
  startTime: string;
  endTime: string;
  taskType: TaskType;
  idWorkSheet: number;
  duration: number;
}

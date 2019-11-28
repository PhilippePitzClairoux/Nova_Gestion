import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {TaskType} from '../../models/task-type';
import {TaskService} from '../../services/task.service';
import {countUpTimerConfigModel, CountupTimerService, timerTexts} from 'ngx-timer';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WorksheetService} from '../../services/worksheet.service';
import {Worksheet} from '../../models/worksheet';
import {ToastrService} from 'ngx-toastr';
import {Status} from '../../models/status';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  @Input() set tasks(value: Task[]) {
    this.tasksSubject.next(value);
  }

  get tasks() {
    return this.tasksSubject.getValue();
  }

  constructor(
    private worksheetService: WorksheetService,
    private taskService: TaskService,
    private timerService: CountupTimerService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  taskTypes: TaskType[] = [];
  taskForm: FormGroup;
  task: Task;

  timerConfig: countUpTimerConfigModel;
  timerRunning = false;
  selectedIndex: number;
  endTime = '';
  startTime = '';

  displayedColumns = ['taskType', 'employee', 'start', 'end', 'duration', 'controls'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  @Input() idWorkSheet: number;

  private static getTime(time: string): string {
    const temp = new Date(time);
    const date =  new Date(Date.UTC(temp.getUTCFullYear(), temp.getUTCMonth(), temp.getUTCDate(),
      temp.getUTCHours(), temp.getUTCMinutes(), temp.getUTCSeconds()));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ':' + minutes;
  }

  private static setTime(input: string): Date {
    const time = input.split(':');
    const hour = time[0];
    const minutes = time[1];
    const today = new Date(Date.now());
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(hour), Number(minutes), 0);
  }

  private static getDuration(task: Task) {
    const start = new Date(task.startTime);
    const end = new Date(task.endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    task.duration = diffHrs + ':' + diffMins;
  }

  ngOnInit(): void {
    this.selectedIndex = null;
    this.tasksSubject.subscribe(data => {
      if (data) {
        data.forEach(task => {
          TasksComponent.getDuration(task);
        });
        this.setDataSource(data);
      }
    });
    this.initializeForm();
    this.configurationTimer();
    this.getTaskTypes();
  }

  ngOnDestroy(): void {
    this.tasksSubject.unsubscribe();
  }

  private setDataSource(data: Task[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  private initializeForm() {
    this.taskForm = new FormGroup({
      taskType: new FormControl('', Validators.required),
      time: new FormControl('')
    });
  }

  private getTaskTypes() {
    this.taskService.getAllTypes().subscribe(types => {
      this.taskTypes = types;
    });
  }

  start() {
    this.timerRunning = true;
    const date = new Date();
    this.task = new Task();
    this.task.startTime = date.toISOString();
    date.setHours(date.getHours());
    this.timerService.startTimer(date);
  }

  private stop() {
    this.timerRunning = false;
    this.task.endTime = new Date().toISOString();
    this.task.idWorkSheet = this.idWorkSheet;
    this.timerService.stopTimer();
    TasksComponent.getDuration(this.task);
  }

  private configurationTimer() {
    this.timerConfig = new countUpTimerConfigModel();
    this.timerConfig.timerClass = 'timer';
    this.timerConfig.timerTexts = new timerTexts();
    this.timerConfig.timerTexts.hourText = ':';
    this.timerConfig.timerTexts.minuteText = ':';
    this.timerConfig.timerTexts.secondsText = ' ';
  }

  saveTask() {
      if (this.taskForm.valid) {
        if (this.taskForm.dirty) {
          this.stop();
          this.task.taskType = this.taskForm.controls.taskType.value;
          this.taskService.add(this.task).subscribe(data => {
            this.getTasks();
          });
        }
    } else {
      this.validateAllFields(this.taskForm);
    }
  }

  deleteTask(idTask: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cette tâche?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(idTask).subscribe(res => {
          this.getTasks();
        });
      }
    });
  }

  editTask(task: Task) {
    this.selectedIndex = task.idTask;
    this.startTime = TasksComponent.getTime(task.startTime);
    this.endTime = TasksComponent.getTime(task.endTime);
  }

  updateTask(task: Task) {
    this.selectedIndex = null;

    task.startTime = TasksComponent.setTime(this.startTime).toISOString();
    task.endTime = TasksComponent.setTime(this.endTime).toISOString();
    TasksComponent.getDuration(task);

    this.taskService.update(task).subscribe(res => {
      this.getTasks();
    });
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  private getTasks() {
    this.taskService.getWorksheetTasks(this.idWorkSheet).subscribe(tasks => {
      tasks.forEach(task => {
        TasksComponent.getDuration(task);
      });
      this.setDataSource(tasks);
    });
  }
}

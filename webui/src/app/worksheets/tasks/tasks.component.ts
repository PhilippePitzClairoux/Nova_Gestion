import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {TaskType} from '../../models/task-type';
import {TaskService} from '../../services/task.service';
import {countUpTimerConfigModel, CountupTimerService, timerTexts} from 'ngx-timer';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  taskTypes: TaskType[] = [];
  taskForm: FormGroup;
  task: Task;

  timerConfig: countUpTimerConfigModel;
  timerRunning = false;
  selectedIndex: number;
  endTime: any;
  startTime: any;

  displayedColumns = ['taskType', 'employee', 'start', 'end', 'duration', 'controls'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  @Input() idWorkSheet: number;

  @Input() set tasks(value: Task[]) {
    this.tasksSubject.next(value);
  }

  get tasks() {
    return this.tasksSubject.getValue();
  }

  constructor(
    private taskService: TaskService,
    private timerService: CountupTimerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.tasksSubject.subscribe(data => {
      console.log(data);
      if (data) {
        data.forEach(task => {
          const start = new Date(task.startTime);
          const end = new Date(task.endTime);
          task.duration = end.getTime() - start.getTime();
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
    const start = new Date(this.task.startTime);
    const end = new Date(this.task.endTime);
    this.task.duration = end.getTime() - start.getTime();
    this.tasks.push(this.task);
    this.setDataSource(this.tasks);
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
        this.taskService.add(this.task).subscribe();
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
          const index = this.tasks.findIndex(task => task.idTask === idTask);
          this.tasks.splice(index, 1);
          this.setDataSource(this.tasks);
        });
      }
    });
  }

  editTask(task: Task) {
    this.selectedIndex = task.idTask;
  }

  updateTask(task: Task) {
    this.selectedIndex = null;
    task.endTime = new Date().toISOString();
    task.startTime = new Date().toISOString();

    /*this.taskService.update(task).subscribe(res => {
      this.getWorksheet();
    });*/
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
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorksheetService} from '../../services/worksheet.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';
import {Worksheet} from '../../models/worksheet';
import {Status} from '../../models/status';
import {StatusService} from '../../services/status.service';
import {ProgramService} from '../../services/program.service';
import {tap} from 'rxjs/operators';
import {Program} from '../../models/program.model';
import {TaskType} from '../../models/task-type';
import {TaskService} from '../../services/task.service';
import {countUpTimerConfigModel, CountupTimerService, timerTexts} from 'ngx-timer';
import {Task} from 'src/app/models/task';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  private id: any;
  worksheetForm: FormGroup;
  taskForm: FormGroup;
  worksheet: Worksheet;
  clients: Client[] = [];
  programs: Program[] = [];
  status: Status[] = [];
  taskTypes: TaskType[] = [];
  timerConfig: countUpTimerConfigModel;
  task: Task;
  timerRunning = false;

  displayedColumns = ['taskType', 'employee', 'start', 'end', 'duration', 'controls'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selectedIndex: number;
  startTime: any;
  endTime: any;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private worksheetService: WorksheetService,
              private router: Router,
              private clientService: ClientService,
              private programService: ProgramService,
              private taskService: TaskService,
              private statusService: StatusService,
              private timerService: CountupTimerService) {
  }

  ngOnInit() {
    this.configurationTimer();
    this.initializeForm();
    this.getClients();
    this.getStatus();
    this.getTaskTypes();
  }

  private initializeForm() {
    this.worksheetForm = new FormGroup({
      orderNumber: new FormControl('', Validators.maxLength(254)),
      dueDate: new FormControl(''),
      quantity: new FormControl(''),
      client: new FormControl('', Validators.required),
      program: new FormControl('', Validators.required),
      tool: new FormControl({value: '', disabled: true}),
      machine: new FormControl({value: '', disabled: true}),
    });
    this.taskForm = new FormGroup({
      taskType: new FormControl('', Validators.required),
      time: new FormControl('')
    });
  }

  private getWorksheet() {
    this.worksheetService.getOne(this.id).subscribe(res => {
      this.worksheet = res;
      this.taskService.getWorksheetTasks(this.worksheet.idWorkSheet).subscribe(tasks => {
          this.worksheet.tasks = tasks;
          console.log(tasks);
          this.worksheet.tasks.forEach(task => {
            const start = new Date(task.startTime);
            const end = new Date(task.endTime);
            task.duration = end.getTime() - start.getTime();
          });
          this.dataSource = new MatTableDataSource(this.worksheet.tasks);
          this.dataSource.sort = this.sort;
        });
      this.setValues();
    });
  }

  private getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.getPrograms();
    });
  }

  private getPrograms() {
    this.programService.getAllProgram();
    this.programService.programsList$().pipe(tap(result => this.programs = result)).subscribe(() => {
      this.route.params.subscribe(params => {
        if (params.id) {
          this.id = params.id;
          this.getWorksheet();
        }
      });
    });
  }

  private getStatus() {
    this.statusService.getAll().subscribe(status => {
      this.status = status;
    });
  }

  cancel() {
    this.router.navigate(['worksheets']);
  }

  save() {
    let newWorksheet: Worksheet;
    this.worksheet ? newWorksheet = this.worksheet : newWorksheet = new Worksheet();
    if (this.worksheetForm.valid) {
      if (this.worksheetForm.dirty) {
        this.createWorksheet(newWorksheet);
        this.updateDatabase(newWorksheet);
      }
    } else {
      this.validateAllFields(this.worksheetForm);
    }
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

  private createWorksheet(newWorksheet: Worksheet) {
    const controls = this.worksheetForm.controls;
    newWorksheet.orderNumber = controls.orderNumber.value;
    newWorksheet.dueDate = controls.dueDate.value;
    newWorksheet.client = controls.client.value;
    newWorksheet.quantity = controls.quantity.value;
    newWorksheet.dueDate = controls.dueDate.value;
    newWorksheet.program = controls.program.value;
    newWorksheet.dateCreation = new Date();
    newWorksheet.status = this.status.find(x => x.name === 'En attente');
  }

  private updateDatabase(newWorksheet: Worksheet) {
    if (newWorksheet.idWorkSheet) {
      this.worksheetService.update(newWorksheet).subscribe(res => {
        this.getWorksheet();
      });
    } else {
      this.worksheetService.add(newWorksheet).subscribe(res => {
        this.router.navigate(['worksheets']);
      });
    }
  }

  private setValues() {
    this.worksheetForm.controls.orderNumber.setValue(this.worksheet.orderNumber);
    this.worksheetForm.controls.dueDate.setValue(new Date(this.worksheet.dueDate));
    this.worksheetForm.controls.quantity.setValue(this.worksheet.quantity);
    this.setClient();
    this.setProgram();
  }

  private setClient() {
    const client = this.clients.filter(x => x.idClient === this.worksheet.client.idClient)[0];
    this.worksheetForm.controls.client.setValue(client);
  }

  private setProgram() {
    const program = this.programs.filter(x => x.idProgram === this.worksheet.program.idProgram)[0];
    this.worksheetForm.controls.program.setValue(program);
    this.setInfoProgram(program);
  }

  private setInfoProgram(selected: Program) {
    if (selected) {
      if (selected.machine) {
        this.worksheetForm.controls.machine.setValue(selected.machine.name);
      }
      if (selected.tool) {
        this.worksheetForm.controls.tool.setValue(selected.tool.name);
      }
    }
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
    this.task.idWorkSheet = this.worksheet.idWorkSheet;
    this.timerService.stopTimer();
    this.worksheet.tasks.push(this.task);
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
        this.getWorksheet();
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
          this.getWorksheet();
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
}

import {Component, OnInit} from '@angular/core';
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
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  private id: number;
  worksheetForm: FormGroup;
  worksheet: Worksheet;
  clients: Client[] = [];
  programs: Program[] = [];
  status: Status[] = [];

  constructor(private route: ActivatedRoute,
              private worksheetService: WorksheetService,
              private router: Router,
              private clientService: ClientService,
              private programService: ProgramService,
              private taskService: TaskService,
              private statusService: StatusService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getClients();
    this.getStatus();
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
  }

  private getWorksheet() {
    this.worksheetService.getOne(this.id).subscribe(res => {
      this.worksheet = res;
      this.taskService.getWorksheetTasks(this.worksheet.idWorkSheet).subscribe(tasks => {
          this.worksheet.tasks = tasks;
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
}

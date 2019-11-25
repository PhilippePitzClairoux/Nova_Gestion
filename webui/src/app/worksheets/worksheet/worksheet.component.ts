import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksheetService } from '../../services/worksheet.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Worksheet } from '../../models/worksheet';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';
import { ProgramService } from '../../services/program.service';
import { tap } from 'rxjs/operators';
import { Program } from '../../models/program.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  public id: any;
  public worksheetForm: FormGroup;
  public worksheet: Worksheet;
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public programs: Program[] = [];
  public status: Status[] = [];

  public fcClientSearch: FormControl = new FormControl('');

  constructor(private route: ActivatedRoute,
    private worksheetService: WorksheetService,
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private programService: ProgramService,
    private statusService: StatusService) {
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.getClients();
    this.getStatus();
  }

  private initializeForm() {
    this.worksheetForm = this.fb.group({
      orderNumber: new FormControl('', Validators.maxLength(254)),
      dueDate: new FormControl(''),
      quantity: new FormControl(''),
      client: new FormControl('', Validators.required),
      program: new FormControl('', Validators.required),
      tool: new FormControl({ value: '', disabled: true }),
      machine: new FormControl({ value: '', disabled: true }),
    });
  }

  private getWorksheet(): void {
    this.worksheetService.getOne(this.id).subscribe(res => {
      this.worksheet = res;
      this.setValues();
    });
  }

  private getClients(): void {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.filteredClients.next(clients);
      this.getPrograms();
    });
  }

  private getPrograms(): void {
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

  private getStatus(): void {
    this.statusService.getAll().subscribe(status => {
      this.status = status;
    });
  }

  public cancel(): void {
    this.router.navigate(['worksheets']);
  }

  public save(): void {
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

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  private createWorksheet(newWorksheet: Worksheet): void {
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

  private updateDatabase(newWorksheet: Worksheet): void {
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

  public setClient() {
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

  public filterClient(): void {
    if (this.fcClientSearch.value === '') {
      this.filteredClients.next(this.clients);
    } else {
      this.filteredClients.next(this.clients.filter(t => t.name.toLocaleLowerCase().includes(this.fcClientSearch.value.toLocaleLowerCase())));
    }
  }

  public resetClient(): void {
    this.filteredClients.next(this.clients);
  }

}

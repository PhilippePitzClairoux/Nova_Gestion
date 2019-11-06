import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorksheetService} from '../../services/worksheet.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';
import {Machine} from '../../models/machine';
import {Worksheet} from '../../models/worksheet';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  private id: any;
  worksheetForm: FormGroup;
  worksheet: Worksheet;
  clients: Client[] = [];
  programs: any[] = [];

  constructor(private route: ActivatedRoute,
              private worksheetService: WorksheetService,
              private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getClients();
    this.getPrograms();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.getWorksheet();
      }
    });
  }

  private initializeForm() {
    this.worksheetForm = new FormGroup({
      orderNumber: new FormControl('', Validators.maxLength(254)),
      dueDate: new FormControl(''),
      quantity: new FormControl(''),
      client: new FormControl(''),
      program: new FormControl(''),
    });
  }

  private getWorksheet() {
    this.worksheetService.getOne(this.id).subscribe(res => {
      this.worksheet = res;
      console.log(res);
    });
  }

  private getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }

  private getPrograms() {
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
        this.update(newWorksheet);
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
    newWorksheet.dateCreation = new Date();
  }

  private update(newWorksheet: Worksheet) {
    this.worksheetService.update(newWorksheet).subscribe(res => {
      this.router.navigate(['worksheets']);
    });
  }
}

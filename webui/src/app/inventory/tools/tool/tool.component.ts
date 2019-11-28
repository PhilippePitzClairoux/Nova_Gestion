import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';

import { AuthentificationService } from './../../../services/authentification.service';
import { ClientService } from '../../../services/client.service';
import { Tool } from '../../../models/tool';
import { Client } from '../../../models/client';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public toolForm: FormGroup;

  public userType = '';

  public fcClientSearch: FormControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ToolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool,
    private clientService: ClientService,
    private authService: AuthentificationService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.toolForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      stockQuantity: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
    });
    this.getClients();

    this.authService.getUserType();

    this.authService.userType$().pipe(tap(result => {
      this.userType = result;
    })).subscribe();
  }

  close() {
    let tool = new Tool();
    if (this.toolForm.valid) {
      if (this.toolForm.dirty) {
        this.createTool(tool);
      } else {
        tool = this.data;
      }
      this.dialogRef.close(tool);
    } else {
      this.validateAllFields(this.toolForm);
    }
  }

  private createTool(tool: Tool): Tool {
    const controls = this.toolForm.controls;
    if (this.data) {
      tool.idTool = this.data.idTool;
    }
    tool.name = controls.name.value;
    tool.stockQuantity = controls.stockQuantity.value;
    tool.minimumQuantity = controls.minimumQuantity.value;
    tool.client = controls.client.value;
    return tool;
  }

  private getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.filteredClients.next(clients);
      this.setValues();
    });
  }

  private setValues() {
    if (this.data) {
      this.toolForm.controls.name.setValue(this.data.name);
      this.toolForm.controls.stockQuantity.setValue(this.data.stockQuantity);
      this.toolForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
      this.data.client ? this.setClient() : this.toolForm.controls.client.setValue('');
    }
  }

  private setClient() {
    const client = this.clients.filter(x => x.idClient === this.data.client.idClient)[0];
    this.toolForm.controls.client.setValue(client);
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

  public filterClient(): void {
    if (this.fcClientSearch.value === '') {
      this.filteredClients.next(this.clients);
    } else {
      this.filteredClients.next(this.clients.filter(t => t.name.toLocaleLowerCase().includes(
        this.fcClientSearch.value.toLocaleLowerCase()
      )));
    }
  }

  public resetClient(): void {
    this.filteredClients.next(this.clients);
  }
}

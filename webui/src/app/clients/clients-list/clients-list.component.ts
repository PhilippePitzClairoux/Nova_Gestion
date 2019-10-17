import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  public selectedIndex = 0;
  public inEdit = true;

  public fgAdd: FormGroup;
  public fgEdit: FormGroup;

  public clients: Client[] = [];

  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.fgAdd = this.fb.group({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
    this.fgEdit = this.fb.group({
      newName: new FormControl('', Validators.required),
      newPhoneNumber: new FormControl('', Validators.required)
    });
    this.clientService.getAll().subscribe();
    this.clientService.clientsList$().pipe(tap(result => this.clients = result)).subscribe();
  }

  public onAdd(): void {
    console.log(this.fgAdd);
    if (!this.fgAdd.invalid) {
      const client = new Client();
      client.name = this.fgAdd.controls.name.value;
      client.phoneNumber = this.fgAdd.controls.phoneNumber.value;
      this.clientService.createClient(client);
      this.fgAdd.controls.name.setValue('');
      this.fgAdd.controls.phoneNumbre.setValue('');
    } else {
      this.validateAllFields(this.fgAdd);
    }

  }

  public onEdit(id: number): void {
    this.fgEdit.controls.newName.setValue(this.clients.find(t => t.idClient === id).name);
    this.fgEdit.controls.newPhoneNumber.setValue(this.clients.find(t => t.idClient === id).phoneNumber);
    this.fgAdd.disable();
    this.selectedIndex = id;
  }

  public onDelete(id: number): void {
    this.clientService.deleteClient(id);
  }

  public onDoneEdit(): void {
    if (!this.fgEdit.invalid) {
      const client = new Client();
      client.idClient = this.selectedIndex;
      client.name = this.fgEdit.controls.newName.value;
      client.phoneNumber = this.fgEdit.controls.newPhoneNumber.value;
      this.clientService.updateClient(client);
      this.fgAdd.enable();
      this.selectedIndex = 0;
    }
  }

  public onCancelEdit(): void {
    this.inEdit = false;
    this.selectedIndex = 0;
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}

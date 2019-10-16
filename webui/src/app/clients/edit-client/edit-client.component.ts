import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from './../../models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  public name: string = '';
  public phoneNumber: string = '';

  @Input () client: any;

  @Output () done = new EventEmitter<any>();
  @Output () cancel = new EventEmitter<any>();

  constructor() { }

  public ngOnInit(): void {
    this.name = this.client.name;
    this.phoneNumber = this.client.phoneNumber;
  }

  public onDone(): void {
    const client = this.client;
    client.name = this.name;
    client.phoneNumber = this.phoneNumber;
    this.done.emit(client);
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}

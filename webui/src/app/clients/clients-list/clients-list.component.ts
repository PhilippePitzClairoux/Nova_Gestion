import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  public selectedIndex = 0;
  public inEdit: boolean = false;
  public name: string = '';
  public phoneNumber: string = '';

  public clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  public ngOnInit(): void {
    this.clientService.getAll().subscribe();
    this.clientService.clientsList$().pipe(tap(result => this.clients = result)).subscribe();
  }

  public onAdd(): void {
    const client = new Client();
    client.name = this.name;
    client.phoneNumber = this.phoneNumber;
    this.clientService.createClient(client);
  }

  public onEdit(id: number): void {
    this.inEdit = true;
    this.selectedIndex = id;
  }

  public onDelete(id: number): void {
    alert(id);
  }

  public onDoneEdit(client: Client): void {
    this.clientService.updateClient(client);
    this.inEdit = false;
    this.selectedIndex = 0;
  }

  public onCancelEdit(): void {
    this.inEdit = false;
    this.selectedIndex = 0;
  }

}

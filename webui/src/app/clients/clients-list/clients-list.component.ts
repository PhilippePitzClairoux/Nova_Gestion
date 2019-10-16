import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  public selectedIndex = 0;

  public clients = [
    { id: 1, name: 'allo', phoneNumber: '18191231234' },
    { id: 2, name: 'ça', phoneNumber: '18191231234' },
    { id: 3, name: 'va', phoneNumber: '18191231234' },
    { id: 4, name: 'bye', phoneNumber: '18191231234' }
  ];

  constructor() { }

  ngOnInit() {
  }

  public onEdit(id: number): void {
    this.selectedIndex = id;
  }

  public onDelete(id: number): void {
    alert(id);
  }

  public onDoneEdit(): void {
    // TODO MAKE UPDATE
    this.selectedIndex = 0;
  }

  public onCancelEdit(): void {
    this.selectedIndex = 0;
  }

}

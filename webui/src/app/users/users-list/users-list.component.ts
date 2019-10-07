import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users = [
    {name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'administrateur'},
    {name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'superviseur'},
    {name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'outilleur'}
  ];

  constructor() { }

  public ngOnInit(): void {
  }

  public onAdd($event) {
  }

}

import { UserComponent } from './../user/user.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

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

  constructor(public dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public onAdd($event) {
    this.dialog.open(UserComponent);
  }

}

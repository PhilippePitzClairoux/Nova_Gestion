import { UserComponent } from './../user/user.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public faPen = faPen;
  public faTrash = faTrash;

  public users = [
    {id: 1, name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'administrateur'},
    {id: 2, name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'superviseur'},
    {id: 3, name: 'Bob Langevin', email: 'boblangevin@gmail.com', type: 'outilleur'}
  ];

  constructor(public dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public onAdd($event) {
    this.dialog.open(UserComponent, { panelClass: 'custom-dialog-container' });
  }

  public onEdit(id): void {
    alert(id);
  }

  public onDelete(id): void {
    alert(id);
  }

}

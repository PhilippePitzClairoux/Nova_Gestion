import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';

import { UserComponent } from './../user/user.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { TypeUser } from 'src/app/models/user-type.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public faPen = faPen;
  public faTrash = faTrash;

  public users: User[] = [];

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.getAllUsers();
    this.userService.usersList$().pipe(tap(result => this.users = result)).subscribe();
  }

  public onAdd($event) {

    // Creating a user not undefined
    const newUser: User = new User();
    newUser.typeUser = new TypeUser();
    newUser.employee = new Employee();

    // Defining mat dialogs config and passing my user
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      panelClass: 'custom-dialog-container',
      user: newUser,
      add: true,
      edit: false
    };

    // Opening the mat dialog component
    this.dialog.open(UserComponent, dialogConfig);
  }

  public onEdit(id: number): void {

    // Defining mat dialogs config and passing my user
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      panelClass: 'custom-dialog-container',
      user: this.users.find(t => t.idUser === id),
      add: false,
      edit: true
    };

    // Opening the mat dialog component
    this.dialog.open(UserComponent, dialogConfig);
  }

  public onDelete(id: number): void {
    alert(id);
  }

}

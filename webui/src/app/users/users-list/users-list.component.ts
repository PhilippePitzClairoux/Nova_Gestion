import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { tap } from 'rxjs/operators';

import { UserComponent } from './../user/user.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { TypeUser } from '../../models/user-type.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public filteredUsersList: User[] = [];
  public users: User[] = [];
  public userTypesList: TypeUser[] = [];

  // tslint:disable-next-line: no-inferrable-types
  public research: string = '';

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.getAllUsers();
    this.userService.usersList$().pipe(tap(result => this.users = result)).subscribe(() => this.filteredUsersList = this.users);
    this.userService.getAllUserTypes();
    this.userService.userTypesList$().pipe(tap(result => this.userTypesList = result)).subscribe();
  }

  public onAdd() {

    // Creating a user not undefined
    const newUser: User = new User();
    // newUser.typeUser = new TypeUser();
    newUser.employee = new Employee();

    // Defining mat dialogs config and passing my user
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      user: newUser,
      userTypesList: this.userTypesList,
      add: true,
      edit: false
    };

    // Opening the mat dialog component
    this.dialog.open(UserComponent, dialogConfig);
  }

  public onEdit(id: number): void {

    // Defining mat dialogs config and passing my user
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      user: this.users.find(t => t.idUser === id),
      userTypesList: this.userTypesList,
      add: false,
      edit: true
    };

    // Opening the mat dialog component
    this.dialog.open(UserComponent, dialogConfig);
  }

  public onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id);
      }
    });
  }

  public filteringUserList(): void {
    if (this.research !== '') {
      this.filteredUsersList = this.users.filter(t => {
        return t.employee.name.toLocaleLowerCase().includes(this.research.toLocaleLowerCase()) ||
          t.employee.surname.toLocaleLowerCase().includes(this.research.toLocaleLowerCase()) ||
          t.email.toLocaleLowerCase().includes(this.research.toLocaleLowerCase()) ||
          t.typeUser.name.toLocaleLowerCase().includes(this.research.toLocaleLowerCase());
      });
    } else {
      this.filteredUsersList = this.users;
    }
  }
}

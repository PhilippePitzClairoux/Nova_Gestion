import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserComponent } from './../user/user.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

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
    this.dialog.open(UserComponent, { panelClass: 'custom-dialog-container' });
  }

  public onEdit(id: number): void {
    const initialState = {
      panelClass: 'custom-dialog-container',
      user: this.users.filter(t => t.idUser === id)
    };
    this.dialog.open(UserComponent, initialState);
  }

  public onDelete(id: number): void {
    alert(id);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { UserComponent } from './../user/user.component';
import { UsersService } from '../../Services/users.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public faPen = faPen;
  public faTrash = faTrash;

  public users$: Observable<User[]>;

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.getAllUsers();
    this.users$ = this.userService.usersList$();
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

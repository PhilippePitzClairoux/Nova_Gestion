import { UsersService } from './../../services/users.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { User } from './../../Models/user.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;

  public fcName: FormControl;
  public fcSurname: FormControl;
  public fcEmail: FormControl;
  public fcPassword: FormControl;
  public fcPasswordConfirmation: FormControl;

  public fg: FormGroup;

  @Output() addUser = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dialogRef: MatDialog, private userService: UsersService) {
    this.user = this.user || new User();
  }

  public ngOnInit(): void {



    this.fg = this.fb.group({
      name: this.fcName,
      surname: this.fcSurname,
      courriel: this.fcEmail,
      password: this.fcPassword,
      paswwordConfirmation: this.fcPasswordConfirmation
    });
  }

  public onClose(): void {
    this.dialogRef.closeAll();
  }

  public onAdd(): void {
    let user: User;
    user = new User();
    user = {
      id: null,
      email: 'admin@gmail.com',
      password: 'test',
      typeUser: {
        id: 1,
        name: 'Admin'
      },
      employee: {
        id: null,
        name: 'Jean-Pierre',
        surname: 'Vilanova'
      }
    };
    this.userService.createUser(user);
  }
}

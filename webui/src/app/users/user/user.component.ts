import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';

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
    let user = new User();
    user = {
      email: 'admin@gmail.com',
      password: 'test',
      typeUser: {
        idTypeUser: 1,
        name: 'Admin'
      },
      employee: {
        name: 'Jean-Pierre',
        surname: 'Vilanova'
      }
    };
    this.userService.createUser(user);
    // let user = new User();
    // user = {
    //   idUser: 1,
    //   email: 'admin@gmail.com',
    //   password: 'test',
    //   typeUser: {
    //     idTypeUser: 1,
    //     name: 'Admin'
    //   },
    //   employee: {
    //     idEmployee: 1,
    //     name: 'Jean-Pier',
    //     surname: 'Vilanova'
    //   }
    // };
    // this.userService.updateUser(user);
  }
}

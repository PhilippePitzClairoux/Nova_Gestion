import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;

  public adding: boolean;
  public editing: boolean;

  public fcName: FormControl;
  public fcSurname: FormControl;
  public fcEmail: FormControl;
  public fcPassword: FormControl;
  public fcPasswordConfirmation: FormControl;

  public fg: FormGroup;

  @Output() addUser = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dialogRef: MatDialog, private userService: UsersService, @Inject(MAT_DIALOG_DATA) data) {
      this.user = data.user;
      this.adding = data.add;
      this.editing = data.edit;
  }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      name: (this.fcName = new FormControl(this.user.employee.name || '', Validators.required)),
      surname: (this.fcSurname = new FormControl(this.user.employee.surname || '', Validators.required)),
      email: (this.fcEmail = new FormControl(this.user.email || '', Validators.required)),
      password: (this.fcPassword = new FormControl('' || '', Validators.required)),
      passwordConfirmation: (this.fcPasswordConfirmation = new FormControl('', Validators.required))
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

  }

  public onEdit(): void {
    let user = new User();
    user = {
      idUser: 1,
      email: 'admin@gmail.com',
      password: 'test',
      typeUser: {
        idTypeUser: 1,
        name: 'Admin'
      },
      employee: {
        idEmployee: 1,
        name: 'Jean-Pier',
        surname: 'Vilanova'
      }
    };
    this.userService.updateUser(user);
  }
}

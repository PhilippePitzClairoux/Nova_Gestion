import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';
import { Employee } from 'src/app/models/employee.model';
import { TypeUser } from 'src/app/models/user-type.model';

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
    const user = new User();
    user.employee = new Employee();
    user.typeUser = new TypeUser();
    user.email = this.fcEmail.value;
    user.password = this.fcPassword.value;
    user.employee.name = this.fcName.value;
    user.employee.surname = this.fcSurname.value;
    user.typeUser.idTypeUser = 1;
    user.typeUser.name = 'Test';

    this.userService.createUser(user);
    this.dialogRef.closeAll();
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

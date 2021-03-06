import {ToastrService} from 'ngx-toastr';
import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';
import {Employee} from '../../models/employee.model';
import {TypeUser} from '../../models/user-type.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;
  public userTypesList: TypeUser[] = [];

  public adding: boolean;
  public editing: boolean;

  public fg: FormGroup;

  @Output() addUser = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dialogRef: MatDialog, private toastr: ToastrService,
              private userService: UsersService, @Inject(MAT_DIALOG_DATA) data) {
    this.user = data.user;
    this.userTypesList = data.userTypesList;
    this.adding = data.add;
    this.editing = data.edit;
  }

  public ngOnInit(): void {

    if (this.adding) {
      this.fg = this.fb.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        userType: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required)
      });
    } else {
      this.fg = this.fb.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        userType: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl(''),
        passwordConfirmation: new FormControl('')
      });
    }


    this.initFormValues();
  }

  public onClose(): void {
    this.dialogRef.closeAll();
  }

  public onAdd(): void {
    if (this.fg.invalid) {
      this.validateAllFields(this.fg);
      return;
    }
    if (this.fg.controls.password.value !== this.fg.controls.passwordConfirmation.value) {
      this.toastr.error(null, 'Les mots de passe ne corresponde pas');
      return;
    }
    const user = this.createUserFromForm();
    this.userService.createUser(user);
    this.dialogRef.closeAll();
  }

  public onEdit(): void {
    if (this.fg.invalid) {
      this.validateAllFields(this.fg);
      return;
    }
    if (this.fg.controls.password.value !== this.fg.controls.passwordConfirmation.value) {
      this.toastr.error(null, 'Les mots de passe ne corresponde pas');
      return;
    }
    const user = this.updateUserFromForm(this.user);
    this.userService.updateUser(user);
    this.dialogRef.closeAll();
  }

  private initFormValues(): void {
    if (this.user) {
      this.fg.controls.name.setValue(this.user.employee.name);
      this.fg.controls.surname.setValue(this.user.employee.surname);
      this.fg.controls.email.setValue(this.user.email);
      this.user.typeUser ? this.setUserType() : this.fg.controls.userType.setValue('');
    }
  }

  private setUserType(): void {
    const userType = this.userTypesList.find(t => t.idTypeUser === this.user.typeUser.idTypeUser);
    this.fg.controls.userType.setValue(userType);
  }

  private createUserFromForm(): User {
    const createUser: User = new User();
    createUser.employee = new Employee();
    createUser.typeUser = new TypeUser();
    createUser.employee.name = this.fg.controls.name.value;
    createUser.employee.surname = this.fg.controls.surname.value;
    createUser.email = this.fg.controls.email.value;
    createUser.password = this.fg.controls.password.value;
    createUser.typeUser.idTypeUser = this.fg.controls.userType.value.idTypeUser;
    createUser.typeUser.name = this.fg.controls.userType.value.name;
    return createUser;
  }

  private updateUserFromForm(user: User): User {
    const updateUser: User = user;
    updateUser.employee.name = this.fg.controls.name.value;
    updateUser.employee.surname = this.fg.controls.surname.value;
    updateUser.email = this.fg.controls.email.value;
    if (this.fg.controls.password.value !== '') {
      updateUser.password = this.fg.controls.password.value;
    }
    updateUser.typeUser.idTypeUser = this.fg.controls.userType.value.idTypeUser;
    updateUser.typeUser.name = this.fg.controls.userType.value.name;
    return updateUser;
  }

  public nameValid(): boolean {
    return !this.fg.controls.name.hasError('required');
  }

  public surnameValid(): boolean {
    return !this.fg.controls.surname.hasError('required');
  }

  public typeUserValid(): boolean {
    return !this.fg.controls.userType.hasError('required');
  }

  public emailValid(): boolean {
    return !this.fg.controls.email.hasError('required') && !this.fg.controls.email.hasError('email');
  }

  public passwordValid(): boolean {
    return !this.fg.controls.password.hasError('required');
  }

  public passwordConfirmationValid(): boolean {
    return !this.fg.controls.passwordConfirmation.hasError('required');
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}

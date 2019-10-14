import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { User } from './../../Models/user.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public fcName: FormControl;
  public fcSurname: FormControl;
  public fcEmail: FormControl;
  public fcPassword: FormControl;
  public fcPasswordConfirmation: FormControl;

  public fg: FormGroup;

  @Input() user: User;
  @Output() addUser = new EventEmitter<any>();
  @Output() closeDialog = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

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
    this.closeDialog.emit();
  }

  public onAdd(): void {
    this.addUser.emit();
  }
}

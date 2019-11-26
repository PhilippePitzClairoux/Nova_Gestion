import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {AuthentificationService} from './../../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  public fg: FormGroup;
  public fcEmail: FormControl;
  public fcPassword: FormControl;

  constructor(private router: Router, private authentificationService: AuthentificationService, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      email: (this.fcEmail = new FormControl('', [Validators.required, Validators.email])),
      password: (this.fcPassword = new FormControl('', Validators.required))
    });
  }

  public loginUser(): void {
    if (this.fg.invalid) {
      this.validateAllFields(this.fg);
      return;
    }

    this.authentificationService.connect(this.fcEmail.value, this.fcPassword.value).subscribe(() => {
      this.router.navigate(['clients']);
    });
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

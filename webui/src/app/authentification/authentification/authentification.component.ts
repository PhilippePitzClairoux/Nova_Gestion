import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  public fg: FormGroup;
  public fcEmail: FormControl;
  public fcPassword: FormControl;

  constructor(private router: Router,
              private authenticationService: AuthentificationService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) {
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

    this.authenticationService.connect(this.fcEmail.value, this.fcPassword.value).subscribe(() => {
      this.router.navigate(['/home']);
    }, error => {
      if (error.status === 401) {
        this.snackBar.open('Mauvais courriel ou mot de passe', 'x', {duration: 1500});
      } else {
        this.snackBar.open('Un problème est survenu, veuillez contacter l\'administrateur.', 'x', {duration: 1500});
      }
      console.error(error);
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

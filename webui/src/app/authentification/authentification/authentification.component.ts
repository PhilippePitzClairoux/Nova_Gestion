import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from './../../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  public fg: FormGroup;
  public fcEmail: FormControl;
  public fcPassword: FormControl;

  constructor(private router: Router, private authentificationService: AuthentificationService, private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      email: (this.fcEmail = new FormControl('', Validators.required)),
      password: (this.fcPassword = new FormControl('', Validators.required))
    });
   }

  public loginUser(): void {
    this.authentificationService.connect(this.fcEmail.value, this.fcPassword.value).subscribe(() => {
      this.router.navigate(['clients']);
    });
  }

}

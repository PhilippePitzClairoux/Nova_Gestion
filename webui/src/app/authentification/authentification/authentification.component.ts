import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit(): void { }

  public loginUser(): void {
    this.router.navigate(['clients']);
  }

}

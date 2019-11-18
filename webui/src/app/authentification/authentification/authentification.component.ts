import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from './../../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  public ngOnInit(): void { }

  public loginUser(): void {
    this.authentificationService.connect('outilleur@gmail.com', 'test').subscribe(() => {
      this.router.navigate(['clients']);
    });
  }

}

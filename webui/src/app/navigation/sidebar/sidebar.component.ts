import { AuthentificationService } from './../../services/authentification.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private authentificationService: AuthentificationService) {
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authentificationService.logout().subscribe(() => {
      this.router.navigate(['authentification']);
    });
  }

}

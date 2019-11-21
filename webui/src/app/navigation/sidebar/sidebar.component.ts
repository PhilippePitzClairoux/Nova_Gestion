import { AuthentificationService } from './../../services/authentification.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public userType = '';

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  public ngOnInit(): void {
    if (this.router.url !== '/authentification' && this.router.url !== '/') {
      this.authentificationService.getUserType();
    }
    this.authentificationService.userType$().pipe(tap(result => {
      this.userType = result;
    })).subscribe();
  }

  public logout(): void {
    this.authentificationService.logout().subscribe(() => {
      this.router.navigate(['authentification']);
    });
  }

}

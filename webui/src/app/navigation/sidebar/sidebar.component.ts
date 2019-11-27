import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthentificationService } from './../../services/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public userType = '';

  constructor(private router: Router, private authentificationService: AuthentificationService, private toastr: ToastrService) { }

  public ngOnInit(): void {
    if (this.router.url !== '/authentification') {
      this.authentificationService.getUserType();
    }
    this.authentificationService.userType$().pipe(tap(result => {
      this.userType = result;
    })).subscribe();
  }

  public logout(): void {
    this.authentificationService.logout().subscribe(() => {
      this.router.navigate(['authentification']);
      this.toastr.success(null, 'Déconnexion réussi');
    });
  }

}

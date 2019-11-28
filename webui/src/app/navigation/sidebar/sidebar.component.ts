import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {AuthentificationService} from '../../services/authentification.service';
import {UsersService} from '../../services/users.service';
import {Employee} from '../../models/employee.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public userType = '';
  public employee: Employee;

  constructor(private router: Router,
              private userService: UsersService,
              private authentificationService: AuthentificationService,
              private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.getEmployee();
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
      this.toastr.success(null, 'Déconnexion réussie');
    });
  }

  private getEmployee() {
    this.userService.getEmployee().subscribe(employee => {
      this.employee = employee;
    });
  }

}

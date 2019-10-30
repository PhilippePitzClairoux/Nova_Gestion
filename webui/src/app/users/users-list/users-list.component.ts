import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { tap } from 'rxjs/operators';

import { UserComponent } from './../user/user.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { TypeUser } from '../../models/user-type.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];
  public userTypesList: TypeUser[] = [];

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  searchField = '';

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.getAllUsers();
    this.userService.usersList$().pipe(tap(result => this.users = result)).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return key === 'typeUser' ? currentTerm + data.typeUser.name : currentTerm + data[key] ||
          key === 'employee' ? currentTerm + data.employee.surname + data.employee.name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.userService.getAllUserTypes();
    this.userService.userTypesList$().pipe(tap(result => this.userTypesList = result)).subscribe();
  }

  public onAdd() {
    const newUser: User = new User();
    newUser.employee = new Employee();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user: newUser,
      userTypesList: this.userTypesList,
      add: true,
      edit: false
    };

    this.dialog.open(UserComponent, dialogConfig);
  }

  public onEdit(id: number): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user: this.users.find(t => t.idUser === id),
      userTypesList: this.userTypesList,
      add: false,
      edit: true
    };

    this.dialog.open(UserComponent, dialogConfig);
  }

  public onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public clearSearch(): void {
    this.searchField = '';
    this.applyFilter('');
  }
}

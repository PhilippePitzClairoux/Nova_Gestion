import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { tap } from 'rxjs/operators';

import {BlankService} from '../../../services/blank.service';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Blank} from '../../../models/blank';
import {BlankComponent} from '../blank/blank.component';
import { AuthentificationService } from './../../../services/authentification.service';

@Component({
  selector: 'app-blanks-list',
  templateUrl: './blanks-list.component.html',
  styleUrls: ['./blanks-list.component.scss']
})
export class BlanksListComponent implements OnInit {

  public searchField = '';
  public displayedColumns = ['name', 'stockQuantity', 'minimumQuantity', 'controls'];
  public dataSource: MatTableDataSource<Blank>;

  public userType = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private blankService: BlankService,
              private authService: AuthentificationService) {
  }

  ngOnInit() {
    this.getBlanks();

    this.authService.getUserType();

    this.authService.userType$().pipe(tap(result => {
      this.userType = result;
    })).subscribe();
  }

  private getBlanks() {
    this.blankService.getAll().subscribe(
      blanks => {
        this.dataSource = new MatTableDataSource(blanks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearSearch() {
    this.searchField = '';
    this.applyFilter('');
  }

  deleteBlank(idBlank: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cet outil?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blankService.delete(idBlank).subscribe(res => {
          this.getBlanks();
        });
      }
    });
  }

  seeBlank(selected: Blank) {
    const dialogRef = this.dialog.open(BlankComponent, {
      width: '500px',
      data: selected
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBlank(result, selected);
      }
    });
  }

  private saveBlank(blank: Blank, isNew) {
    if (isNew) {
      this.blankService.update(blank).subscribe(result => {
        this.getBlanks();
      });
    } else {
      this.blankService.add(blank).subscribe(result => {
        this.getBlanks();
      });
    }
  }
}

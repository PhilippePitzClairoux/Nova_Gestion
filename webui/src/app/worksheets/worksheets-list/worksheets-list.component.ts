import {Component, OnInit, ViewChild} from '@angular/core';
import {WorksheetService} from '../../services/worksheet.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-worksheets-list',
  templateUrl: './worksheets-list.component.html',
  styleUrls: ['./worksheets-list.component.scss']
})

export class WorksheetsListComponent implements OnInit {
  private worksheets: any;
  searchField = '';
  displayedColumns = ['id', 'client', 'order', 'dueDate', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private worksheetService: WorksheetService) {
  }

  ngOnInit() {
    this.worksheetService.getAll().subscribe(res => {
      this.worksheets = res;
      console.log(res);
    });
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

  deleteWorkSheet(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer cette feuille de travail?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete');
      }
    });
  }

  openWorkSheet(id: number) {
    if (id) {
      this.router.navigate(['worksheet', id]);
    } else {
      this.router.navigate(['worksheet']);
    }
  }
}

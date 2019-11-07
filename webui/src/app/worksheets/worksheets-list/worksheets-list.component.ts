import {Component, OnInit, ViewChild} from '@angular/core';
import {WorksheetService} from '../../services/worksheet.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';
import {Worksheet} from '../../models/worksheet';

@Component({
  selector: 'app-worksheets-list',
  templateUrl: './worksheets-list.component.html',
  styleUrls: ['./worksheets-list.component.scss']
})

export class WorksheetsListComponent implements OnInit {
  private worksheets: any;
  searchField = '';
  displayedColumns = ['idWorkSheet', 'client', 'order', 'dueDate', 'status', 'controls'];
  dataSource: MatTableDataSource<Worksheet>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private worksheetService: WorksheetService) {
  }

  ngOnInit() {
    this.getWorksheets();
  }

  private getWorksheets() {
    this.worksheetService.getAll().subscribe(worksheets => {
      this.dataSource = new MatTableDataSource(worksheets);
      this.worksheets = worksheets;
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'client' ? currentTerm + data.client.name : currentTerm + data[key] ||
            key === 'status' ? currentTerm + data.status.name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
        this.worksheetService.delete(id).subscribe(() => {
          this.getWorksheets();
        });
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

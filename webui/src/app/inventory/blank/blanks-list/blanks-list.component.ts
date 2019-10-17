import {Component, OnInit, ViewChild} from '@angular/core';
import {BlankService} from '../../../services/blank.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Blank} from '../../../models/blank';
import {BlankComponent} from '../blank/blank.component';

@Component({
  selector: 'app-blanks-list',
  templateUrl: './blanks-list.component.html',
  styleUrls: ['./blanks-list.component.scss']
})
export class BlanksListComponent implements OnInit {
  searchField = '';
  displayedColumns = ['name', 'stockQuantity', 'minimumQuantity', 'controls'];
  dataSource: MatTableDataSource<Blank>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private blankService: BlankService) {
  }

  ngOnInit() {
    this.getBlanks();
  }

  private getBlanks() {
    this.blankService.getAll().subscribe(
      blanks => {
        console.log(blanks);
        this.dataSource = new MatTableDataSource(blanks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
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
        console.log(result);
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

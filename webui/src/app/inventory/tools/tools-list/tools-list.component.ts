import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Tool} from '../../../models/tool';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {ToolComponent} from '../tool/tool.component';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit, AfterViewInit {
  searchField = '';
  displayedColumns = ['name', 'stockQuantity', 'minimumQuantity', 'client', 'controls'];
  dataSource: MatTableDataSource<Tool>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    const tools: Tool[] = [];
    for (let i = 1; i <= 100; i++) {
      tools.push(createTool(i));
    }
    this.dataSource = new MatTableDataSource(tools);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  deleteTool(id: Tool) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cet outil?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.indexOf(id);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          console.log('delete in db', id);
        }
      }
    });
  }

  seeTool(selected: Tool) {
    const dialogRef = this.dialog.open(ToolComponent, {
      width: '500px',
      data: selected
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('save', selected);
      }
    });
  }
}

function createTool(id: number): Tool {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id,
    name,
    stockQuantity: Math.round(Math.random() * 100),
    minimumQuantity: Math.round(Math.random() * 100),
    client: {
      id: 1,
      name: 'Sony',
      phoneNumber: '1231231234'
    }
  };
}

const NAMES = ['Cobra Mill 1/4', 'Cobra Mill 5/8', 'S6-MILL 1/4', 'Furtif3 3/8', 'Furtif3 1/2', 'S6-MILL 1/2'];

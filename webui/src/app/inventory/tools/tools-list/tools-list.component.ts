import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Tool} from '../../../models/tool';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {ToolComponent} from '../tool/tool.component';
import {ToolService} from '../../../services/tool.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {
  searchField = '';
  displayedColumns = ['name', 'stockQuantity', 'minimumQuantity', 'client', 'controls'];
  dataSource: MatTableDataSource<Tool>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              public toolService: ToolService) {
  }

  ngOnInit() {
    this.getTools();
  }

  getTools() {
    this.toolService.getAll().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
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
        this.saveTool(result, selected);
      }
    });
  }

  private saveTool(tool: Tool, isNew) {
    console.log(tool);
    if (isNew) {
      console.log('update');
      this.toolService.update(tool).subscribe(result => {
        console.log('upd', result);
      });
    } else {
      console.log('add');
      this.toolService.add(tool).subscribe(result => {
        console.log('add', result);
      });
    }
  }
}

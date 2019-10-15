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
      tools => {
        this.dataSource = new MatTableDataSource(tools);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return key === 'client' ? currentTerm + data.client.name : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
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

  deleteTool(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cet outil?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toolService.delete(id).subscribe(res => {
          this.getTools();
        });
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
    if (isNew) {
      this.toolService.update(tool).subscribe(result => {
        this.getTools();
      });
    } else {
      this.toolService.add(tool).subscribe(result => {
        this.getTools();
      });
    }
  }
}
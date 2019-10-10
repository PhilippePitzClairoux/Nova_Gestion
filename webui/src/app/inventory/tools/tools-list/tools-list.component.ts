import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Tool} from '../../../models/tool';

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

  constructor() {
  }

  ngOnInit() {
    const users: Tool[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createTool(i));
    }
    this.dataSource = new MatTableDataSource(users);
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

  deleteTool(id: number) {
    console.log('delete ' + id);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { tap } from 'rxjs/operators';

import { ClientService } from './../../services/client.service';
import { ProgramService } from './../../services/program.service';
import { MachineService } from './../../services/machine.service';

import { Program } from './../../models/program.model';
import { Machine } from './../../models/machine';
import { Client } from './../../models/client';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  private programs: Program[] = [];

  public clients: Client[] = [];
  public machines: Machine[] = [];

  dataSource: MatTableDataSource<Program>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public searchField = '';

  constructor(private programService: ProgramService, private clientService: ClientService, private machineService: MachineService) { }

  ngOnInit() {
    this.programService.getAllProgram();
    this.programService.programsList$().pipe(tap(result => this.programs = result)).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.programs);
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'name' ? currentTerm + data.name : currentTerm + data[key] ||
            key === 'machine' ? currentTerm + data.machine.name : currentTerm + data[key] ||
              key === 'tool' ? currentTerm + data.tool.name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.clientService.getAll().subscribe(result => this.clients = result);
    this.machineService.getAll().subscribe(result => this.machines = result);
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public clearSearch(): void {
    this.searchField = '';
    this.applyFilter('');
  }
}

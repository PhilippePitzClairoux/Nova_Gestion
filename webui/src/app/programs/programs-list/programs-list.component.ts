import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

import { tap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { ClientService } from './../../services/client.service';
import { ProgramService } from './../../services/program.service';
import { MachineService } from './../../services/machine.service';
import { Program } from './../../models/program.model';
import { Machine } from './../../models/machine';
import { Client } from './../../models/client';
import { $ } from 'protractor';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  private programs: Program[] = [];
  public clients: Client[] = [];
  public machines: Machine[] = [];
  public searchField = '';

  public fg: FormGroup;

  public dataSource: MatTableDataSource<Program>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private programService: ProgramService,
    private clientService: ClientService,
    private machineService: MachineService,
    private fb: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.fg = this.fb.group({
      client: new FormControl(''),
      machine: new FormControl(''),
    });
    this.programService.getAllProgram();
    this.programService.programsList$().pipe(tap(result => this.programs = result)).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.programs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.clientService.getAll().subscribe(result => this.clients = result);
    this.machineService.getAll().subscribe(result => this.machines = result);
  }

  public onEdit(id: number): void {

  }

  public onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer ce programme?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.programService.deleteProgram(id);
      }
    });
  }

  public applyFilter(): void {
    const filteredList = this.programs.filter(t => {
      console.log(t.clients);
      return (this.fg.controls.machine.value === '' || t.machine.name === this.fg.controls.machine.value.name ? true : false) &&
        (this.fg.controls.client.value === '' ||
        t.clients.find(client => client.name === this.fg.controls.client.value.name) !== undefined) &&
        (t.name.toLocaleLowerCase().trim().includes(this.searchField.toLocaleLowerCase().trim()));
    });
    this.dataSource = new MatTableDataSource(filteredList);
  }

  public clearSearch(): void {
    this.searchField = '';
    this.dataSource = new MatTableDataSource(this.programs);
  }
}

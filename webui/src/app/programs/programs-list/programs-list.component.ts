import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

import {tap} from 'rxjs/operators';

import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {ClientService} from '../../services/client.service';
import {ProgramService} from '../../services/program.service';
import {MachineService} from '../../services/machine.service';
import {Program} from '../../models/program.model';
import {Machine} from '../../models/machine';
import {Client} from '../../models/client';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  private programs: Program[] = [];
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public machines: Machine[] = [];
  public filteredMachines: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>([]);
  public searchField = '';

  public fg: FormGroup;
  public fcClientSearch: FormControl = new FormControl('');
  public fcMachineSearch: FormControl = new FormControl('');

  public dataSource: MatTableDataSource<Program>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private programService: ProgramService,
              private clientService: ClientService,
              private machineService: MachineService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      client: new FormControl(''),
      machine: new FormControl('')
    });
    this.programService.getAllProgram();
    this.programService.programsList$().pipe(tap(result => this.programs = result)).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.programs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.clientService.getAll().subscribe(result => {
      this.clients = result;
      this.filteredClients.next(result);
    });
    this.machineService.getAll().subscribe(result => {
      this.machines = result;
      this.filteredMachines.next(result);
    });
  }

  public onAdd(): void {
    this.router.navigate(['programs', 0]);
  }

  public onEdit(id: number): void {
    this.router.navigate(['programs', id]);
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
      if (t.tool === null) {
        return (this.fg.controls.machine.value === '' || t.machine.name === this.fg.controls.machine.value.name ? true : false) &&
          (this.fg.controls.client.value === '' ||
            t.clients.find(client => client.name === this.fg.controls.client.value.name) !== undefined) &&
          t.name.toLocaleLowerCase().trim().includes(this.searchField.toLocaleLowerCase().trim());
      } else {
        return (this.fg.controls.machine.value === '' || t.machine.name === this.fg.controls.machine.value.name ? true : false) &&
          (this.fg.controls.client.value === '' ||
            t.clients.find(client => client.name === this.fg.controls.client.value.name) !== undefined) &&
          (t.name.toLocaleLowerCase().trim().includes(this.searchField.toLocaleLowerCase().trim()) ||
            t.tool.name.toLocaleLowerCase().trim().includes(this.searchField.toLocaleLowerCase().trim()));
      }
    });
    this.dataSource = new MatTableDataSource(filteredList);
  }

  public clearSearch(): void {
    this.searchField = '';
    this.dataSource = new MatTableDataSource(this.programs);
  }

  public unselectClient(): void {
    this.fg.controls.client.setValue('');
  }

  public unselectMachine(): void {
    this.fg.controls.machine.setValue('');
  }

  public canApplyFilterClient(): void {
    if (this.fg.controls.client.value !== undefined) {
      this.applyFilter();
    } else {
      this.unselectClient();
      this.applyFilter();
    }
  }

  public canApplyFilterMachine(): void {
    if (this.fg.controls.machine.value !== undefined) {
      this.applyFilter();
    } else {
      this.unselectMachine();
      this.applyFilter();
    }
  }

  public filterClient(): void {
    if (this.fcClientSearch.value === '') {
      this.filteredClients.next(this.clients);
    } else {
      this.filteredClients.next(this.clients.filter(t => t.name.toLocaleLowerCase().includes(
        this.fcClientSearch.value.toLocaleLowerCase()
      )));
    }
  }

  public filterMachine(): void {
    if (this.fcMachineSearch.value === '') {
      this.filteredMachines.next(this.machines);
    } else {
      this.filteredMachines.next(
        this.machines.filter(t => t.name.toLocaleLowerCase().includes(this.fcMachineSearch.value.toLocaleLowerCase()))
      );
    }
  }

  public resetClient(): void {
    this.filteredClients.next(this.clients);
  }

  public resetMachine(): void {
    this.filteredMachines.next(this.machines);
  }
}

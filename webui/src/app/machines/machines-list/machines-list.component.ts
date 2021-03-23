import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MachineService} from '../../services/machine.service';
import {Machine} from '../../models/machine';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Model} from '../../models/model';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit, OnDestroy {
  searchField = '';
  displayedColumns = ['serialNumber', 'name', 'model', 'acquisitionDate', 'controls'];
  dataSource: MatTableDataSource<Machine>;
  mySubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  machineForm: FormGroup;

  constructor(public dialog: MatDialog,
              private machineService: MachineService,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getMachines();
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.machineForm = new FormGroup({
      serialNumber: new FormControl('', Validators.maxLength(254)),
      name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      acquisitionDate: new FormControl('', Validators.required),
      model: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    });
  }

  private getMachines() {
    this.machineService.getAll().subscribe(
      machines => {
        this.dataSource = new MatTableDataSource(machines);
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'model' ? currentTerm + data.model.name : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  deleteMachine(idMachine: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cette machine?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.machineService.delete(idMachine).subscribe(res => {
          this.getMachines();
        });
      }
    });
  }

  seeMachine(id: number) {
    this.router.navigate(['machine', id]);
  }

  add() {
    const newMachine = new Machine();
    if (this.machineForm.valid) {
      if (this.machineForm.dirty) {
        this.createMachine(newMachine);
        this.save(newMachine);
      }
    } else {
      this.validateAllFields(this.machineForm);
    }
  }

  private createMachine(newMachine: Machine) {
    const controls = this.machineForm.controls;

    newMachine.name = controls.name.value;
    newMachine.acquisitionDate = controls.acquisitionDate.value;
    newMachine.serialNumber = controls.serialNumber.value;
    newMachine.model = new Model();
    newMachine.model.name = controls.model.value;
    newMachine.model.company = 'Walter';
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  private save(newMachine: Machine) {
    this.machineService.add(newMachine).subscribe(res => {
      this.getMachines();
    });
  }
}

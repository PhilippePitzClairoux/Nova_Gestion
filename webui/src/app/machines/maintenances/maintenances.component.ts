import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Maintenance} from '../../models/maintenance';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MaintenanceService} from '../../services/maintenance.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss']
})
export class MaintenancesComponent implements OnInit {
  private maintenancesSubject = new BehaviorSubject<Maintenance[]>([]);
  displayedColumns = ['description', 'date', 'controls'];
  dataSource: MatTableDataSource<Maintenance>;
  maintenanceForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() idMachine: number;
  @Input() set maintenances(value: Maintenance[]) {
    this.maintenancesSubject.next(value);
  }

  get maintenances() {
    return this.maintenancesSubject.getValue();
  }

  constructor(public dialog: MatDialog,
              private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.initializeForm();
    this.maintenancesSubject.subscribe(data => {
      this.setDataSource(data);
    });
  }

  private initializeForm() {
    this.maintenanceForm = new FormGroup({
      date: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    });
  }

  deleteMaintenance(idMaintenance: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cette maintenance?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maintenanceService.delete(idMaintenance).subscribe(res => {
          const index = this.maintenances.findIndex(order => order.idMaintenance === idMaintenance);
          this.maintenances.splice(index, 1);
          this.setDataSource(this.maintenances);
        });
      }
    });
  }

  add() {
    const newMaintenance = new Maintenance();
    if (this.maintenanceForm.valid) {
      if (this.maintenanceForm.dirty) {
        this.createMaintenance(newMaintenance);
        this.save(newMaintenance);
      }
    } else {
      this.validateAllFields(this.maintenanceForm);
    }
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

  private save(maintenance: Maintenance) {
    this.maintenanceService.add(maintenance).subscribe(res => {
      maintenance.idMaintenance = res.idMaintenance;
      this.maintenances.push(maintenance);
      this.setDataSource(this.maintenances);
    });
  }

  private createMaintenance(newMaintenance: Maintenance) {
    const controls = this.maintenanceForm.controls;
    newMaintenance.description = controls.description.value;
    newMaintenance.date = controls.date.value;
    newMaintenance.idMachine = this.idMachine;
  }

  private setDataSource(maintenances: Maintenance[]) {
    this.dataSource = new MatTableDataSource(maintenances);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

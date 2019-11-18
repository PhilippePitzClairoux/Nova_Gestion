import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Maintenance} from '../../models/maintenance';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MaintenanceService} from '../../services/maintenance.service';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss']
})
export class MaintenancesComponent implements OnInit {
  private maintenancesSubject = new BehaviorSubject<Maintenance[]>([]);
  displayedColumns = ['description', 'date', 'controls'];
  dataSource: MatTableDataSource<Maintenance>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() set maintenances(value: Maintenance[]) {
    this.maintenancesSubject.next(value);
  }

  get maintenances() {
    return this.maintenancesSubject.getValue();
  }

  constructor(public dialog: MatDialog,
              private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.maintenancesSubject.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
          console.log(res);
        });
      }
    });
  }
}

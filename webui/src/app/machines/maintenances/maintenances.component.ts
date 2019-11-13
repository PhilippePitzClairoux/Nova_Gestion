import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Maintenance} from '../../models/maintenance';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss']
})
export class MaintenancesComponent implements OnInit {
  private maintenancesSubjet = new BehaviorSubject<Maintenance[]>([]);
  displayedColumns = ['description', 'date', 'controls'];
  dataSource: MatTableDataSource<Maintenance>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() set maintenances(value: Maintenance[]) {
    this.maintenancesSubjet.next(value);
  }

  get maintenances() {
    return this.maintenancesSubjet.getValue();
  }

  constructor() { }

  ngOnInit() {
    this.maintenancesSubjet.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteMaintenance(idMaintenance: number) {

  }

  editMaintenance(idMaintenance: number) {

  }
}

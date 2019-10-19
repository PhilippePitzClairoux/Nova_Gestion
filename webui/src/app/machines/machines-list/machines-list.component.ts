import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MachineService} from '../../services/machine.service';
import {Machine} from '../../models/machine';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {
  searchField = '';
  displayedColumns = ['serialNumber', 'name', 'model', 'acquisitionDate', 'controls'];
  dataSource: MatTableDataSource<Machine>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private machineService: MachineService) {
  }

  ngOnInit() {
    this.getMachines();
  }

  private getMachines() {
    this.machineService.getAll().subscribe(
      machines => {
        console.log(machines);
        this.dataSource = new MatTableDataSource(machines);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return key === 'model' ? currentTerm + data.model.name : currentTerm + data[key];
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

  seeMachine(row: Machine) {

  }
}

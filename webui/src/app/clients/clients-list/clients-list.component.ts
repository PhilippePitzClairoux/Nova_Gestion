import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import {tap} from 'rxjs/operators';

import {ClientService} from './../../services/client.service';
import {Client} from './../../models/client';
import {ConfirmationDialogComponent} from './../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selectedIndex = 0;
  public inEdit = true;

  public fgAdd: FormGroup;
  public fgEdit: FormGroup;

  public clients: Client[] = [];

  public searchField = '';

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.fgAdd = this.fb.group({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
    this.fgEdit = this.fb.group({
      newName: new FormControl('', Validators.required),
      newPhoneNumber: new FormControl('', Validators.required)
    });
    this.clientService.getAll().subscribe();
    this.clientService.clientsList$().pipe(tap(result => this.clients = result)).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'name' ? currentTerm + data.name : currentTerm + data[key] ||
          key === 'phoneNumber' ? currentTerm + data.phoneNumber : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public onAdd(): void {
    if (!this.fgAdd.invalid) {
      const client = new Client();
      client.name = this.fgAdd.controls.name.value;
      client.phoneNumber = this.fgAdd.controls.phoneNumber.value;
      this.clientService.createClient(client);
      this.fgAdd.controls.name.setValue('');
      this.fgAdd.controls.name.markAsUntouched();
      this.fgAdd.controls.phoneNumber.setValue('');
      this.fgAdd.controls.phoneNumber.markAsUntouched();
    } else {
      this.validateAllFields(this.fgAdd);
    }

  }

  public onEdit(id: number): void {
    this.fgEdit.controls.newName.setValue(this.clients.find(t => t.idClient === id).name);
    this.fgEdit.controls.newPhoneNumber.setValue(this.clients.find(t => t.idClient === id).phoneNumber);
    this.fgAdd.disable();
    this.selectedIndex = id;
  }

  public onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer ce client?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(id);
      }
    });
  }

  public onDoneEdit(): void {
    if (!this.fgEdit.invalid) {
      const client = new Client();
      client.idClient = this.selectedIndex;
      client.name = this.fgEdit.controls.newName.value;
      client.phoneNumber = this.fgEdit.controls.newPhoneNumber.value;
      this.clientService.updateClient(client);
      this.fgAdd.enable();
      this.selectedIndex = 0;
    }
  }

  public onCancelEdit(): void {
    this.fgAdd.enable();
    this.selectedIndex = 0;
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

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public clearSearch(): void {
    this.searchField = '';
    this.applyFilter('');
  }

  public nameValid(): boolean {
    return !this.fgAdd.controls.name.hasError('required');
  }

  public phoneValid(): boolean {
    return !this.fgAdd.controls.phoneNumber.hasError('required');
  }

  public editNameValid(): boolean {
    return !this.fgEdit.controls.newName.hasError('required');
  }

  public editPhoneValid() {
    return !this.fgEdit.controls.newPhoneNumber.hasError('required');
  }
}

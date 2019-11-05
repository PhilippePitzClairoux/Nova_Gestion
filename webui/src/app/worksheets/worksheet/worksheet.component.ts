import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorksheetService} from '../../services/worksheet.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {
  private id: any;
  worksheetForm: FormGroup;
  worksheet: any;
  clients: Client[] = [];
  programs: any[] = [];

  constructor(private route: ActivatedRoute,
              private worksheetService: WorksheetService,
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.initializeForm();
    this.getClients();
    this.getPrograms();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.getWorksheet();
      }
    });
  }

  private initializeForm() {
    this.worksheetForm = new FormGroup({
      orderNumber: new FormControl('', Validators.maxLength(254)),
      dueDate: new FormControl(''),
      quantity: new FormControl(''),
      client: new FormControl(''),
    });
  }

  private getWorksheet() {
    this.worksheetService.getOne(this.id).subscribe(res => {
      this.worksheet = res;
      console.log(res);
    });
  }

  private getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }

  private getPrograms() {
  }
}

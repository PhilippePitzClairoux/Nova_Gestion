import { Worksheet } from './../../models/worksheet';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { BehaviorSubject } from 'rxjs';
import { RapportService } from 'src/app/services/rapport.service';

@Component({
  selector: 'app-test-rapports',
  templateUrl: './test-rapports.component.html',
  styleUrls: ['./test-rapports.component.scss']
})
export class TestRapportsComponent implements OnInit {

  public fg: FormGroup;
  public fcClientSearch: FormControl = new FormControl('');
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public worksheet: Worksheet[] = [];

  public chartHidden = true;

  public multi = [];

  view: any[];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Client';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre d\'heure';
  timeline = true;

  colorScheme = 'cool';

  constructor(private fb: FormBuilder, private rapport: RapportService) {
  }

  public ngOnInit(): void {
    this.rapport.getAllWorkSheetByClientAndDate();
    this.rapport.worksheetList$().pipe(tap(result => this.worksheet = result)).subscribe(() => {

    });
    this.fg = this.fb.group({
      client: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
    this.rapport.getAllClients();
    this.rapport.clientsList$().pipe(tap(result => this.clients = result)).subscribe(() => {
      this.filteredClients.next(this.clients);
    });
  }

  public onSelect(event): void {
    console.log(event);
  }

  public applyFilterClient(): void {

  }

  public unselectClient(): void {

  }

  public canApplyFilterClient(): void {
    if (this.fg.controls.client.value !== undefined) {
      this.applyFilterClient();
    } else {
      this.unselectClient();
      this.applyFilterClient();
    }
    this.makeChart();
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

  public resetClient(): void {
    this.filteredClients.next(this.clients);
  }

  private makeChart(): void {

    let seriesOfWorksheet;
    let newChartTable;

    this.multi = [];

    this.worksheet.forEach(worksheet => {

      seriesOfWorksheet = [];

      if (this.fg.controls.client.value.find(t => t.idClient === worksheet.client.idClient)) {
        worksheet.tasks.forEach(worksheetTask => {

          const starttime = new Date(worksheetTask.startTime);
          const endtime = new Date(worksheetTask.endTime);

          let time = endtime.getHours() - starttime.getHours();
          time += ((endtime.getMinutes() - starttime.getMinutes()) / 60);

          seriesOfWorksheet.push({ name: worksheetTask.taskType.description, value: time });
        });
        newChartTable = {
          name: worksheet.client.name,
          series: seriesOfWorksheet
        };
      }
      if (newChartTable !== undefined) {
        this.multi.push(newChartTable);
      }
    });

    if (this.multi === []) {
      this.chartHidden = true;
    } else {
      this.chartHidden = false;
    }
  }

}

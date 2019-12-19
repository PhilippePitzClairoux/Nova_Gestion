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
  public worksheets: Worksheet[] = [];

  public chartHidden = true;

  // Données pour le rapport
  public clientsAndTasks = [];
  // Options pour le rapport
  public view: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Nom des clients';
  public showYAxisLabel = true;
  public yAxisLabel = 'Nombre d\'heure';
  public timeline = true;
  public legendTitle = 'Légende';
  public colorScheme = 'cool';

  constructor(private fb: FormBuilder, private rapportService: RapportService) {}

  public ngOnInit(): void {
    this.rapportService.worksheetList$().pipe(tap(result => this.worksheets = result)).subscribe(() => {

    });
    this.fg = this.fb.group({
      client: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
    this.rapportService.getAllClients();
    this.rapportService.clientsList$().pipe(tap(result => this.clients = result)).subscribe(() => {
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

    if (this.fg.controls.client.value === '') {
      return;
    }

    let tasksOfWorksheet;
    let newChartItem;

    this.clientsAndTasks = [];

    this.worksheets.forEach(worksheet => {

      tasksOfWorksheet = [];

      if (this.fg.controls.client.value.find(t => t.idClient === worksheet.client.idClient)) {

        worksheet.tasks.forEach(worksheetTask => {

          const starttime = new Date(worksheetTask.startTime);
          const endtime = new Date(worksheetTask.endTime);

          let time = endtime.getHours() - starttime.getHours();
          time += ((endtime.getMinutes() - starttime.getMinutes()) / 60);

          tasksOfWorksheet.push({ name: worksheetTask.taskType.description, value: time });
        });

        newChartItem = {
          name: worksheet.client.name,
          series: tasksOfWorksheet
        };

      }

      if (newChartItem !== undefined) {
        this.clientsAndTasks.push(newChartItem);
      }

    });

    if (this.clientsAndTasks.length === 0) {
      this.chartHidden = true;
    } else {
      this.chartHidden = false;
    }
  }

  public dateChange(): void {
    if (this.fg.controls.startDate.value !== '' && this.fg.controls.endDate.value !== '') {
      let date = this.fg.controls.startDate.value;
      console.log(date.getDay());
      const startDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();

      date = this.fg.controls.endDate.value;
      const endDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();

      console.log('making the call');
      this.rapportService.getAllWorkSheetByClientAndDate(startDate, endDate).subscribe(() => {
        this.makeChart();
      });
    }
  }

}

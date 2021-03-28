import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

import {tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

import {Client} from 'src/app/models/client';
import {Worksheet} from '../../models/worksheet';
import {RapportService} from 'src/app/services/rapport.service';

@Component({
  selector: 'app-rapport-tasks',
  templateUrl: './rapport-tasks.component.html',
  styleUrls: ['./rapport-tasks.component.scss']
})
export class RapportTasksComponent implements OnInit {

  constructor(private fb: FormBuilder, private rapportService: RapportService) {
  }

  public fg: FormGroup;
  public fcClientSearch: FormControl = new FormControl('');
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public worksheets: Worksheet[] = [];

  // Données pour le rapport
  public clientsAndTasks = [];

  // Options pour le rapport
  public view: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Nom du client';
  public showYAxisLabel = true;
  public yAxisLabel = 'Nombre d\'heures (h)';
  public legendTitle = 'Légende';
  public colorScheme = 'cool';

  private static isNull(item): boolean {
    return item === null || item === undefined || item === '';
  }

  private static createDate(date): string {
    return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
  }

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

  makeChart(): void {
    let tasksOfWorksheet;
    let newChartItem;
    this.clientsAndTasks = [];

    if (!RapportTasksComponent.isNull(this.fg.controls.client.value)) {

      this.worksheets.forEach(worksheet => {
        tasksOfWorksheet = [];

        if (this.fg.controls.client.value.find(t => t.idClient === worksheet.client.idClient)) {
          worksheet.tasks.forEach(worksheetTask => {

            const startTime = new Date(worksheetTask.startTime);
            const endTime = new Date(worksheetTask.endTime);

            let time = endTime.getHours() - startTime.getHours();
            time += ((endTime.getMinutes() - startTime.getMinutes()) / 60);

            const myIndex = tasksOfWorksheet.findIndex(t => t.name === worksheetTask.taskType.description);
            if (myIndex !== -1) {
              tasksOfWorksheet[myIndex].value += time;
              return;
            }
            tasksOfWorksheet.push({name: worksheetTask.taskType.description, value: time});
          });

          newChartItem = {
            name: worksheet.client.name,
            series: tasksOfWorksheet
          };
        }

        const index = this.clientsAndTasks.findIndex(t => t.name === worksheet.client.name);
        if (index !== -1) {
          tasksOfWorksheet.forEach(t => {
            const taskType = this.clientsAndTasks[index].series.findIndex(value => value.name === t.name);
            if (taskType !== -1) {
              this.clientsAndTasks[index].series[taskType].value += t.value;
              newChartItem = undefined;
            }
          });
        }

        if (!RapportTasksComponent.isNull(newChartItem)) {
          this.clientsAndTasks.push(newChartItem);
        }
      });
    }
  }

  public dateChange(): void {
    let date = new Date();
    let startDate = '';
    let endDate = '';

    if (RapportTasksComponent.isNull(this.fg.controls.startDate.value)) {
      startDate = RapportTasksComponent.createDate(date);
    } else {
      date = this.fg.controls.startDate.value;
      startDate = RapportTasksComponent.createDate(date);
    }

    if (RapportTasksComponent.isNull(this.fg.controls.endDate.value)) {
      endDate = RapportTasksComponent.createDate(date);
    } else {
      date = this.fg.controls.endDate.value;
      endDate = RapportTasksComponent.createDate(date);
    }

    this.rapportService.getAllWorkSheetByClientAndDate(startDate, endDate).subscribe(() => {
      this.makeChart();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BlankService} from '../../services/blank.service';
import {Blank} from '../../models/blank';
import {OrderHistory} from '../../models/order-history';

@Component({
  selector: 'app-rapport-blanks',
  templateUrl: './rapport-blanks.component.html',
  styleUrls: ['./rapport-blanks.component.scss']
})
export class RapportBlanksComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private blankService: BlankService) {
  }

  public fg: FormGroup;
  public fcBlankSearch: FormControl = new FormControl('');
  public blanks: Blank[] = [];
  public filteredBlanks: BehaviorSubject<Blank[]> = new BehaviorSubject<Blank[]>([]);
  private startDate: string;
  private endDate: string;

  // Données pour le rapport
  public blanksHistory = [];

  // Options pour le rapport
  public view: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Code de la tige';
  public showYAxisLabel = true;
  public yAxisLabel = 'Quantité';
  public legendTitle = 'Légende';
  public colorScheme = 'cool';

  private static isNull(item): boolean {
    return item === null || item === undefined || item === '';
  }

  private static createDate(date, time): string {
    return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
      + '-' + date.getDate().toString() + time;
  }

  private static createChartData(item: OrderHistory): any {
    return {
      name: item.blank.code,
      series: [
        {
          name: 'Reçue',
          value: item.receivedQuantity
        },
        {
          name: 'Utilisée',
          value: item.usedQuantity
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      blank: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
    this.blankService.getAll().subscribe(data => {
      this.blanks = data;
      this.filteredBlanks.next(this.blanks);
    });
    const date = new Date();
    this.startDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
      + '-' + date.getDate().toString() + ' 00:00:00';
    this.endDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
      + '-' + date.getDate().toString() + ' 24:59:59';
  }

  public filterBlank(): void {
    if (this.fcBlankSearch.value === '') {
      this.filteredBlanks.next(this.blanks);
    } else {
      this.filteredBlanks.next(this.blanks.filter(t => t.name.toLocaleLowerCase().includes(
        this.fcBlankSearch.value.toLocaleLowerCase()
      )));
    }
  }

  public resetBlank(): void {
    this.filteredBlanks.next(this.blanks);
  }

  public makeChart(): void {
    let history = [];
    const selectedBlanks = this.fg.controls.blank.value;
    this.blanksHistory = [];

    if (!RapportBlanksComponent.isNull(selectedBlanks)) {
      selectedBlanks.forEach(blank => {
        this.blankService.getOrderHistory(this.startDate, this.endDate, blank.idBlank).subscribe(
          data => {
            if (data.length > 0) {
              history.push(RapportBlanksComponent.createChartData(data[0]));
              this.blanksHistory = [...history];
            }
          },
          error => {
            history = [];
            this.blanksHistory = [...history];
          });
      });
    }
  }

  public dateChange(): void {
    let date = new Date();
    this.startDate = '';
    this.endDate = '';
    if (RapportBlanksComponent.isNull(this.fg.controls.startDate.value)) {
      this.startDate = RapportBlanksComponent.createDate(date, ' 00:00:00');
    } else {
      date = this.fg.controls.startDate.value;
      this.startDate = RapportBlanksComponent.createDate(date, ' 00:00:00');
    }

    if (RapportBlanksComponent.isNull(this.fg.controls.endDate.value)) {
      this.endDate = RapportBlanksComponent.createDate(date, ' 24:59:59');
    } else {
      date = this.fg.controls.endDate.value;
      this.endDate = RapportBlanksComponent.createDate(date, ' 24:59:59');
    }

    this.makeChart();
  }
}

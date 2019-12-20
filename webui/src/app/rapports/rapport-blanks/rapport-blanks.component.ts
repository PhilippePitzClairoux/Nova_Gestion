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

  public fg: FormGroup;
  public fcBlankSearch: FormControl = new FormControl('');
  public blanks: Blank[] = [];
  public filteredBlanks: BehaviorSubject<Blank[]> = new BehaviorSubject<Blank[]>([]);
  private startDate: string;
  private endDate: string;

  public chartHidden = true;

  // Données pour le rapport
  public orderHistory = [];

  // Options pour le rapport
  public view: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Tige';
  public showYAxisLabel = true;
  public yAxisLabel = 'Quantité';
  public timeline = true;
  public legendTitle = 'Légende';
  public colorScheme = 'cool';

  constructor(private fb: FormBuilder,
              private blankService: BlankService) {
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
    const selectedBlanks = this.fg.controls.blank.value;

    if (selectedBlanks !== '') {
      let newChartItem;
      this.orderHistory = [];

      selectedBlanks.forEach(blank => {
        this.blankService.getOrderHistory(this.startDate, this.endDate, blank.idBlank).subscribe(res => {
          newChartItem = {
            name: blank.code,
            series: [{
              name: 'Reçue',
              value: res[0].receivedQuantity
            },
              {
                name: 'Utilisée',
                value: res[0].usedQuantity
              }]
          };
          this.orderHistory.push(newChartItem);
        });
      });

      console.log(this.orderHistory);
      this.chartHidden = this.orderHistory.length === 0;
    }
  }

  public dateChange(): void {
    if (this.fg.controls.startDate.value === undefined || this.fg.controls.startDate.value === '') {
      const date = new Date();
      this.startDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
        + '-' + date.getDate().toString() + ' 00:00:00';
    } else {
      const date = this.fg.controls.startDate.value;
      this.startDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
        + '-' + date.getDate().toString() + ' 00:00:00';
    }

    if (this.fg.controls.endDate.value === undefined || this.fg.controls.endDate.value === '') {
      const date = new Date();
      this.endDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
        + '-' + date.getDate().toString() + ' 24:59:59';
    } else {
      const date = this.fg.controls.endDate.value;
      this.endDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
        + '-' + date.getDate().toString() + ' 24:59:59';
    }

    this.makeChart();
  }
}

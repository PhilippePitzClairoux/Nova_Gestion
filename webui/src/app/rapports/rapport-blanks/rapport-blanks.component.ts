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

  public chartHidden = true;

  // Données pour le rapport
  public orderHistory: OrderHistory[];

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
      console.log(data);
      this.filteredBlanks.next(this.blanks);
    });
  }

  public onSelect(event): void {
    console.log(event);
  }

  public applyFilterBlank(): void {

  }

  public unselectBlank(): void {

  }

  public canApplyFilterBlank(): void {
    if (this.fg.controls.blank.value !== undefined) {
      this.applyFilterBlank();
    } else {
      this.unselectBlank();
      this.applyFilterBlank();
    }
    //this.makeChart();
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

  private makeChart(): void {

    if (this.fg.controls.blank.value === '') {
      return;
    }

    this.orderHistory = [];

    this.blanks.forEach(worksheet => {

      tasksOfWorksheet = [];

      if (newChartItem !== undefined) {
        this.orderHistory.push(newChartItem);
      }
    });

    this.chartHidden = this.orderHistory.length === 0;
  }

  public dateChange(): void {
    if (this.fg.controls.startDate.value !== '' && this.fg.controls.endDate.value !== '') {
      let date = this.fg.controls.startDate.value;
      console.log(date.getDay());
      const startDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();

      date = this.fg.controls.endDate.value;
      const endDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();

      this.blankService.getOrderHistory(startDate, endDate, 1).subscribe(() => {
        //this.makeChart();
      });
    }
  }


}

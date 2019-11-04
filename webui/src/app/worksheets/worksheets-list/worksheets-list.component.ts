import { Component, OnInit } from '@angular/core';
import {WorksheetService} from '../../services/worksheet.service';

@Component({
  selector: 'app-worksheets-list',
  templateUrl: './worksheets-list.component.html',
  styleUrls: ['./worksheets-list.component.scss']
})
export class WorksheetsListComponent implements OnInit {
  private worksheets: any;

  constructor(private worksheetService: WorksheetService) { }

  ngOnInit() {
    this.worksheetService.getAll().subscribe(res => {
      this.worksheets = res;
    });
  }

}

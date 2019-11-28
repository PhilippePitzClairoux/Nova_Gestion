import {Component, OnInit} from '@angular/core';
import {ToolService} from '../services/tool.service';
import {BlankService} from '../services/blank.service';
import {Tool} from '../models/tool';
import {Blank} from '../models/blank';
import {WorksheetService} from '../services/worksheet.service';
import {Worksheet} from '../models/worksheet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deficitTools: Tool[] = [];
  deficitBlanks: Blank[] = [];
  lateWorksheets: Worksheet[] = [];

  constructor(private router: Router,
              private toolService: ToolService,
              private blankService: BlankService,
              private worksheetService: WorksheetService) {
  }

  ngOnInit() {
    this.getTools();
    this.getBlanks();
    this.getWorksheets();
  }

  private getBlanks() {
    this.blankService.getAll().subscribe(data => {
      this.filterBlanks(data);
    });
  }

  private filterBlanks(blanks: Blank[]) {
    blanks.forEach(blank => {
      if (blank.stockQuantity <= blank.minimumQuantity) {
        this.deficitBlanks.push(blank);
      }
    });
  }

  private getTools() {
    this.toolService.getAll().subscribe(data => {
      this.filterTools(data);
    });
  }

  private filterTools(tools: Tool[]) {
    tools.forEach(tool => {
      if (tool.stockQuantity <= tool.minimumQuantity) {
        this.deficitTools.push(tool);
      }
    });
  }

  private getWorksheets() {
    this.worksheetService.getAll().subscribe(data => {
      this.filterWorksheets(data);
    });
  }

  private filterWorksheets(worksheets: Worksheet[]) {
    const today = new Date(Date.now());
    console.log(today);
    console.log(worksheets);
    worksheets.forEach(worksheet => {
      const date = new Date(worksheet.dueDate);
      console.log(date);
      if (date <= today && worksheet.status.idStatus !== 4) {
        this.lateWorksheets.push(worksheet);
      }
    });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}

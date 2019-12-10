import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-rapports',
  templateUrl: './test-rapports.component.html',
  styleUrls: ['./test-rapports.component.scss']
})
export class TestRapportsComponent implements OnInit {

  public multi = [
    {
      name: 'A7-Integration',
      series: [
        {
          name: 'Nettoyage',
          value: 3
        },
        {
          name: 'Programmation',
          value: 12
        },
        {
          name: 'Fabrication',
          value: 10
        }
      ]
    },
    {
      name: 'Bombardier',
      series: [
        {
          name: 'Nettoyage',
          value: 20
        },
        {
          name: 'Programmation',
          value: 15
        },
        {
          name: 'Fabrication',
          value: 250
        }
      ]
    },
    {
      name: 'Machinage Gagné Ltée',
      series: [
        {
          name: 'Nettoyage',
          value: 5
        },
        {
          name: 'Programmation',
          value: 8
        },
        {
          name: 'Fabrication',
          value: 40
        }
      ]
    },
    {
      name: 'NSE-Automatech',
      series: [
        {
          name: 'Nettoyage',
          value: 4
        },
        {
          name: 'Programmation',
          value: 9.5
        },
        {
          name: 'Fabrication',
          value: 60
        }
      ]
    }
  ];

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

  constructor() {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }



}

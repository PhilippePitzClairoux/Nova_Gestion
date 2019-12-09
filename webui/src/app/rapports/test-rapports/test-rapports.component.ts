import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-rapports',
  templateUrl: './test-rapports.component.html',
  styleUrls: ['./test-rapports.component.scss']
})
export class TestRapportsComponent implements OnInit {

  public multi = [
    {
      name: 'China',
      series: [
        {
          name: '2018',
          value: 2243772
        },
        {
          name: '2017',
          value: 1227770
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '2018',
          value: 1126000
        },
        {
          name: '2017',
          value: 764666
        }
      ]
    },

    {
      name: 'Norway',
      series: [
        {
          name: '2018',
          value: 296215
        },
        {
          name: '2017',
          value: 209122
        }
      ]
    },

    {
      name: 'Japan',
      series: [
        {
          name: '2018',
          value: 257363
        },
        {
          name: '2017',
          value: 205350
        }
      ]
    },

    {
      name: 'Germany',
      series: [
        {
          name: '2018',
          value: 196750
        },
        {
          name: '2017',
          value: 129246
        }
      ]
    },

    {
      name: 'France',
      series: [
        {
          name: '2018',
          value: 204617
        },
        {
          name: '2017',
          value: 149797
        }
      ]
    },
    {
      name: 'China2',
      series: [
        {
          name: '2018',
          value: 2243772
        },
        {
          name: '2017',
          value: 1227770
        }
      ]
    },

    {
      name: 'USA2',
      series: [
        {
          name: '2018',
          value: 1126000
        },
        {
          name: '2017',
          value: 764666
        }
      ]
    },

    {
      name: 'Norway2',
      series: [
        {
          name: '2018',
          value: 296215
        },
        {
          name: '2017',
          value: 209122
        }
      ]
    },

    {
      name: 'Japan2',
      series: [
        {
          name: '2018',
          value: 257363
        },
        {
          name: '2017',
          value: 205350
        }
      ]
    },

    {
      name: 'Germany2',
      series: [
        {
          name: '2018',
          value: 196750
        },
        {
          name: '2017',
          value: 129246
        }
      ]
    },

    {
      name: 'France3',
      series: [
        {
          name: '2018',
          value: 204617
        },
        {
          name: '2017',
          value: 149797
        }
      ]
    },
    {
      name: 'China2',
      series: [
        {
          name: '2018',
          value: 2243772
        },
        {
          name: '2017',
          value: 1227770
        }
      ]
    },

    {
      name: 'USA4',
      series: [
        {
          name: '2018',
          value: 1126000
        },
        {
          name: '2017',
          value: 764666
        }
      ]
    },

    {
      name: 'Norway3',
      series: [
        {
          name: '2018',
          value: 296215
        },
        {
          name: '2017',
          value: 209122
        }
      ]
    },

    {
      name: 'Japan3',
      series: [
        {
          name: '2018',
          value: 257363
        },
        {
          name: '2017',
          value: 205350
        }
      ]
    },

    {
      name: 'Germany3',
      series: [
        {
          name: '2018',
          value: 196750
        },
        {
          name: '2017',
          value: 129246
        }
      ]
    },

    {
      name: 'France3',
      series: [
        {
          name: '2018',
          value: 204617
        },
        {
          name: '2017',
          value: 149797
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

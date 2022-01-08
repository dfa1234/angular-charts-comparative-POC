import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

const getOptionBase = (data: any): any => ({
  chart: {
    zoomType: 'x',
  },
  title: {
    text: 'USD to EUR exchange rate over time',
  },
  subtitle: {
    text: 'Click and drag in the plot area to zoom in',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'Exchange rate',
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, '#0096bfab'],
          [1, '#0063b8'],
        ],
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  },

  series: [
    {
      type: 'area',
      name: 'USD to EUR',
      data: data,
      boostThreshold: 10,
    },
  ],
  boost: {
    allowForce: true,
    debug: {
      showSkipSummary: true,
      timeBufferCopy: true,
      timeKDTree: true,
      timeRendering: true,
      timeSeriesProcessing: true,
      timeSetup: true,
    },
    enabled: true,
    seriesThreshold: 1,
    useGPUTranslations: true,
    usePreallocated: true,
  },
});

@Component({
  selector: 'app-lazy-highcharts',
  templateUrl: './lazy-highcharts.component.html',
  styleUrls: ['./lazy-highcharts.component.scss'],
})
export class LazyHighChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  //
  chartOptions: Highcharts.Options | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/usdeur.json').subscribe((data) => {
      this.chartOptions = getOptionBase(data);
    });
  }
}

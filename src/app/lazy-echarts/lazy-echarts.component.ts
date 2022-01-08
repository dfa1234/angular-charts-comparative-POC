import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import type { ECharts, EChartsOption } from 'echarts';

const getOptionBase = (data: any): any => ({
  tooltip: {
    trigger: 'axis',
    position: (pt: any) => [pt[0], '10%'],
  },
  title: {
    left: 'center',
    text: 'USD to EUR exchange rate over time',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20,
    },
    {
      start: 0,
      end: 20,
    },
  ],
  series: [
    {
      name: 'USD to EUR',
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {},
      data,
    },
  ],
});

@Component({
  selector: 'app-lazy-echarts',
  templateUrl: './lazy-echarts.component.html',
  styleUrls: ['./lazy-echarts.component.scss'],
})
export class LazyEchartsComponent implements OnInit {
  isLoading = false;

  echartsInstance: any = null; //ECharts

  initOpts: any = null;

  options: any = null; //EChartsOption;

  data: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/usdeur.json').subscribe((data) => {
      this.data = data;
      this.init('canvas');
    });
  }

  onChartEvent(event: any, type: string) {
    console.log('onChartEvent', type, event);
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
    console.log('onChartInit', e);
  }

  init(renderer: string) {
    this.initOpts = null;

    this.initOpts = {
      renderer,
      height: 400,
    };

    this.options = getOptionBase(this.data);

    console.log(this.initOpts, this.options);
  }
}

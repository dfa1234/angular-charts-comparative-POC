import { Component, OnInit } from '@angular/core';
//import type { ECharts, EChartsOption } from 'echarts';

@Component({
  selector: 'app-lazy-chart',
  templateUrl: './lazy-chart.component.html',
  styleUrls: ['./lazy-chart.component.scss'],
})
export class LazyChartComponent implements OnInit {
  isLoading = false;

  chartInstance: any = null; //ECharts

  initOpts: any = null;

  options: any = null; //EChartsOption;

  ngOnInit(): void {
    this.init('canvas');
  }

  onChartEvent(event: any, type: string) {
    console.log('onChartEvent', type, event);
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('onChartInit', e);
  }

  init(renderer: string) {
    this.initOpts = null;

    this.initOpts = {
      renderer,
      height: 400,
    };

    let base = new Date(1983, 6, 25).getTime();
    const oneDay = 24 * 3600 * 1000;

    const data = [[base, Math.random() * 300]];

    for (let i = 1; i < 20000; i++) {
      let now = new Date((base += oneDay));
      data.push([
        +now,
        Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
      ]);
    }

    this.options = {
      tooltip: {
        trigger: 'axis',
        position: (pt: any) => [pt[0], '10%'],
      },
      title: {
        left: 'center',
        text: 'Large Ara Chart',
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
          name: 'Fake Data',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data,
        },
      ],
    };

    console.log(this.initOpts, this.options);
  }
}

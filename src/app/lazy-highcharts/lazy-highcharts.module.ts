import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { LazyHighChartRoutingModule } from './lazy-highcharts-routing.module';
import { LazyHighChartComponent } from './lazy-highcharts.component';

console.log('Highcharts loaded', Highcharts);

@NgModule({
  declarations: [LazyHighChartComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    LazyHighChartRoutingModule,
    HttpClientModule,
  ],
})
export class LazyHighChartModule {}

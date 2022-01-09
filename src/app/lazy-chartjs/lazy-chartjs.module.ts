import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as chartsjs from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { LazyChartjsRoutingModule } from './lazy-chartjs-routing.module';
import { LazyChartjsComponent } from './lazy-chartjs.component';

console.log('chartjs', chartsjs);

@NgModule({
  declarations: [LazyChartjsComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    LazyChartjsRoutingModule,
    HttpClientModule,
  ],
})
export class LazyChartjsModule {}

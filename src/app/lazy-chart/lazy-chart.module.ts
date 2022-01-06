import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// You can use only the renderers you need
import { NgxEchartsModule } from 'ngx-echarts';
import { LazyChartRoutingModule } from './lazy-chart-routing.module';
import { LazyChartComponent } from './lazy-chart.component';

@NgModule({
  declarations: [LazyChartComponent],
  imports: [
    CommonModule,
    LazyChartRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class LazyChartModule {}

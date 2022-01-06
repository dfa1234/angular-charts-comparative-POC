import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomNgxEchartsDirective } from './echarts.directive';
import { LazyChartRoutingModule } from './lazy-chart-routing.module';
import { LazyChartComponent } from './lazy-chart.component';

@NgModule({
  declarations: [LazyChartComponent, CustomNgxEchartsDirective],
  imports: [CommonModule, LazyChartRoutingModule],
})
export class LazyChartModule {}

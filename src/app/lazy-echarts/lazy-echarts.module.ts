import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CustomNgxEchartsDirective } from './echarts.directive';
import { LazyEchartsRoutingModule } from './lazy-echarts-routing.module';
import { LazyEchartsComponent } from './lazy-echarts.component';

@NgModule({
  declarations: [LazyEchartsComponent, CustomNgxEchartsDirective],
  imports: [CommonModule, LazyEchartsRoutingModule, HttpClientModule],
})
export class LazyEchartsModule {}

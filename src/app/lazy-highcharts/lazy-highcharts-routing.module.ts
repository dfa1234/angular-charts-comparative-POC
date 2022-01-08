import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyHighChartComponent } from './lazy-highcharts.component';

const routes: Routes = [
  {
    path: '',
    component: LazyHighChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyHighChartRoutingModule {}

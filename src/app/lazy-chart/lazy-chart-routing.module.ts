import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyChartComponent } from './lazy-chart.component';

const routes: Routes = [
  {
    path: '',
    component: LazyChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyChartRoutingModule {}

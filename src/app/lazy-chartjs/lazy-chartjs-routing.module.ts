import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyChartjsComponent } from './lazy-chartjs.component';

const routes: Routes = [
  {
    path: '',
    component: LazyChartjsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyChartjsRoutingModule {}

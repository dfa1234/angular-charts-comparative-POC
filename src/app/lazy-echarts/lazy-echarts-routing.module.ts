import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyEchartsComponent } from './lazy-echarts.component';

const routes: Routes = [
  {
    path: '',
    component: LazyEchartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyEchartsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'lazy-echarts',
    loadChildren: () =>
      import('./lazy-echarts/lazy-echarts.module').then(
        (m) => m.LazyEchartsModule
      ),
  },
  {
    path: 'lazy-highcharts',
    loadChildren: () =>
      import('./lazy-highcharts/lazy-highcharts.module').then(
        (m) => m.LazyHighChartModule
      ),
  },
  {
    path: 'lazy-chartjs',
    loadChildren: () =>
      import('./lazy-chartjs/lazy-chartjs.module').then(
        (m) => m.LazyChartjsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

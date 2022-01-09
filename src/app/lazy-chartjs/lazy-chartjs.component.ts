import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-chartjs',
  templateUrl: './lazy-chartjs.component.html',
  styleUrls: ['./lazy-chartjs.component.scss'],
})
export class LazyChartjsComponent implements OnInit {
  barChartData: any = null;
  barChartOptions: any = {
    responsive: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/usdeur.json').subscribe((data: any) => {
      this.barChartData = {
        labels: data.map((d: any) => new Date(d[0]).toDateString()),
        datasets: [
          {
            type: 'line',
            data: data.map((d: any) => d[1]),
            fill: true,
            //borderColor: '#0096bfab',
            borderColor: '#0063b8',
            backgroundColor: '#0063b8',
            pointBorderColor: '#0096bfab',
            pointBackgroundColor: '#0096bfab',
          },
        ],
      };
      console.log(this.barChartData);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular-RxJsWebSocket-HighCharts';
  rate: any;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin');
  constructor() {}

  ngOnInit() {
    this.rate = this.subject
      .pipe(concatMap((item) => of(item).pipe(delay(1000))))
      .subscribe((data) => {
        this.rate = data;
        this.chardata.push(Number(this.rate.bitcoin));
        this.chartOptions = {
          series: [
            {
              data: this.chardata,
            },
          ],
          chart: {
            type: 'line',
            zoomType: 'x',
          },
          title: {
            text: 'linechart',
          },
        };
        console.log(data);
      });
  }
}

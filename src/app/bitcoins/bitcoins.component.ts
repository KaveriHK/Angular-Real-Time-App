import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bitcoins',
  templateUrl: './bitcoins.component.html',
  styleUrls: ['./bitcoins.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BitcoinsComponent implements OnInit {
  title = 'Angular-RxJsWebSocket-HighCharts';
  rate: any;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  public chartOptions: any;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin');
  constructor(private router: Router) { }

  ngOnInit(): void {
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
            text: 'BitCoin Data',
          },
        };
      });
  }

  public goBack() {
    this.router.navigateByUrl("");
  }

}

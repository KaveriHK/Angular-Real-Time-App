import { Component, OnInit } from '@angular/core';
import { CoWinService } from '../service/co-win.service';
import * as Highcharts from 'highcharts';
import * as _ from 'underscore';

@Component({
  selector: 'app-co-win-data',
  templateUrl: './co-win-data.component.html',
  styleUrls: ['./co-win-data.component.css'],
})
export class CoWinDataComponent implements OnInit {
  public states: any;
  public selectedState: any;
  public districts: any;
  public selectedDistrict: any;
  public chartOptions: any;
  public noDataMsg = 'No Information Available';
  public showNoDataMsg = false;
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private coWinService: CoWinService) {}

  ngOnInit(): void {
    this.getStates();
  }

  private getStates() {
    this.coWinService.getStates().subscribe(
      (list) => {
        if (list && list.states) {
          this.states = list.states;
          this.selectedState = this.states[0].state_id;
          this.getDistricts();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getDistricts() {
    this.coWinService.getDistricts(this.selectedState).subscribe(
      (list) => {
        if (list && list.districts) {
          this.districts = list.districts;
          this.selectedDistrict = this.districts[0].district_id;
          this.getDistrictWiseData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getDistrictWiseData() {
    this.coWinService
      .getSessionByDistrictId(this.selectedState, this.selectedDistrict, false)
      .subscribe(
        (data) => {
          if(data && data.vaccinationDoneByTime && data.vaccinationDoneByTime.length > 0) {
            this.showNoDataMsg = false;
            this.chartOptions = {
              chart: {
                type: 'spline',
              },
              series: [
                {
                  name: "Dose One",
                  data: _.pluck( data.vaccinationDoneByTime, "dose_one")
                },
                {
                  name: "Dose Two",
                  data: _.pluck( data.vaccinationDoneByTime, "dose_two")
                },
                {
                  name: "Total Doses",
                  data: _.pluck( data.vaccinationDoneByTime, "count")
                },
              ],
              title: {
                text: 'CoWin Dashboard - Doses Administrated Today',
              },
              subtitle: {
                text: 'Source: API Setu && CoWin Dashboard',
              },
              xAxis: {
                categories: _.pluck(data.vaccinationDoneByTime, "label")
              }
            };
          } else {
            this.showNoDataMsg = true;
            return;
          }
        },
        (error) => {
          console.log(error);
          this.coWinService
            .getSessionByDistrictId(
              this.selectedState,
              this.selectedDistrict,
              true
            )
            .subscribe(
              (data) => {
                if (data && data.sessions.length === 0) {
                  this.showNoDataMsg = true;
                  return;
                }
                this.showNoDataMsg = false;
                this.chartOptions = {
                  chart: {
                    type: 'spline',
                  },
                  series: [
                    {
                      name: 'Available Capacity Dose1',
                      data: _.pluck(data.sessions, 'available_capacity_dose1'),
                    },
                    {
                      name: 'Available Capacity Dose2',
                      data: _.pluck(data.sessions, 'available_capacity_dose2'),
                    },
                    {
                      name: 'Available Capacity',
                      data: _.pluck(data.sessions, 'available_capacity'),
                    },
                  ],
                  title: {
                    text: 'Available Covid 19 Doses for Today',
                  },
                  subtitle: {
                    text: 'Source: API Setu',
                  },
                  yAxis: {
                    title: {
                      text: 'Available Doses',
                    },
                  },
                };
              },
              (err) => {
                console.log(err);
              }
            );
        }
      );
  }
}

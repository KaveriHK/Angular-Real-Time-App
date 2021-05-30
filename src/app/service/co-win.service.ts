import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CoWinService {
  private statesUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  private districtsUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/";
  private findByDistrictId = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?";
  private getAllReportApi = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?";

  constructor(private http: HttpClient) { }

  public getStates(): Observable<any> {
    return this.http.get<any>(this.statesUrl).pipe(
      catchError((error) => {
        return throwError({
          status: error.status,
          error: { message: error.message },
        });
      })
    );
  }

  public getDistricts(stateId: number): Observable<any> {
    return this.http.get<any>(this.districtsUrl + stateId).pipe(
      catchError((error) => {
        return throwError({
          status: error.status,
          error: { message: error.message },
        });
      })
    );
  }

  public getSessionByDistrictId(stateId: number,districtId: number, userApiSetu: boolean) : Observable<any> {
    //2021-05-30
    let today;
    let url;
    if(userApiSetu) {
      today = moment(moment.now()).format("DD-MM-YYYY");
      url = this.findByDistrictId + "district_id=" + districtId + "&date=" + today;
    } else {
      today = moment(moment.now()).format("YYYY-MM-DD");
      url = this.getAllReportApi + "state_id=" + stateId + "&district_id=" + districtId + "&date=" + today;
    }
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        return throwError({
          status: error.status,
          error: { message: error.message },
        });
      })
    );
  }
}

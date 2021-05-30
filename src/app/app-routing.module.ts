import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitcoinsComponent } from './bitcoins/bitcoins.component';
import { CoWinDataComponent } from './co-win-data/co-win-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "coVaccine",
    component: CoWinDataComponent,
  },
  {
    path: "bitCoins",
    component: BitcoinsComponent,
  },
  {
    path: "**",
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

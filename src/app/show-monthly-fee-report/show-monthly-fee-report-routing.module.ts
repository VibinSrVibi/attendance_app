import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowMonthlyFeeReportPage } from './show-monthly-fee-report.page';

const routes: Routes = [
  {
    path: '',
    component: ShowMonthlyFeeReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowMonthlyFeeReportPageRoutingModule {}

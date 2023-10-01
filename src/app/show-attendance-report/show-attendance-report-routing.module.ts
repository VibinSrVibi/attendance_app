import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAttendanceReportPage } from './show-attendance-report.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAttendanceReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAttendanceReportPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowMonthlyFeeReportPageRoutingModule } from './show-monthly-fee-report-routing.module';

import { ShowMonthlyFeeReportPage } from './show-monthly-fee-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowMonthlyFeeReportPageRoutingModule
  ],
  declarations: [ShowMonthlyFeeReportPage]
})
export class ShowMonthlyFeeReportPageModule {}

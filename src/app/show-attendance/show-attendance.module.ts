import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAttendancePageRoutingModule } from './show-attendance-routing.module';

import { ShowAttendancePage } from './show-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAttendancePageRoutingModule
  ],
  declarations: [ShowAttendancePage]
})
export class ShowAttendancePageModule {}

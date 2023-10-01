import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillUserProfilePageRoutingModule } from './fill-user-profile-routing.module';

import { FillUserProfilePage } from './fill-user-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillUserProfilePageRoutingModule
  ],
  declarations: [FillUserProfilePage]
})
export class FillUserProfilePageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillUserProfilePage } from './fill-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FillUserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillUserProfilePageRoutingModule {}

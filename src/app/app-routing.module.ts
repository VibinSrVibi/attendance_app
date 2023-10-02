import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tab',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'show-attendance',
    loadChildren: () => import('./show-attendance/show-attendance.module').then( m => m.ShowAttendancePageModule)
  },
  {
    path: 'fill-user-profile',
    loadChildren: () => import('./fill-user-profile/fill-user-profile.module').then( m => m.FillUserProfilePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'show-attendance-report',
    loadChildren: () => import('./show-attendance-report/show-attendance-report.module').then( m => m.ShowAttendanceReportPageModule)
  },
  {
    path: 'show-monthly-fee-report',
    loadChildren: () => import('./show-monthly-fee-report/show-monthly-fee-report.module').then( m => m.ShowMonthlyFeeReportPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

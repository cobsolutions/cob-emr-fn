import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core';
import { Role } from './modules/security/model/role';
import { KcAuthGuard } from './modules/security/service/kc-auth.guard';

const routes: Routes = [
  
  {
    path: 'emr',
    component: DefaultLayoutComponent,
    canActivate: [KcAuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'patient',
        data: {
          title: 'Patient',
          roles: [Role.PATIENT_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/patient/patient.module').then((m) => m.PatientModule)
      },
      {
        path: 'administration',
        data: {
          title: 'Administration',
          roles: [Role.USER_ROLE,Role.CLINIC_ROLE,Role.CLINIC_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/administration/administration.module').then((m) => m.AdministrationModule)
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('./modules/organization/organization.module').then((m) => m.OrganizationModule)
      },
      {
        path: 'scheduler',
        loadChildren: () =>
          import('./modules/scheduler/scheduler.module').then((m) => m.SchedulerModule)
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

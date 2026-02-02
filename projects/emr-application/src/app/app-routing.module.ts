import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core';
import { OrganizationLayoutComponent } from './core/organization.layout/organization-layout.component';
import { SignatureLayoutComponent } from './core/signature.layout/signature-layout.component';
import { Role } from './modules/security/model/role';
import { KcAuthGuard } from './modules/security/service/kc-auth.guard';
import { PendingActivationGuard } from './modules/security/service/pending-activation.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'emr',
    pathMatch: 'full',
  },
  {
    path: 'emr-request',
    component: OrganizationLayoutComponent,
    canActivate: [KcAuthGuard],
    data: {
      title: 'organization',
      type: 'requester'
    },
    children:[
      {
        path:'signup',
        loadChildren: () =>
          import('./modules/signup/signup.module').then((m) => m.SignupModule)
      }
    ]
  },
  {
    path: 'emr-signature',
    component: SignatureLayoutComponent,
    canActivate: [KcAuthGuard],
    data: {
      title: 'Signature Capture'
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/doctor-signature/doctor-signature.module').then((m) => m.DoctorSignatureModule)
      }
    ]
  },
  {
    path: 'emr',
    component: DefaultLayoutComponent,
    canActivate: [KcAuthGuard],
    canActivateChild: [PendingActivationGuard],
    data: {
      title: 'Home',
      type: 'user'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [KcAuthGuard],
        data: {
          defaultRedirect: true,
          adminRedirect: '/emr/organization/list',
          normalRedirect: '/emr/dashboard'
        },
        children: []
      },
      {
        path: 'dashboard',
        data: {
          title: 'Dashboard',
          excludeRoles: [Role.ADMIN_ROLE],
          excludeRedirect: '/emr/organization/list'
        },
        canActivate: [KcAuthGuard],
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
          roles: [Role.USER_ROLE, Role.CLINIC_ROLE, Role.CLINIC_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/administration/administration.module').then((m) => m.AdministrationModule)
      },
      {
        path: 'users',
        data: {
          title: 'Users',
          roles: [Role.USER_ROLE],
        },
        canActivate: [KcAuthGuard],
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'clinics',
        data: {
          title: 'Clinics',
          roles: [Role.CLINIC_ROLE],
        },
        canActivate: [KcAuthGuard],
        loadChildren: () => import('./modules/clinic/clinic.module').then((m) => m.ClinicModule)
      },
      {
        path: 'insurance/company',
        data: {
          title: 'Insurance Company',
          roles: [Role.INSURANCE_COMPANY_ROLE],
        },
        canActivate: [KcAuthGuard],
        loadChildren: () => import('./modules/insurance.company/insurance-company.module').then((m) => m.InsuranceCompanyModule)
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
      },
      {
        path: 'referring/provider',
        loadChildren: () =>
          import('./modules/referring.provider/refering-provider.module').then((m) => m.ReferingProviderModule)
      },
      {
        path: 'pending-activation',
        data: { title: 'Pending Activation' },
        loadChildren: () =>
          import('./modules/activation/activation.module').then((m) => m.ActivationModule)
      },
      {
        path: 'pending-account',
        data: { title: 'Account Pending' },
        loadChildren: () =>
          import('./modules/activation/pending-doctor.module').then((m) => m.PendingDoctorModule)
      },
      {
        path: 'account-inactive',
        data: { title: 'Account Inactive' },
        loadChildren: () =>
          import('./modules/activation/account-inactive.module').then((m) => m.AccountInactiveModule)
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

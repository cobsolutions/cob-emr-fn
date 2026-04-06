import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClinicComponent } from './components/create/create-clinic.component';
import { ListClinicsComponent } from './components/list/list-clinics.component';
import { ScopeGuard } from '../security/service/scope.guard';
import { Role } from '../security/model/role';
import { Scope } from '../security/model/scope';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clinics',
    },
    children: [
      {
        path: 'list',
        component: ListClinicsComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Clinics',
          scopeRole: Role.CLINIC_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'create/clinic',
        component: CreateClinicComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Create Clinic',
          scopeRole: Role.CLINIC_ROLE,
          requiredScope: Scope.MODIFYSCOPE,
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }

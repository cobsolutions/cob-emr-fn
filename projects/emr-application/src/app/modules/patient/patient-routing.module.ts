import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientChartComponent } from './components/chart/patient-chart.component';
import { CreatePatientComponent } from './components/create/create-patient.component';
import { EditPatientComponent } from './components/edit/edit-patient.component';
import { ListPatientComponent } from './components/list/list-patient.component';
import { ScopeGuard } from '../security/service/scope.guard';
import { Role } from '../security/model/role';
import { Scope } from '../security/model/scope';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'patient',
    },
    children: [
      {
        path: 'list',
        component: ListPatientComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'list',
          scopeRole: Role.PATIENT_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'create',
        component: CreatePatientComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'create',
          scopeRole: Role.PATIENT_ROLE,
          requiredScope: Scope.MODIFYSCOPE,
        },
      },
      {
        path: 'chart/patientId/:patientId',
        component: PatientChartComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'chart',
          scopeRole: Role.PATIENT_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'edit/patientId/:patientId',
        component: EditPatientComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'edit',
          scopeRole: Role.PATIENT_ROLE,
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
export class PatientRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientChartComponent } from './components/chart/patient-chart.component';
import { CreatePatientComponent } from './components/create/create-patient.component';
import { EditPatientComponent } from './components/edit/edit-patient.component';
import { ListPatientComponent } from './components/list/list-patient.component';

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
        data: {
          title: 'list',
        },
      },
      {
        path: 'create',
        component: CreatePatientComponent,
        data: {
          title: 'create',
        },
      },
      {
        path: 'chart/patientId/:patientId',
        component: PatientChartComponent,
        data: {
          title: 'chart',
        },
      },
      {
        path: 'edit/patientId/:patientId',
        component: EditPatientComponent,
        data: {
          title: 'edit',
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

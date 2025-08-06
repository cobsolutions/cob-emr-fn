import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClinicComponent } from './components/create/create-clinic.component';
import { ListClinicsComponent } from './components/list/list-clinics.component';

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
        data: {
          title: 'Clinics',
        },
      },
      {
        path: 'create/clinic',
        component: CreateClinicComponent,
        data: {
          title: 'Create Clinic',
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }

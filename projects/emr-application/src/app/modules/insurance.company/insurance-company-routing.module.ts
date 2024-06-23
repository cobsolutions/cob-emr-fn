import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInsuranceCompanyComponent } from './components/create/create-insurance-company.component';
import { ListInsuranceCompanyComponent } from './components/list/list-insurance-company.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Insurance Company',
    },
    children: [
      {
        path: 'list',
        component: ListInsuranceCompanyComponent,
        data: {
          title: 'Insurance Companies',
        },
      },
      {
        path: 'create',
        component: CreateInsuranceCompanyComponent,
        data: {
          title: 'Create Insurance Company',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompanyRoutingModule { }

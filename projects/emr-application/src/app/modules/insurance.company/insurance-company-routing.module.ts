import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../security/model/role';
import { Scope } from '../security/model/scope';
import { ScopeGuard } from '../security/service/scope.guard';
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
        canActivate: [ScopeGuard],
        data: {
          title: 'Insurance Companies',
          scopeRole: Role.INSURANCE_COMPANY_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'create',
        component: CreateInsuranceCompanyComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Create Insurance Company',
          scopeRole: Role.INSURANCE_COMPANY_ROLE,
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
export class InsuranceCompanyRoutingModule { }

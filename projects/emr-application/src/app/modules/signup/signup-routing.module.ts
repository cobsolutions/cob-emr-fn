import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationConfirmationComponent } from './components/confirmation/organization-confirmation.component';
import { CreateOrganizationComponent } from './components/create.organization/create-organization.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'signup',
    },
    children: [
      {
        path: '',
        component: CreateOrganizationComponent,
        data: {
          title: 'create',
        },
      },
      {
        path: 'confiramtion',
        component: OrganizationConfirmationComponent,
        data: {
          title: 'confiramtion',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }

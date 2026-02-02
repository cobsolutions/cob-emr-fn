import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrganizationComponent } from './components/create/create-organization.component';
import { ListOrganizationComponent } from './components/list/list-organization.component';
import { OrganizationUsersComponent } from './components/users/organization-users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Organization',
    },
    children: [
      {
        path: 'create',
        component: CreateOrganizationComponent,
        data: {
          title: 'create',
        },
      },
      {
        path: 'edit/:id',
        component: CreateOrganizationComponent,
        data: {
          title: 'edit',
        },
      },
      {
        path: 'list',
        component: ListOrganizationComponent,
        data: {
          title: 'Organizations',
        },

      },
      {
        path: ':id/users',
        component: OrganizationUsersComponent,
        data: {
          title: 'Users',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClericalUserComponent } from './components/clerical/list/list-clerical-user.component';
import { ListClinicalUserComponent } from './components/clinical/list/list-clinical-user.component';
import { CreateUserComponent } from './components/create.user/create-user.component';
import { EditUserComponent } from './components/edit.user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      {
        path: 'list/clinical/users',
        component: ListClinicalUserComponent,
        data: {
          title: 'Clinical Users',
        },
      },
      {
        path: 'list/clerical/users',
        component: ListClericalUserComponent,
        data: {
          title: 'Clerical Users',
        },
      },
      {
        path: 'create',
        component: CreateUserComponent,
        data: {
          title: 'Create User ',
        },
      },
      {
        path: 'edit',
        component: EditUserComponent,
        data: {
          title: 'Create User ',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

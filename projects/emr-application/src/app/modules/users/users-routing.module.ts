import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClericalUserComponent } from './components/clerical/list/list-clerical-user.component';
import { ListClinicalUserComponent } from './components/clinical/list/list-clinical-user.component';
import { CreateUserComponent } from './components/create.user/create-user.component';
import { EditUserComponent } from './components/edit.user/edit-user.component';
import { ScopeGuard } from '../security/service/scope.guard';
import { Role } from '../security/model/role';
import { Scope } from '../security/model/scope';

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
        canActivate: [ScopeGuard],
        data: {
          title: 'Clinical Users',
          scopeRole: Role.USER_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'list/clerical/users',
        component: ListClericalUserComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Clerical Users',
          scopeRole: Role.USER_ROLE,
          requiredScope: Scope.VIEWSCOPE,
        },
      },
      {
        path: 'create',
        component: CreateUserComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Create User ',
          scopeRole: Role.USER_ROLE,
          requiredScope: Scope.MODIFYSCOPE,
        },
      },
      {
        path: 'edit',
        component: EditUserComponent,
        canActivate: [ScopeGuard],
        data: {
          title: 'Create User ',
          scopeRole: Role.USER_ROLE,
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
export class UsersRoutingModule { }

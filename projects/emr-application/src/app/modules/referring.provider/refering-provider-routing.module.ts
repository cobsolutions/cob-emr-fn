import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReferringProviderComponent } from './components/list/list-referring-provider.component';
import { ScopeGuard } from '../security/service/scope.guard';
import { Role } from '../security/model/role';
import { Scope } from '../security/model/scope';

const routes: Routes = [{
  path: '',
  data: {
    title: 'referring provider',
  },
  children: [
    {
      path: 'list',
      component: ListReferringProviderComponent,
      canActivate: [ScopeGuard],
      data: {
        title: 'list',
        scopeRole: Role.REFERRING_DOCTOR_ROLE,
        requiredScope: Scope.VIEWSCOPE,
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferingProviderRoutingModule { }

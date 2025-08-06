import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReferringProviderComponent } from './components/list/list-referring-provider.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'referring provider',
  },
  children: [
    {
      path: 'list',
      component: ListReferringProviderComponent,
      data: {
        title: 'list',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferingProviderRoutingModule { }

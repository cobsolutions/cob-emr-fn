import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingCosignDocsComponent } from './components/incoming-cosign-docs.component';

const routes: Routes = [{
  path: '',
  component: IncomingCosignDocsComponent,
  data: {
    title: 'Incoming Cosign Docs'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingCosignDocsRoutingModule { }

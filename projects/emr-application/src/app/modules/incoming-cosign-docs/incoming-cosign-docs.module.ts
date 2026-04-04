import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule, TableModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

import { IncomingCosignDocsRoutingModule } from './incoming-cosign-docs-routing.module';
import { IncomingCosignDocsComponent } from './components/incoming-cosign-docs.component';

@NgModule({
  declarations: [
    IncomingCosignDocsComponent
  ],
  imports: [
    CommonModule,
    IncomingCosignDocsRoutingModule,
    TableModule,
    SpinnerModule,
    IconModule
  ]
})
export class IncomingCosignDocsModule { }

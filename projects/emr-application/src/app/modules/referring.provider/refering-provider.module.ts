import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferingProviderRoutingModule } from './refering-provider-routing.module';
import { ListReferringProviderComponent } from './components/list/list-referring-provider.component';


@NgModule({
  declarations: [
    ListReferringProviderComponent
  ],
  imports: [
    CommonModule,
    ReferingProviderRoutingModule
  ]
})
export class ReferingProviderModule { }

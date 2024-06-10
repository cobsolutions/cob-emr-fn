import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferingProviderRoutingModule } from './refering-provider-routing.module';
import { ListReferringProviderComponent } from './components/list/list-referring-provider.component';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { EmrCommonModule } from '../common/emr-common.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateReferringProviderComponent } from './components/create/create-referring-provider.component';


@NgModule({
  declarations: [
    ListReferringProviderComponent,
    CreateReferringProviderComponent
  ],
  imports: [
    CommonModule,
    ReferingProviderRoutingModule,
    SmartPaginationModule,
    CollapseModule,
    SmartTableModule,
    EmrCommonModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class ReferingProviderModule { }

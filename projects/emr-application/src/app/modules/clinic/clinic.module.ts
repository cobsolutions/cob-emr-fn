import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmrCommonModule } from '../common/emr-common.module';
import { ListClinicsComponent } from './components/list/list-clinics.component';


@NgModule({
  declarations: [
    ListClinicsComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    SmartPaginationModule,
    CollapseModule,
    SmartTableModule,
    EmrCommonModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class ClinicModule { }

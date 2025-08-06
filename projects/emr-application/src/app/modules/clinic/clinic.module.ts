import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmrCommonModule } from '../common/emr-common.module';
import { ListClinicsComponent } from './components/list/list-clinics.component';
import { CreateClinicComponent } from './components/create/create-clinic.component';
import { EditClinicComponent } from './components/edit/edit-clinic.component';


@NgModule({
  declarations: [
    ListClinicsComponent,
    CreateClinicComponent,
    EditClinicComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import {
  CreateInsuranceCompanyComponent,
  ListInsuranceCompanyComponent,
  CreateUserComponent,
  ListUserComponent
} from './index'
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { EmrCommonModule } from '../common/emr-common.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListClinicComponent } from './components/clinic/list/list-clinic.component';
import { CreateClinicComponent } from './components/clinic/create/create-clinic.component';
import { ListClinicalUserComponent } from './components/user/list/list.clinical.user/list-clinical-user.component';
import { ListDoctorUserComponent } from './components/user/list/list.doctor.user/list-doctor-user.component';
import { EditUserComponent } from './components/user/edit/edit-user.component';

@NgModule({
  declarations: [
    CreateInsuranceCompanyComponent,
    ListInsuranceCompanyComponent,
    CreateUserComponent,
    ListUserComponent,
    ListClinicComponent,
    CreateClinicComponent,
    ListClinicalUserComponent,
    ListDoctorUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SmartPaginationModule,
    CollapseModule,
    SmartTableModule,
    EmrCommonModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class AdministrationModule { }

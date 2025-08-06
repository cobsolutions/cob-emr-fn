import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceCompanyRoutingModule } from './insurance-company-routing.module';
import { ListInsuranceCompanyComponent } from './components/list/list-insurance-company.component';
import { CreateInsuranceCompanyComponent } from './components/create/create-insurance-company.component';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { EmrCommonModule } from '../common/emr-common.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditInsuranceCompanyComponent } from './components/edit/edit-insurance-company.component';


@NgModule({
  declarations: [
    ListInsuranceCompanyComponent,
    CreateInsuranceCompanyComponent,
    EditInsuranceCompanyComponent
  ],
  imports: [
    CommonModule,
    InsuranceCompanyRoutingModule,
    SmartPaginationModule,
    CollapseModule,
    SmartTableModule,
    EmrCommonModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class InsuranceCompanyModule { }

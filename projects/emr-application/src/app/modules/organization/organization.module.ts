import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';

import { EmrCommonModule } from '../common/emr-common.module';
import { AccordionModule, CollapseModule, DatePickerModule, ModalModule, SharedModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  CreateOrganizationComponent,
  ListOrganizationComponent,
  OrganizationClinicsCreationComponent
} from './index';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CreateAdministratorDoctorComponent } from './components/organization.clinic.creation/administrator.doctor.create/create-administrator-doctor.component';
@NgModule({
  declarations: [
    CreateOrganizationComponent,
    ListOrganizationComponent,
    OrganizationClinicsCreationComponent,
    CreateAdministratorDoctorComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    EmrCommonModule,
    SmartTableModule,
    SharedModule,
    CollapseModule,
    ModalModule,
    DatePickerModule,
    AccordionModule,
    AutocompleteLibModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class OrganizationModule { }

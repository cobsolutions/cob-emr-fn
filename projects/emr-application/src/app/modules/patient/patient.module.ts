import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PatientRoutingModule } from './patient-routing.module';


import { NgxSpinnerModule } from 'ngx-spinner';
import { EmrCommonModule } from '../common/emr-common.module';


import {
  CreatePatientComponent,
  ListPatientComponent,
  PatientChartCaseComponent,
  PatientChartComponent,
  PreviousAppointmentComponent,
  UpcomingAppointmentComponent
} from './index';

import {
  PatientBasicInfoComponent, PatientCaseInfoComponent, PatientClinicInfoComponent, PatientContactInfoComponent,
  PatientEmergencyInfoComponent, PatientIdInfoComponent, PatientInsuranceInfoComponent
} from './components/create';
import { PopoverModule, AccordionModule, DatePickerModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { PatientPaymentComponent } from './components/chart/payment/patient-payment.component';

const APP_PATIENTS_COMPONENTS = [
  ListPatientComponent,
  CreatePatientComponent,
  PatientChartComponent
]

const APP_PATIENTS_DEPENDENCIES_COMPONENTS = [
  PatientBasicInfoComponent,
  PatientIdInfoComponent,
  PatientContactInfoComponent,
  PatientEmergencyInfoComponent,
  PatientInsuranceInfoComponent,
  PatientClinicInfoComponent,
  PatientCaseInfoComponent
]

const APP_PATIENT_CHART_COMPONENTS = [
  UpcomingAppointmentComponent,
  PreviousAppointmentComponent,
  PatientChartCaseComponent

]

@NgModule({
  declarations: [
    APP_PATIENTS_COMPONENTS,
    ...APP_PATIENTS_DEPENDENCIES_COMPONENTS,
    ...APP_PATIENT_CHART_COMPONENTS,
    PatientPaymentComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    EmrCommonModule,
    SmartTableModule,
    SmartPaginationModule,
    DatePickerModule,
    ModalModule,
    AccordionModule,
    PopoverModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class PatientModule { }

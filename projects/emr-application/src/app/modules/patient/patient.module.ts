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
import { PopoverModule, AccordionModule, DatePickerModule, ModalModule, SmartPaginationModule, SmartTableModule, TableModule } from '@coreui/angular-pro';
import { PatientPaymentComponent } from './components/chart/payment/patient-payment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { InitialExaminationComponent } from './components/medical.note/initial.examination/initial-examination.component';
import { SubjectiveComponent } from './components/medical.note/initial.examination/subjective/subjective.component';
import { BasicInformationComponent } from './components/medical.note/initial.examination/subjective/basic/basic-information.component';
import { PriorLevelFunctionComponent } from './components/medical.note/initial.examination/subjective/prior.level.function/prior-level-function.component';
import { CurrentFunvtionlimitComponent } from './components/medical.note/initial.examination/subjective/current.function.limit/current-funvtionlimit.component';
import { IcdtenComponent } from './components/medical.note/initial.examination/subjective/basic/icd10/icdten.component';
import { PainComponent } from './components/medical.note/initial.examination/subjective/pain/pain.component';
import { PainEvaluationComponent } from './components/medical.note/initial.examination/subjective/pain/pain.evaluation/pain-evaluation.component';
import {MatRadioModule} from '@angular/material/radio';
import { MedicalHistoryComponent } from './components/medical.note/initial.examination/subjective/medical.history/medical-history.component';
import { DependencyFieldComponent } from './components/medical.note/dependency.field/dependency-field.component';
import { MultipleDependencyFieldComponent } from './components/medical.note/multiple.dependency.field/multiple-dependency-field.component';
import { ObjectiveComponent } from './components/medical.note/initial.examination/objective/objective.component';
import { ObservationComponent } from './components/medical.note/initial.examination/objective/observation/observation.component';
import { AssessmentComponent } from './components/medical.note/initial.examination/assessment/assessment.component';
import { PlanComponent } from './components/medical.note/initial.examination/plan/plan.component';
import { BillingComponent } from './components/medical.note/initial.examination/billing/billing.component';
import { SoapFieldBuilderComponent } from './components/medical.note/field.control.builder/soap-field-builder.component';
import { MutlipleCheckBoxComponent } from './components/medical.note/custom.input/multiple.checkbox/mutliple-check-box.component';
import { MultipleRadioComponent } from './components/medical.note/custom.input/mutliple.radio/multiple-radio.component';
import { ProceduresComponent } from './components/medical.note/initial.examination/plan/components/procedures/procedures.component';
import { ModalitiesComponent } from './components/medical.note/initial.examination/plan/components/modalities/modalities.component';
import { SpecialtiesComponent } from './components/medical.note/initial.examination/plan/components/specialties/specialties.component';
import { UntimedCodesComponent } from './components/medical.note/initial.examination/billing/components/untimedCodes/untimed-codes.component';
import { CalendarMonthComponent } from './components/medical.note/initial.examination/billing/components/calendar.month/calendar-month.component';
import { BillingCodeNumberComponent } from './components/medical.note/custom.input/billing.code/billing-code-number.component';
import { RespiratoryComponent } from './components/medical.note/initial.examination/billing/components/respiratory/respiratory.component';
import { NerveConductionStudiesComponent } from './components/medical.note/initial.examination/billing/components/nerve.conduction.studies/nerve-conduction-studies.component';
import { OtherTreatmentProceduresComponent } from './components/medical.note/initial.examination/billing/components/other.treatment.procedures/other-treatment-procedures.component';
import { SuppliesComponent } from './components/medical.note/initial.examination/billing/components/supplies/supplies.component';
import { SplintsOrthoticsComponent } from './components/medical.note/initial.examination/billing/components/splints.orthotics/splints-orthotics.component';
import { CastsComponent } from './components/medical.note/initial.examination/billing/components/Casts/casts.component';
import { BracesComponent } from './components/medical.note/initial.examination/billing/components/Braces/braces.component';
import { DirectTimedCodesComponent } from './components/medical.note/initial.examination/billing/components/direct.timed.codes/direct-timed-codes.component';
import { InspectionComponent } from './components/medical.note/initial.examination/objective/inspection/inspection.component';
import { OmtComponent } from './components/medical.note/initial.examination/objective/omt/omt.component';
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
    InitialExaminationComponent,
    SubjectiveComponent,
    BasicInformationComponent,
    PriorLevelFunctionComponent,
    CurrentFunvtionlimitComponent,
    IcdtenComponent,
    PainComponent,
    PainEvaluationComponent,
    MedicalHistoryComponent,
    DependencyFieldComponent,
    MultipleDependencyFieldComponent,
    ObjectiveComponent,
    ObservationComponent,
    AssessmentComponent,
    PlanComponent,
    BillingComponent,
    SoapFieldBuilderComponent,
    MutlipleCheckBoxComponent,
    MultipleRadioComponent,
    ProceduresComponent,
    ModalitiesComponent,
    SpecialtiesComponent,
    UntimedCodesComponent,
    CalendarMonthComponent,
    BillingCodeNumberComponent,
    RespiratoryComponent,
    NerveConductionStudiesComponent,
    OtherTreatmentProceduresComponent,
    SuppliesComponent,
    SplintsOrthoticsComponent,
    CastsComponent,
    BracesComponent,
    DirectTimedCodesComponent,
    InspectionComponent,
    OmtComponent,
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
    MatStepperModule,
    MatRadioModule,
    TableModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class PatientModule { }

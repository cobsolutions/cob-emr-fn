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
import { PopoverModule, AccordionModule, DatePickerModule, ModalModule, SmartPaginationModule, SmartTableModule, TableModule, CalloutModule, SpinnerModule } from '@coreui/angular-pro';
import { PatientPaymentComponent } from './components/chart/payment/patient-payment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { InitialExaminationComponent } from './components/medical.note/initial.examination/initial-examination.component';
import { MatRadioModule } from '@angular/material/radio';
import { DependencyFieldComponent } from './components/medical.note/dependency.field/dependency-field.component';
import { MultipleDependencyFieldComponent } from './components/medical.note/multiple.dependency.field/multiple-dependency-field.component';

import { SoapFieldBuilderComponent } from './components/medical.note/field.control.builder/soap-field-builder.component';
import { MutlipleCheckBoxComponent } from './components/medical.note/custom.input/multiple.checkbox/mutliple-check-box.component';
import { MultipleRadioComponent } from './components/medical.note/custom.input/mutliple.radio/multiple-radio.component';
import { BillingCodeNumberComponent } from './components/medical.note/custom.input/billing.code/billing-code-number.component';
import { MultipleTextInputComponent } from './components/medical.note/custom.input/profile/multiple.input/multiple-text-input.component';
import { WalkTestComponent } from './components/medical.note/custom.input/profile/observation/walk.test/walk-test.component';

import { DailyNoteComponent } from './components/medical.note/daily.note/daily-note.component';
import { BasicInformationComponent } from './components/medical.note/components/subjective/basic/basic-information.component';
import { IcdtenComponent } from './components/medical.note/components/subjective/basic/icd10/icdten.component';
import { CurrentFunvtionlimitComponent } from './components/medical.note/components/subjective/current.function.limit/current-funvtionlimit.component';
import { MedicalHistoryComponent } from './components/medical.note/components/subjective/medical.history/medical-history.component';
import { PainComponent } from './components/medical.note/components/subjective/pain/pain.component';
import { PainEvaluationComponent } from './components/medical.note/components/subjective/pain/pain.evaluation/pain-evaluation.component';
import { PriorLevelFunctionComponent } from './components/medical.note/components/subjective/prior.level.function/prior-level-function.component';
import { SubjectiveComponent } from './components/medical.note/components/subjective/subjective.component';
import { AssessmentComponent } from './components/medical.note/components/assessment/assessment.component';
import { RomComponent } from './components/medical.note/components/objective/arom.prom/rom.component';
import { InspectionComponent } from './components/medical.note/components/objective/inspection/inspection.component';
import { NeuroVascularRightLeftComponent } from './components/medical.note/components/objective/neuro.vascular/components/neuro.vascular.right.left/neuro-vascular-right-left.component';
import { SemmesWeinsteinUpperComponent } from './components/medical.note/components/objective/neuro.vascular/components/semmes.weinstein.upper/semmes-weinstein-upper.component';
import { VertebralArteryComponent } from './components/medical.note/components/objective/neuro.vascular/components/vertebral.artery/vertebral-artery.component';
import { NeuroVascularComponent } from './components/medical.note/components/objective/neuro.vascular/neuro-vascular.component';
import { ObjectiveComponent } from './components/medical.note/components/objective/objective.component';
import { ObservationComponent } from './components/medical.note/components/objective/observation/observation.component';
import { ObjectiveOMTTestComponent } from './components/medical.note/components/objective/omt.test/test.control/objective-omttest.component';
import { OmtComponent } from './components/medical.note/components/objective/omt/omt.component';
import { PalpationComponent } from './components/medical.note/components/objective/palpation/palpation.component';
import { RangeOfMotionComponent } from './components/medical.note/components/objective/range.of.motion/range-of-motion.component';
import { MaterialHandlingComponent } from './components/medical.note/components/objective/special.tests/components/material.handling/material-handling.component';
import { NonMaterialHandlingComponent } from './components/medical.note/components/objective/special.tests/components/non.material.handling/non-material-handling.component';
import { SpecialTestsRightLeftCheckComponent } from './components/medical.note/components/objective/special.tests/components/special.tests.right.left.check/special-tests-right-left-check.component';
import { SpecialTestsRightLeftSelectComponent } from './components/medical.note/components/objective/special.tests/components/special.tests.right.left.select/special-tests-right-left-select.component';
import { SpecialTestsComponent } from './components/medical.note/components/objective/special.tests/special-tests.component';
import { GripComponent } from './components/medical.note/components/objective/strength/components/grip/grip.component';
import { GrossMuscleTestComponent } from './components/medical.note/components/objective/strength/components/gross.muscle.test/gross-muscle-test.component';
import { ManualMuscleTestComponent } from './components/medical.note/components/objective/strength/components/manual.muscle.test/manual-muscle-test.component';
import { MovementsTestComponent } from './components/medical.note/components/objective/strength/components/movements.test/movements-test.component';
import { LowerBodyMyofascialTestComponent } from './components/medical.note/components/objective/strength/components/neurac.stability.test/lower.body.myofascial.tests/lower-body-myofascial-test.component';
import { UpperBodyMyofascialTestComponent } from './components/medical.note/components/objective/strength/components/neurac.stability.test/upper.body.myofascial.test/upper-body-myofascial-test.component';
import { TissueTensionUpperComponent } from './components/medical.note/components/objective/strength/components/selective.tissue.tension.upper/tissue-tension-upper.component';
import { ChildGripComponent } from './components/medical.note/components/objective/strength/components/sub.grip/child-grip.component';
import { StrengthComponent } from './components/medical.note/components/objective/strength/strength.component';
import { BillingComponent } from './components/medical.note/components/billing/billing.component';
import { BracesComponent } from './components/medical.note/components/billing/components/Braces/braces.component';
import { CastsComponent } from './components/medical.note/components/billing/components/Casts/casts.component';
import { DirectTimedCodesComponent } from './components/medical.note/components/billing/components/direct.timed.codes/direct-timed-codes.component';
import { NerveConductionStudiesComponent } from './components/medical.note/components/billing/components/nerve.conduction.studies/nerve-conduction-studies.component';
import { OtherTreatmentProceduresComponent } from './components/medical.note/components/billing/components/other.treatment.procedures/other-treatment-procedures.component';
import { RespiratoryComponent } from './components/medical.note/components/billing/components/respiratory/respiratory.component';
import { SplintsOrthoticsComponent } from './components/medical.note/components/billing/components/splints.orthotics/splints-orthotics.component';
import { SuppliesComponent } from './components/medical.note/components/billing/components/supplies/supplies.component';
import { UntimedCodesComponent } from './components/medical.note/components/billing/components/untimedCodes/untimed-codes.component';
import { CalendarMonthComponent } from './components/medical.note/components/billing/components/calendar.month/calendar-month.component';
import { ModalitiesComponent } from './components/medical.note/components/plan/components/modalities/modalities.component';
import { ProceduresComponent } from './components/medical.note/components/plan/components/procedures/procedures.component';
import { SpecialtiesComponent } from './components/medical.note/components/plan/components/specialties/specialties.component';
import { PlanComponent } from './components/medical.note/components/plan/plan.component';
import { ProgressNoteComponent } from './components/medical.note/progress.note/progress-note.component';
import { QuickDischargeNoteComponent } from './components/medical.note/discharge.note/quick/quick-discharge-note.component';
import { FullDischargeNoteComponent } from './components/medical.note/discharge.note/full/full-discharge-note.component';
import { ForwardModalComponent } from './components/medical.note/components/forward.modal/forward-modal.component';
import { CustomDateComponent } from './components/medical.note/custom.input/date/custom-date.component';
import { RightLeftSelectComponent } from './components/medical.note/custom.input/rightLeftSelect/right-left-select.component';
import { SixMinWalkTestComponent } from './components/medical.note/custom.input/observation/six.min.walk.test/six-min-walk-test.component';
import { RomTestComponent } from './components/medical.note/custom.input/rom/rom-test.component';
import { HandROMComponent } from './components/hand.rom/hand-rom.component';
import { TopRightLeftSelectsComponent } from './components/medical.note/custom.input/strength/top.right.left.selects/top-right-left-selects.component';
import { TopRightLeftControlsComponent } from './components/medical.note/custom.input/strength/top.right.left.controls/top-right-left-controls.component';
import { CovavgComponent } from './components/medical.note/custom.input/strength/cov.avg/covavg.component';
import { MTopRightLeftControlsComponent } from './components/medical.note/custom.input/strength/m.top.right.left.controls/m-top-right-left-controls.component';
import { RightLeftMSelectComponent } from './components/medical.note/custom.input/Neuro.vascular/right.left.m.select/right-left-mselect.component';
import { CutomPalpationComponent } from './components/medical.note/custom.input/palpation/cutom-palpation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FinalizeMedicalNoteComponent } from './components/medical.note/finalize/finalize-medical-note.component';
import { DailyPlanComponent } from './components/medical.note/components/plan/daily/daily-plan.component';
import { DischargePlanComponent } from './components/medical.note/components/plan/discharge/discharge-plan.component';
import { UeqdTestComponent } from './components/omt.tests/ueqd/ueqd-test.component';
import { UefiTestComponent } from './components/omt.tests/uefi/uefi-test.component';
import { SpadiTestComponent } from './components/omt.tests/spadi/spadi-test.component';
import { DashTestComponent } from './components/omt.tests/dash/dash-test.component';
import { MolbpTestComponent } from './components/omt.tests/spine/molbp/molbp-test.component';
import { OlbpTestComponent } from './components/omt.tests/spine/olbp/olbp-test.component';
import { NdiTestComponent } from './components/omt.tests/spine/ndi/ndi-test.component';
import { LefsTestComponent } from './components/omt.tests/lower.extremity/lefs/lefs-test.component';
import { FaamTestComponent } from './components/omt.tests/lower.extremity/faam/faam-test.component';
import { HoosTestComponent } from './components/omt.tests/lower.extremity/hoos/hoos-test.component';
import { KoosTestComponent } from './components/omt.tests/lower.extremity/koos/koos-test.component';
import { BergTestComponent } from './components/omt.tests/balance/berg/berg-test.component';
import { AbcTestComponent } from './components/omt.tests/balance/abc/abc-test.component';
import { TinettiComponent } from './components/omt.tests/balance/tinetti/tinetti.component';
import { FabTestComponent } from './components/omt.tests/balance/fab/fab-test.component';
import { ShowOMTTestComponent } from './components/medical.note/components/objective/omt.test/show.omt.test/show-omttest.component';
import { InitialExaminationScoreSummaryComponent } from './components/medical.note/summary/initial.examination.score.summary/initial-examination-score-summary.component';
import { InitialExaminationPlanSummaryComponent } from './components/medical.note/summary/initial.examination.plan.summary/initial-examination-plan-summary.component';
import { InitialExaminationSummaryComponent } from './components/medical.note/summary/initial.examination/initial-examination-summary.component';
import { EditPatientComponent } from './components/edit/edit-patient.component';
import { AuthorizationPatientCaseComponent } from './components/authorization/authorization-patient-case.component';
import { PatientAvatarComponent } from './patient.avatar/patient-avatar.component';
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
    MultipleTextInputComponent,
    ObjectiveOMTTestComponent,
    WalkTestComponent,
    RangeOfMotionComponent,
    RomComponent,
    StrengthComponent,
    TissueTensionUpperComponent,
    GripComponent,
    ChildGripComponent,
    UpperBodyMyofascialTestComponent,
    LowerBodyMyofascialTestComponent,
    MovementsTestComponent,
    GrossMuscleTestComponent,
    ManualMuscleTestComponent,
    NeuroVascularComponent,
    VertebralArteryComponent,
    NeuroVascularRightLeftComponent,
    SemmesWeinsteinUpperComponent,
    SpecialTestsComponent,
    SpecialTestsRightLeftSelectComponent,
    SpecialTestsRightLeftCheckComponent,
    MaterialHandlingComponent,
    NonMaterialHandlingComponent,
    PalpationComponent,
    DailyNoteComponent,
    ProgressNoteComponent,
    QuickDischargeNoteComponent,
    FullDischargeNoteComponent,
    ForwardModalComponent,
    CustomDateComponent,
    RightLeftSelectComponent,
    SixMinWalkTestComponent,
    RomTestComponent,
    HandROMComponent,
    TopRightLeftSelectsComponent,
    TopRightLeftControlsComponent,
    CovavgComponent,
    MTopRightLeftControlsComponent,
    RightLeftMSelectComponent,
    CutomPalpationComponent,
    FinalizeMedicalNoteComponent,
    DailyPlanComponent,
    DischargePlanComponent,
    UeqdTestComponent,
    UefiTestComponent,
    SpadiTestComponent,
    DashTestComponent,
    MolbpTestComponent,
    OlbpTestComponent,
    NdiTestComponent,
    LefsTestComponent,
    FaamTestComponent,
    HoosTestComponent,
    KoosTestComponent,
    BergTestComponent,
    AbcTestComponent,
    TinettiComponent,
    FabTestComponent,
    ShowOMTTestComponent,
    InitialExaminationScoreSummaryComponent,
    InitialExaminationPlanSummaryComponent,
    InitialExaminationSummaryComponent,
    EditPatientComponent,
    AuthorizationPatientCaseComponent,
    PatientAvatarComponent,
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
    CalloutModule ,
    MatTooltipModule,
    SpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class PatientModule { }

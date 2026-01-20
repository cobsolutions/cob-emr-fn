import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Omt } from './models/Omt';
import { OutcomeMeasurementToolsMapperService } from './services/outcome-measurement-tools-mapper.service';

// Interface for test configuration
interface OmtTestConfig {
  key: string;           // Unique identifier for the test
  scoreField: string;    // Form control name for the score
  resultPath?: string;   // Path to extract result (default: 'results.total')
}

@Component({
  selector: 'outcome-measurement-tools',
  templateUrl: './outcome-measurement-tools.component.html',
  styleUrls: ['./outcome-measurement-tools.component.css']
})
export class OutcomeMeasurementToolsComponent implements OnInit {
  omtForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() omtData: Omt | null = null;
  @Input() noteId: string;

  // Generic test modal state
  activeTest: string | null = null;
  showTestModal: boolean = false;

  // Test configurations
  testConfigs: OmtTestConfig[] = [
    { key: 'dash', scoreField: 'dash_score' },
    { key: 'uefi', scoreField: 'upper_extremity_functional_score' },
    { key: 'spadi', scoreField: 'shoulder_total_percent' },
    { key: 'ndi', scoreField: 'neck_disability_score' },
    { key: 'olbp', scoreField: 'oswestry_disability_percent' },
    { key: 'molbp', scoreField: 'modified_oswestry_disability_percent' },
    { key: 'lefs', scoreField: 'lower_extremity_functional_score' },
    { key: 'faam', scoreField: 'faam_sports_score' },
    { key: 'hoos', scoreField: 'hoos_total_score' },
    { key: 'koos', scoreField: 'koos_total_score' },
    { key: 'abc', scoreField: 'abc_scale_score' },
    { key: 'berg', scoreField: 'berg_score' },
    { key: 'fab', scoreField: 'fullerton_score' },
  ];

  // Visibility flags for dependent fields
  showCustomOutcomeFields: boolean = false;
  showVestibularFields: boolean = false;
  showCerebralConcussionFields: boolean = false;
  showLossOfConsciousnessFields: boolean = false;
  showPostTraumaticAmnesiaFields: boolean = false;
  showPostCerebralConcussionScaleFields: boolean = false;
  showUpperExtremityFields: boolean = false;
  showShoulderPainDisabilityFields: boolean = false;
  showUpperExtremityFunctionalFields: boolean = false;
  showDashFields: boolean = false;
  showHandProfileFields: boolean = false;
  showSpineFields: boolean = false;
  showNeckDisabilityFields: boolean = false;
  showOswestryLowBackPainFields: boolean = false;
  showModifiedOswestryFields: boolean = false;
  showQuebecBackPainFields: boolean = false;
  showLowerExtremityFields: boolean = false;
  showLowerExtremityFunctionalFields: boolean = false;
  showFaamSportsFields: boolean = false;
  showHoosFields: boolean = false;
  showKoosFields: boolean = false;
  showBalanceFields: boolean = false;
  showAbcScaleFields: boolean = false;
  showMctsibFields: boolean = false;
  showTinettiFields: boolean = false;
  showBergFields: boolean = false;
  showFullertonFields: boolean = false;
  showPainFields: boolean = false;
  showMcgillPainFields: boolean = false;
  showWongBakerFields: boolean = false;
  showPainDisabilityIndexFields: boolean = false;
  showCroftDisabilityFields: boolean = false;
  showFabqFields: boolean = false;
  showGeneralFunctionFields: boolean = false;
  showTimedUpAndGoFields: boolean = false;
  showTimedUpAndGoAloneFields: boolean = false;
  showTimedUpAndGoCognitiveFields: boolean = false;
  showTimedUpAndGoManualFields: boolean = false;
  showFiveTimeSitFields: boolean = false;
  showAuditCFields: boolean = false;
  showBarthelIndexFields: boolean = false;
  showFallsEfficacyFields: boolean = false;
  showDynamicGaitFields: boolean = false;
  showFunctionalReachFields: boolean = false;
  showSlumsFields: boolean = false;
  showGeriatricDepressionFields: boolean = false;
  showElderAbuseFields: boolean = false;
  showFotoPatientFields: boolean = false;


  // Dropdown options for vestibular
  lossOfConsciousnessOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'less_than_30_min', label: 'Less than 30 minutes' },
    { value: 'more_than_30_min', label: 'More than 30 minutes' }
  ];

  postTraumaticAmnesiaOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'less_than_24_hrs', label: 'Less than 24 hours' },
    { value: 'more_than_24_hrs', label: 'More than 24 hours' }
  ];

  constructor(
    private fb: FormBuilder,
    private omtMapper: OutcomeMeasurementToolsMapperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();

    // Load data if provided
    if (this.omtData) {
      this.loadFromDto(this.omtData);
    }

    this.formReady.emit(this.omtForm);
  }

  /**
   * Get the OMT model from form (for sending to backend)
   */
  getOutcomeMeasurementToolsModel(): Omt {
    return this.omtMapper.toModel(this.omtForm.getRawValue());
  }

  /**
   * Load OMT data from DTO into form
   */
  loadFromDto(dto: Omt): void {
    const formValue = this.omtMapper.fromDto(dto);
    this.omtForm.patchValue(formValue);
  }

  private initForm(): void {
    this.omtForm = this.fb.group({
      custom_outcome_measurement: ['no'],
      custom_outcome_name: [''],
      custom_outcome_comments: [''],
      custom_outcome_score: [''],
      vestibular: ['no'],
      cerebral_concussion: ['no'],
      loss_of_consciousness: ['no'],
      loss_of_consciousness_select: ['not_tested'],
      loss_of_consciousness_text: [''],
      post_traumatic_amnesia: ['no'],
      post_traumatic_amnesia_select: ['not_tested'],
      post_traumatic_amnesia_text: [''],
      post_cerebral_concussion_scale: ['no'],
      post_cerebral_raw_score: [''],
      post_cerebral_classification: [''],
      post_cerebral_rank: [''],
      post_cerebral_text: [''],
      upper_extremity: ['no'],
      shoulder_pain_disability: ['no'],
      shoulder_total_percent: [''],
      shoulder_pain_percent: [''],
      shoulder_disability_percent: [''],
      upper_extremity_functional: ['no'],
      upper_extremity_functional_score: [''],
      dash: ['no'],
      dash_score: [''],
      hand_profile: ['no'],
      hand_profile_text: [''],
      spine: ['no'],
      neck_disability_index: ['no'],
      neck_disability_score: [''],
      neck_disability_total_percent: [''],
      oswestry_low_back_pain: ['no'],
      oswestry_disability_percent: [''],
      modified_oswestry_low_back_pain: ['no'],
      modified_oswestry_disability_percent: [''],
      quebec_back_pain_disability: ['no'],
      quebec_back_pain_score: [''],
      lower_extremity: ['no'],
      lower_extremity_functional_scale: ['no'],
      lower_extremity_functional_score: [''],
      faam_sports: ['no'],
      faam_sports_score: [''],
      hoos: ['no'],
      hoos_total_score: [''],
      koos: ['no'],
      koos_total_score: [''],
      balance: ['no'],
      abc_scale: ['no'],
      abc_scale_score: [''],
      mctsib: ['no'],
      mctsib_condition_1: [''],
      mctsib_condition_2: [''],
      mctsib_condition_3: [''],
      mctsib_condition_4: [''],
      mctsib_total: [''],
      mctsib_comments: [''],
      tinetti: ['no'],
      tinetti_score: [''],
      berg: ['no'],
      berg_score: [''],
      fullerton: ['no'],
      fullerton_score: [''],
      pain: ['no'],
      mcgill_pain: ['no'],
      mcgill_pain_score: [''],
      mcgill_completed: [false],
      mcgill_followup_plan: [''],
      wong_baker: ['no'],
      wong_baker_score: [''],
      wong_baker_followup_plan: [''],
      pain_disability_index: ['no'],
      pain_disability_score: [''],
      pain_disability_followup_plan: [''],
      croft_disability: ['no'],
      croft_disability_score: [''],
      croft_disability_followup_plan: [''],
      fabq: ['no'],
      fabq_scale_1: [''],
      fabq_scale_2: [''],
      fabq_followup_plan: [''],
      general_function: ['no'],
      timed_up_and_go: ['no'],
      timed_up_and_go_alone: ['no'],
      timed_up_and_go_cognitive: ['no'],
      timed_up_and_go_manual: ['no'],
      five_time_sit: ['no'],
      five_time_sit_score: [''],
      five_time_sit_comments: [''],
      audit_c: ['no'],
      audit_c_score: [''],
      barthel_index: ['no'],
      barthel_index_score: [''],
      falls_efficacy: ['no'],
      falls_efficacy_total: [''],
      dynamic_gait: ['no'],
      dynamic_gait_score: [''],
      functional_reach: ['no'],
      functional_reach_score: [''],
      functional_reach_units: ['inches'],
      slums: ['no'],
      slums_score: [''],
      geriatric_depression: ['no'],
      geriatric_depression_score: [''],
      elder_abuse: ['no'],
      elder_abuse_score: [''],
      elder_abuse_followup_plan: [''],
      foto_patient: ['no'],
      foto_patient_score: ['']
    });
  }

  private setupValueChangeListeners(): void {
    // Custom Outcome Measurement dependency
    this.omtForm.get('custom_outcome_measurement')?.valueChanges.subscribe(value => {
      this.showCustomOutcomeFields = value === 'yes';
      if (!this.showCustomOutcomeFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });

    // Vestibular dependency
    this.omtForm.get('vestibular')?.valueChanges.subscribe(value => {
      this.showVestibularFields = value === 'yes';
      if (!this.showVestibularFields) {
        this.omtForm.patchValue({
          cerebral_concussion: 'no'
        });
        this.showCerebralConcussionFields = false;
      }
    });

    // Cerebral Concussion dependency (nested under Vestibular)
    this.omtForm.get('cerebral_concussion')?.valueChanges.subscribe(value => {
      this.showCerebralConcussionFields = value === 'yes';
      if (!this.showCerebralConcussionFields) {
        this.omtForm.patchValue({
          loss_of_consciousness: 'no',
          post_traumatic_amnesia: 'no',
          post_cerebral_concussion_scale: 'no'
        });
        this.showLossOfConsciousnessFields = false;
        this.showPostTraumaticAmnesiaFields = false;
        this.showPostCerebralConcussionScaleFields = false;
      }
    });

    // Loss of Consciousness dependency (nested under Cerebral Concussion)
    this.omtForm.get('loss_of_consciousness')?.valueChanges.subscribe(value => {
      this.showLossOfConsciousnessFields = value === 'yes';
      if (!this.showLossOfConsciousnessFields) {
        this.omtForm.patchValue({
          loss_of_consciousness_select: 'not_tested',
          loss_of_consciousness_text: ''
        });
      }
    });

    // Post-Traumatic Amnesia dependency (nested under Cerebral Concussion)
    this.omtForm.get('post_traumatic_amnesia')?.valueChanges.subscribe(value => {
      this.showPostTraumaticAmnesiaFields = value === 'yes';
      if (!this.showPostTraumaticAmnesiaFields) {
        this.omtForm.patchValue({
          post_traumatic_amnesia_select: 'not_tested',
          post_traumatic_amnesia_text: ''
        });
      }
    });

    // Post-Cerebral Concussion Scale dependency (nested under Cerebral Concussion)
    this.omtForm.get('post_cerebral_concussion_scale')?.valueChanges.subscribe(value => {
      this.showPostCerebralConcussionScaleFields = value === 'yes';
      if (!this.showPostCerebralConcussionScaleFields) {
        this.omtForm.patchValue({
          post_cerebral_raw_score: '',
          post_cerebral_classification: '',
          post_cerebral_rank: '',
          post_cerebral_text: ''
        });
      }
    });

    // Upper Extremity dependency
    this.omtForm.get('upper_extremity')?.valueChanges.subscribe(value => {
      this.showUpperExtremityFields = value === 'yes';
      if (!this.showUpperExtremityFields) {
        this.omtForm.patchValue({
          shoulder_pain_disability: 'no',
          upper_extremity_functional: 'no',
          dash: 'no',
          hand_profile: 'no'
        });
        this.showShoulderPainDisabilityFields = false;
        this.showUpperExtremityFunctionalFields = false;
        this.showDashFields = false;
        this.showHandProfileFields = false;
      }
    });

    // Shoulder Pain and Disability Index dependency
    this.omtForm.get('shoulder_pain_disability')?.valueChanges.subscribe(value => {
      this.showShoulderPainDisabilityFields = value === 'yes';
      if (!this.showShoulderPainDisabilityFields) {
        this.omtForm.patchValue({
          shoulder_total_percent: '',
          shoulder_pain_percent: '',
          shoulder_disability_percent: ''
        });
      }
    });

    // Upper Extremity Functional Index dependency
    this.omtForm.get('upper_extremity_functional')?.valueChanges.subscribe(value => {
      this.showUpperExtremityFunctionalFields = value === 'yes';
      if (!this.showUpperExtremityFunctionalFields) {
        this.omtForm.patchValue({
          upper_extremity_functional_score: ''
        });
      }
    });

    // DASH dependency
    this.omtForm.get('dash')?.valueChanges.subscribe(value => {
      this.showDashFields = value === 'yes';
      if (!this.showDashFields) {
        this.omtForm.patchValue({
          dash_score: ''
        });
      }
    });

    // Hand Profile dependency
    this.omtForm.get('hand_profile')?.valueChanges.subscribe(value => {
      this.showHandProfileFields = value === 'yes';
      if (!this.showHandProfileFields) {
        this.omtForm.patchValue({
          hand_profile_text: ''
        });
      }
    });

    // Spine dependency
    this.omtForm.get('spine')?.valueChanges.subscribe(value => {
      this.showSpineFields = value === 'yes';
      if (!this.showSpineFields) {
        this.omtForm.patchValue({
          neck_disability_index: 'no',
          oswestry_low_back_pain: 'no',
          modified_oswestry_low_back_pain: 'no',
          quebec_back_pain_disability: 'no'
        });
        this.showNeckDisabilityFields = false;
        this.showOswestryLowBackPainFields = false;
        this.showModifiedOswestryFields = false;
        this.showQuebecBackPainFields = false;
      }
    });

    // Neck Disability Index Questionnaire dependency
    this.omtForm.get('neck_disability_index')?.valueChanges.subscribe(value => {
      this.showNeckDisabilityFields = value === 'yes';
      if (!this.showNeckDisabilityFields) {
        this.omtForm.patchValue({
          neck_disability_score: '',
          neck_disability_total_percent: ''
        });
      }
    });

    // Oswestry Low Back Pain dependency
    this.omtForm.get('oswestry_low_back_pain')?.valueChanges.subscribe(value => {
      this.showOswestryLowBackPainFields = value === 'yes';
      if (!this.showOswestryLowBackPainFields) {
        this.omtForm.patchValue({
          oswestry_disability_percent: ''
        });
      }
    });

    // Modified Oswestry Low Back Pain dependency
    this.omtForm.get('modified_oswestry_low_back_pain')?.valueChanges.subscribe(value => {
      this.showModifiedOswestryFields = value === 'yes';
      if (!this.showModifiedOswestryFields) {
        this.omtForm.patchValue({
          modified_oswestry_disability_percent: ''
        });
      }
    });

    // Quebec Back Pain Disability Scale dependency
    this.omtForm.get('quebec_back_pain_disability')?.valueChanges.subscribe(value => {
      this.showQuebecBackPainFields = value === 'yes';
      if (!this.showQuebecBackPainFields) {
        this.omtForm.patchValue({
          quebec_back_pain_score: ''
        });
      }
    });

    // Lower Extremity dependency
    this.omtForm.get('lower_extremity')?.valueChanges.subscribe(value => {
      this.showLowerExtremityFields = value === 'yes';
      if (!this.showLowerExtremityFields) {
        this.omtForm.patchValue({
          lower_extremity_functional_scale: 'no',
          faam_sports: 'no',
          hoos: 'no',
          koos: 'no'
        });
        this.showLowerExtremityFunctionalFields = false;
        this.showFaamSportsFields = false;
        this.showHoosFields = false;
        this.showKoosFields = false;
      }
    });

    // Lower Extremity Functional Scale dependency
    this.omtForm.get('lower_extremity_functional_scale')?.valueChanges.subscribe(value => {
      this.showLowerExtremityFunctionalFields = value === 'yes';
      if (!this.showLowerExtremityFunctionalFields) {
        this.omtForm.patchValue({
          lower_extremity_functional_score: ''
        });
      }
    });

    // FAAM Sports Subscale dependency
    this.omtForm.get('faam_sports')?.valueChanges.subscribe(value => {
      this.showFaamSportsFields = value === 'yes';
      if (!this.showFaamSportsFields) {
        this.omtForm.patchValue({
          faam_sports_score: ''
        });
      }
    });

    // HOOS dependency
    this.omtForm.get('hoos')?.valueChanges.subscribe(value => {
      this.showHoosFields = value === 'yes';
      if (!this.showHoosFields) {
        this.omtForm.patchValue({
          hoos_total_score: ''
        });
      }
    });

    // KOOS dependency
    this.omtForm.get('koos')?.valueChanges.subscribe(value => {
      this.showKoosFields = value === 'yes';
      if (!this.showKoosFields) {
        this.omtForm.patchValue({
          koos_total_score: ''
        });
      }
    });

    // Balance dependency
    this.omtForm.get('balance')?.valueChanges.subscribe(value => {
      this.showBalanceFields = value === 'yes';
      if (!this.showBalanceFields) {
        this.omtForm.patchValue({
          abc_scale: 'no',
          mctsib: 'no',
          tinetti: 'no',
          berg: 'no',
          fullerton: 'no'
        });
        this.showAbcScaleFields = false;
        this.showMctsibFields = false;
        this.showTinettiFields = false;
        this.showBergFields = false;
        this.showFullertonFields = false;
      }
    });

    // ABC Scale dependency
    this.omtForm.get('abc_scale')?.valueChanges.subscribe(value => {
      this.showAbcScaleFields = value === 'yes';
      if (!this.showAbcScaleFields) {
        this.omtForm.patchValue({
          abc_scale_score: ''
        });
      }
    });

    // mCTSIB dependency
    this.omtForm.get('mctsib')?.valueChanges.subscribe(value => {
      this.showMctsibFields = value === 'yes';
      if (!this.showMctsibFields) {
        this.omtForm.patchValue({
          mctsib_condition_1: '',
          mctsib_condition_2: '',
          mctsib_condition_3: '',
          mctsib_condition_4: '',
          mctsib_total: '',
          mctsib_comments: ''
        });
      }
    });

    // Tinetti dependency
    this.omtForm.get('tinetti')?.valueChanges.subscribe(value => {
      this.showTinettiFields = value === 'yes';
      if (!this.showTinettiFields) {
        this.omtForm.patchValue({
          tinetti_score: ''
        });
      }
    });

    // Berg dependency
    this.omtForm.get('berg')?.valueChanges.subscribe(value => {
      this.showBergFields = value === 'yes';
      if (!this.showBergFields) {
        this.omtForm.patchValue({
          berg_score: ''
        });
      }
    });

    // Fullerton Advanced Balance (FAB) Scale dependency
    this.omtForm.get('fullerton')?.valueChanges.subscribe(value => {
      this.showFullertonFields = value === 'yes';
      if (!this.showFullertonFields) {
        this.omtForm.patchValue({
          fullerton_score: ''
        });
      }
    });

    // Pain dependency
    this.omtForm.get('pain')?.valueChanges.subscribe(value => {
      this.showPainFields = value === 'yes';
      if (!this.showPainFields) {
        this.omtForm.patchValue({
          mcgill_pain: 'no',
          wong_baker: 'no',
          pain_disability_index: 'no',
          croft_disability: 'no',
          fabq: 'no'
        });
        this.showMcgillPainFields = false;
        this.showWongBakerFields = false;
        this.showPainDisabilityIndexFields = false;
        this.showCroftDisabilityFields = false;
        this.showFabqFields = false;
      }
    });

    // McGill Pain Questionnaire dependency
    this.omtForm.get('mcgill_pain')?.valueChanges.subscribe(value => {
      this.showMcgillPainFields = value === 'yes';
      if (!this.showMcgillPainFields) {
        this.omtForm.patchValue({
          mcgill_pain_score: '',
          mcgill_completed: false,
          mcgill_followup_plan: ''
        });
      }
    });

    // Wong-Baker FACES Pain Rating Scale dependency
    this.omtForm.get('wong_baker')?.valueChanges.subscribe(value => {
      this.showWongBakerFields = value === 'yes';
      if (!this.showWongBakerFields) {
        this.omtForm.patchValue({
          wong_baker_score: '',
          wong_baker_followup_plan: ''
        });
      }
    });

    // Pain Disability Index dependency
    this.omtForm.get('pain_disability_index')?.valueChanges.subscribe(value => {
      this.showPainDisabilityIndexFields = value === 'yes';
      if (!this.showPainDisabilityIndexFields) {
        this.omtForm.patchValue({
          pain_disability_score: '',
          pain_disability_followup_plan: ''
        });
      }
    });

    // Croft Disability Questionnaire dependency
    this.omtForm.get('croft_disability')?.valueChanges.subscribe(value => {
      this.showCroftDisabilityFields = value === 'yes';
      if (!this.showCroftDisabilityFields) {
        this.omtForm.patchValue({
          croft_disability_score: '',
          croft_disability_followup_plan: ''
        });
      }
    });

    // The Fear-Avoidance Beliefs Questionnaire (FABQ) dependency
    this.omtForm.get('fabq')?.valueChanges.subscribe(value => {
      this.showFabqFields = value === 'yes';
      if (!this.showFabqFields) {
        this.omtForm.patchValue({
          fabq_scale_1: '',
          fabq_scale_2: '',
          fabq_followup_plan: ''
        });
      }
    });

    // General Function dependency
    this.omtForm.get('general_function')?.valueChanges.subscribe(value => {
      this.showGeneralFunctionFields = value === 'yes';
      if (!this.showGeneralFunctionFields) {
        this.omtForm.patchValue({
          timed_up_and_go: 'no',
          five_time_sit: 'no',
          audit_c: 'no',
          barthel_index: 'no',
          falls_efficacy: 'no',
          dynamic_gait: 'no',
          functional_reach: 'no',
          slums: 'no',
          geriatric_depression: 'no',
          elder_abuse: 'no',
          foto_patient: 'no'
        });
        this.showTimedUpAndGoFields = false;
        this.showFiveTimeSitFields = false;
        this.showAuditCFields = false;
        this.showBarthelIndexFields = false;
        this.showFallsEfficacyFields = false;
        this.showDynamicGaitFields = false;
        this.showFunctionalReachFields = false;
        this.showSlumsFields = false;
        this.showGeriatricDepressionFields = false;
        this.showElderAbuseFields = false;
        this.showFotoPatientFields = false;
      }
    });

    // Timed Up and Go dependency
    this.omtForm.get('timed_up_and_go')?.valueChanges.subscribe(value => {
      this.showTimedUpAndGoFields = value === 'yes';
      if (!this.showTimedUpAndGoFields) {
        this.omtForm.patchValue({
          timed_up_and_go_alone: 'no',
          timed_up_and_go_cognitive: 'no',
          timed_up_and_go_manual: 'no'
        });
        this.showTimedUpAndGoAloneFields = false;
        this.showTimedUpAndGoCognitiveFields = false;
        this.showTimedUpAndGoManualFields = false;
      }
    });

    // Five Time Sit To Stand dependency
    this.omtForm.get('five_time_sit')?.valueChanges.subscribe(value => {
      this.showFiveTimeSitFields = value === 'yes';
      if (!this.showFiveTimeSitFields) {
        this.omtForm.patchValue({
          five_time_sit_score: '',
          five_time_sit_comments: ''
        });
      }
    });

    // AUDIT-C dependency
    this.omtForm.get('audit_c')?.valueChanges.subscribe(value => {
      this.showAuditCFields = value === 'yes';
      if (!this.showAuditCFields) {
        this.omtForm.patchValue({
          audit_c_score: ''
        });
      }
    });

    // Barthel Index dependency
    this.omtForm.get('barthel_index')?.valueChanges.subscribe(value => {
      this.showBarthelIndexFields = value === 'yes';
      if (!this.showBarthelIndexFields) {
        this.omtForm.patchValue({
          barthel_index_score: ''
        });
      }
    });

    // Falls Efficacy Scale dependency
    this.omtForm.get('falls_efficacy')?.valueChanges.subscribe(value => {
      this.showFallsEfficacyFields = value === 'yes';
      if (!this.showFallsEfficacyFields) {
        this.omtForm.patchValue({
          falls_efficacy_total: ''
        });
      }
    });

    // Dynamic Gait Index dependency
    this.omtForm.get('dynamic_gait')?.valueChanges.subscribe(value => {
      this.showDynamicGaitFields = value === 'yes';
      if (!this.showDynamicGaitFields) {
        this.omtForm.patchValue({
          dynamic_gait_score: ''
        });
      }
    });

    // Functional Reach Test dependency
    this.omtForm.get('functional_reach')?.valueChanges.subscribe(value => {
      this.showFunctionalReachFields = value === 'yes';
      if (!this.showFunctionalReachFields) {
        this.omtForm.patchValue({
          functional_reach_score: '',
          functional_reach_units: 'inches'
        });
      }
    });

    // SLUMS dependency
    this.omtForm.get('slums')?.valueChanges.subscribe(value => {
      this.showSlumsFields = value === 'yes';
      if (!this.showSlumsFields) {
        this.omtForm.patchValue({
          slums_score: ''
        });
      }
    });

    // Geriatric Depression Scale dependency
    this.omtForm.get('geriatric_depression')?.valueChanges.subscribe(value => {
      this.showGeriatricDepressionFields = value === 'yes';
      if (!this.showGeriatricDepressionFields) {
        this.omtForm.patchValue({
          geriatric_depression_score: ''
        });
      }
    });

    // Elder Abuse Suspicion Index dependency
    this.omtForm.get('elder_abuse')?.valueChanges.subscribe(value => {
      this.showElderAbuseFields = value === 'yes';
      if (!this.showElderAbuseFields) {
        this.omtForm.patchValue({
          elder_abuse_score: '',
          elder_abuse_followup_plan: ''
        });
      }
    });

    // FOTO Patient Inquiry dependency
    this.omtForm.get('foto_patient')?.valueChanges.subscribe(value => {
      this.showFotoPatientFields = value === 'yes';
      if (!this.showFotoPatientFields) {
        this.omtForm.patchValue({
          foto_patient_score: ''
        });
      }
    });
  }

  /**
   * Opens the test modal for the specified test
   * @param testKey - The unique identifier for the test (e.g., 'dash', 'uefi')
   */
  showTestPopup(testKey: string): void {
    this.activeTest = testKey;
    this.showTestModal = true;
  }

  /**
   * Closes the test modal
   */
  closeTestModal(): void {
    this.showTestModal = false;
    this.activeTest = null;
  }

  /**
   * Handles the result from any test component
   * @param event - The result event from the test component
   */
  onTestResult(event: any): void {
    if (this.activeTest && event?.results) {
      // Special handling for SPADI which has three result fields
      if (this.activeTest === 'spadi') {
        this.omtForm.patchValue({
          shoulder_total_percent: event.results.total,
          shoulder_pain_percent: event.results.pain,
          shoulder_disability_percent: event.results.disability
        });
      } else if (this.activeTest === 'ndi') {
        // Special handling for NDI which has score and total percent fields
        this.omtForm.patchValue({
          neck_disability_score: event.results.score,
          neck_disability_total_percent: event.results.total
        });
      } else if (this.activeTest === 'olbp') {
        // Special handling for OLBP which returns disability field
        this.omtForm.patchValue({
          oswestry_disability_percent: event.results.disability
        });
      } else if (this.activeTest === 'molbp') {
        // Special handling for MOLBP (Modified Oswestry) which returns disability field
        this.omtForm.patchValue({
          modified_oswestry_disability_percent: event.results.disability
        });
      } else if (this.activeTest === 'lefs') {
        // Special handling for LEFS which returns score field
        this.omtForm.patchValue({
          lower_extremity_functional_score: event.results.score
        });
      } else if (this.activeTest === 'faam') {
        // Special handling for FAAM Sports which returns score field
        this.omtForm.patchValue({
          faam_sports_score: event.results.score
        });
      } else if (this.activeTest === 'hoos') {
        // Special handling for HOOS which returns score field
        this.omtForm.patchValue({
          hoos_total_score: event.results.score
        });
      } else if (this.activeTest === 'koos') {
        // Special handling for KOOS which returns score field
        this.omtForm.patchValue({
          koos_total_score: event.results.score
        });
      } else if (event.results.total !== undefined) {
        const config = this.testConfigs.find(c => c.key === this.activeTest);
        if (config) {
          this.omtForm.patchValue({
            [config.scoreField]: event.results.total
          });
        }
      }
    }
    this.closeTestModal();
  }
}

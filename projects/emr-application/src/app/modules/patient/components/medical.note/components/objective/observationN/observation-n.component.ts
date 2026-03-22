import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservationMapperService } from './services/observation-mapper.service';
import { Observation } from './models/Observation';

@Component({
  selector: 'observation-n',
  templateUrl: './observation-n.component.html',
  styleUrls: ['./observation-n.component.css']
})
export class ObservationNComponent implements OnInit {
  omtForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() observationData: Observation | null = null;

  // Visibility flags for dependent fields
  showBodyTypeFields: boolean = false;
  showVitalsFields: boolean = false;
  showBloodPressureFields: boolean = false;
  showTemperatureFields: boolean = false;
  showPulseFields: boolean = false;
  showRespirationFields: boolean = false;
  showWeightFields: boolean = false;
  showAdlManagementFields: boolean = false;
  showBreathingAtRestFields: boolean = false;
  showTransfersFields: boolean = false;
  showCastSplintFields: boolean = false;
  showStandingPostureFields: boolean = false;
  showProtractedScapulasFields: boolean = false;
  showScoliosisFields: boolean = false;
  showLowerExtremityStructureFields: boolean = false;
  showGaitFields: boolean = false;
  show6MinuteWalkTestFields: boolean = false;
  showAssistiveDeviceFields: boolean = false;
  showAssistiveDeviceCustom: boolean = false;
  showImmobilizerFields: boolean = false;
  showMuscularAsymmetriesFields: boolean = false;
  showMuscleGuardingFields: boolean = false;
  showMuscleAtrophyFields: boolean = false;
  showEdemaFields: boolean = false;
  showApprehensionOfMovementFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;

  // ADL Management nested visibility flags
  showBathingStatus: boolean = false;
  showToiletingStatus: boolean = false;
  showDressingStatus: boolean = false;
  showGroomingStatus: boolean = false;
  showEatingStatus: boolean = false;

  // ADL Custom text visibility flags
  showBathingCustom: boolean = false;
  showToiletingCustom: boolean = false;
  showDressingCustom: boolean = false;
  showGroomingCustom: boolean = false;
  showEatingCustom: boolean = false;

  // Transfers nested visibility flags
  showSupineToSitFields: boolean = false;
  showSitToStandFields: boolean = false;
  showToiletTransfersFields: boolean = false;

  // Dropdown options
  bloodPressureArmOptions = [
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' }
  ];

  bloodPressureLocationOptions = [
    { value: 'upper_arm', label: 'Upper Arm' },
    { value: 'forearm', label: 'Forearm' },
    { value: 'wrist', label: 'Wrist' }
  ];

  bloodPressurePositionOptions = [
    { value: 'sitting', label: 'Sitting' },
    { value: 'standing', label: 'Standing' },
    { value: 'lying', label: 'Lying' }
  ];

  pulseRightLeftOptions = [
    { value: 'not_tested', label: 'Not Tested' }
  ];

  respirationOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'labored', label: 'Labored' },
    { value: 'shallow', label: 'Shallow' },
    { value: 'diaphragmatic', label: 'Diaphragmatic' },
    { value: 'chest_breather', label: 'Chest Breather' }
  ];

  adlStatusOptions = [
    { value: 'independent', label: 'Independent' },
    { value: 'requires_assistance', label: 'Requires Assistance' },
    { value: 'dependent', label: 'Dependent' },
    { value: 'custom', label: 'Custom' }
  ];

  transferStatusOptions = [
    { value: 'independent', label: 'Independent' },
    { value: 'requires_assistance', label: 'Requires Assistance' },
    { value: 'dependent', label: 'Dependent' }
  ];

  castSplintTypeOptions = [
    { value: 'cast', label: 'Cast' },
    { value: 'splint', label: 'Splint' },
    { value: 'boot', label: 'Boot' },
    { value: 'not_tested', label: 'Not Tested' }
  ];

  complaintsOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'none', label: 'None' },
    { value: 'pain', label: 'Pain' },
    { value: 'numbness', label: 'Numbness' },
    { value: 'tingling', label: 'Tingling' }
  ];

  standingPostureOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'forward_head', label: 'Forward Head' },
    { value: 'wry_neck', label: 'Wry Neck' },
    { value: 'abnormal', label: 'Abnormal' },
    { value: 'rounded_shoulders', label: 'Rounded Shoulders' }
  ];

  protractedScapulasDistanceOptions = [
    { value: '1cm', label: '1cm' },
    { value: '2cm', label: '2cm' },
    { value: '3cm', label: '3cm' },
    { value: '4cm', label: '4cm' },
    { value: '5cm', label: '5cm' }
  ];

  scoliosisTypeOptions = [
    { value: 'functional', label: 'Functional (Curvature Straightens with FB or SB into the Convexity)' },
    { value: 'structural', label: 'Structural (Curvature Does Not Straighten with FB or SB into the Convexity)' }
  ];

  scoliosisCurvatureOptions = [
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' }
  ];

  lowerExtremityOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'normal', label: 'Normal' },
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  gaitOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'antalgic', label: 'Antalgic' },
    { value: 'lacks_full_knee_extension', label: 'Lacks Full Knee Extension at Heel Strike' },
    { value: 'increased_hike', label: 'Increased Hike During Swing' },
    { value: 'lacks_proper_heel_strike', label: 'Lacks Proper Heel Strike/Toe Off' }
  ];

  assistiveDeviceTypeOptions = [
    { value: '2_axillary_crutches', label: '2 Axillary Crutches' },
    { value: '1_axillary_crutch', label: '1 Axillary Crutch' },
    { value: '2_lofstrand_crutches', label: '2 Lofstrand Crutches' },
    { value: '1_lofstrand_crutch', label: '1 Lofstrand Crutch' },
    { value: 'cane', label: 'Cane' },
    { value: 'quad_cane', label: 'Quad Cane' },
    { value: 'walker', label: 'Walker' },
    { value: 'rolling_walker', label: 'Rolling Walker' },
    { value: 'custom', label: 'Custom' }
  ];

  handUsedOptions = [
    { value: 'bilateral', label: 'Bilateral' },
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' }
  ];

  muscleGuardingOptions = [
    { value: 'none', label: 'None' }
  ];

  apprehensionOptions = [
    { value: 'none', label: 'None' }
  ];

  constructor(
    private fb: FormBuilder,
    private observationMapper: ObservationMapperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();

    // Load data if provided
    if (this.observationData) {
      this.loadFromDto(this.observationData);
    }

    this.formReady.emit(this.omtForm);
  }

  /**
   * Get the observation model from form (for sending to backend)
   */
  getObservationModel(): Observation {
    return this.observationMapper.toModel(this.omtForm.getRawValue());
  }

  /**
   * Load observation data from DTO into form
   */
  loadFromDto(dto: Observation): void {
    const formValue = this.observationMapper.fromDto(dto);
    this.omtForm.patchValue(formValue);
  }

  private initForm(): void {
    this.omtForm = this.fb.group({
      // Body Type
      indicate_body_type: ['no'],
      body_type: ['mesomorph'],

      // Vitals
      vitals: ['no'],
      blood_pressure: ['no'],
      blood_pressure_orthostatic_risk: [false],
      blood_pressure_arm: ['right'],
      blood_pressure_systolic: [''],
      blood_pressure_diastolic: [''],
      blood_pressure_location: ['upper_arm'],
      blood_pressure_position: ['sitting'],
      temperature: ['no'],
      pulse: ['no'],
      pulse_value: [''],
      pulse_bpm_type: ['bpm_radial'],
      pulse_right: ['not_tested'],
      pulse_left: ['not_tested'],
      respiration: ['no'],
      respiration_selections: [[]],
      respiration_comments: [''],
      weight: ['no'],
      weight_value: [''],
      weight_unit: ['lbs'],

      // ADL Management
      adl_management: ['no'],
      adl_bathing: ['no'],
      adl_bathing_status: ['independent'],
      adl_bathing_custom_text: [''],
      adl_toileting: ['no'],
      adl_toileting_status: ['independent'],
      adl_toileting_custom_text: [''],
      adl_dressing: ['no'],
      adl_dressing_status: ['independent'],
      adl_dressing_custom_text: [''],
      adl_grooming: ['no'],
      adl_grooming_status: ['independent'],
      adl_grooming_custom_text: [''],
      adl_eating: ['no'],
      adl_eating_status: ['independent'],
      adl_eating_custom_text: [''],

      // Breathing at Rest
      breathing_at_rest: ['no'],
      breathing_apical: [false],
      breathing_diaphragmatically: [false],
      breathing_shortened: [false],
      breathing_asymmetrical: [false],
      breathing_decreased: [false],
      breathing_accessory: [false],
      breathing_comments: [''],

      // Transfers
      transfers: ['no'],
      transfer_supine_to_sit: ['no'],
      transfer_supine_to_sit_status: ['independent'],
      transfer_supine_to_sit_comments: [''],
      transfer_sit_to_stand: ['no'],
      transfer_sit_to_stand_status: ['independent'],
      transfer_sit_to_stand_comments: [''],
      transfer_toilet: ['no'],
      transfer_toilet_status: ['independent'],
      transfer_toilet_comments: [''],

      // Cast/Splint
      cast_splint: ['no'],
      cast_splint_type_1: ['cast'],
      cast_splint_complaints_1: ['not_tested'],
      cast_splint_date_applied_1: [''],
      cast_splint_date_removed_1: [''],
      cast_splint_comments_1: [''],
      cast_splint_type_2: ['not_tested'],
      cast_splint_complaints_2: ['not_tested'],
      cast_splint_date_applied_2: [''],
      cast_splint_date_removed_2: [''],
      cast_splint_comments_2: [''],

      // Standing Posture
      standing_posture: ['no'],
      standing_posture_selections: [[]],
      standing_posture_comments: [''],

      // Protracted Scapulas
      protracted_scapulas: ['no'],
      protracted_scapulas_right: ['1cm'],
      protracted_scapulas_left: ['1cm'],

      // Scoliosis
      scoliosis: ['no'],
      scoliosis_type: ['functional'],
      scoliosis_curvature: ['right'],

      // Lower Extremity Structure
      lower_extremity_structure: ['no'],
      les_genu_valgus_right: ['not_tested'],
      les_genu_valgus_left: ['not_tested'],
      les_genu_varus_right: ['not_tested'],
      les_genu_varus_left: ['not_tested'],
      les_tibial_torsion_right: ['not_tested'],
      les_tibial_torsion_left: ['not_tested'],
      les_genu_recurvatum_right: ['not_tested'],
      les_genu_recurvatum_left: ['not_tested'],
      les_foot_pronation_right: ['not_tested'],
      les_foot_pronation_left: ['not_tested'],
      les_foot_supination_right: ['not_tested'],
      les_foot_supination_left: ['not_tested'],
      les_femoral_anteversion_right: ['not_tested'],
      les_femoral_anteversion_left: ['not_tested'],
      les_femoral_retroversion_right: ['not_tested'],
      les_femoral_retroversion_left: ['not_tested'],
      les_dyskinetic_le_chain_right: ['not_tested'],
      les_dyskinetic_le_chain_left: ['not_tested'],
      les_patellar_position_right: ['not_tested'],
      les_patellar_position_left: ['not_tested'],
      les_calcaneal_exostosis_right: ['not_tested'],
      les_calcaneal_exostosis_left: ['not_tested'],
      les_calcaneal_valgus_right: ['not_tested'],
      les_calcaneal_valgus_left: ['not_tested'],
      les_calcaneal_varus_right: ['not_tested'],
      les_calcaneal_varus_left: ['not_tested'],
      les_hallux_valgus_right: ['not_tested'],
      les_hallux_valgus_left: ['not_tested'],

      // Gait
      gait: ['no'],
      gait_selections: [[]],
      gait_comments: [''],

      // 6 Minute Walk Test
      six_minute_walk_test: ['no'],
      walk_rest_sp02: [''],
      walk_rest_heart_rate: [''],
      walk_rest_respiratory_rate: [''],
      walk_rest_borg_scale: [''],
      walk_rest_distance: [''],
      walk_1min_sp02: [''],
      walk_1min_heart_rate: [''],
      walk_1min_respiratory_rate: [''],
      walk_1min_borg_scale: [''],
      walk_1min_distance: [''],
      walk_2min_sp02: [''],
      walk_2min_heart_rate: [''],
      walk_2min_respiratory_rate: [''],
      walk_2min_borg_scale: [''],
      walk_2min_distance: [''],
      walk_3min_sp02: [''],
      walk_3min_heart_rate: [''],
      walk_3min_respiratory_rate: [''],
      walk_3min_borg_scale: [''],
      walk_3min_distance: [''],
      walk_4min_sp02: [''],
      walk_4min_heart_rate: [''],
      walk_4min_respiratory_rate: [''],
      walk_4min_borg_scale: [''],
      walk_4min_distance: [''],
      walk_5min_sp02: [''],
      walk_5min_heart_rate: [''],
      walk_5min_respiratory_rate: [''],
      walk_5min_borg_scale: [''],
      walk_5min_distance: [''],
      walk_6min_sp02: [''],
      walk_6min_heart_rate: [''],
      walk_6min_respiratory_rate: [''],
      walk_6min_borg_scale: [''],
      walk_6min_distance: [''],
      walk_comments: [''],

      // Assistive Device
      assistive_device: ['no'],
      assistive_device_type: ['2_axillary_crutches'],
      assistive_device_hand: ['bilateral'],
      assistive_device_custom_text: [''],
      assistive_device_comments: [''],

      // Immobilizer
      immobilizer: ['no'],
      immobilizer_type: [''],
      immobilizer_compliant: ['no'],

      // Muscular Asymmetries
      muscular_asymmetries: ['no'],
      muscular_asymmetries_description: [''],

      // Muscle Guarding
      muscle_guarding: ['no'],
      muscle_guarding_value: ['none'],

      // Muscle Atrophy
      muscle_atrophy: ['no'],
      muscle_atrophy_description: [''],

      // Edema
      edema: ['no'],
      edema_description: [''],
      edema_pitting: ['no'],

      // Apprehension of Movement
      apprehension_of_movement: ['no'],
      apprehension_value: ['none'],

      // Additional Comments
      additional_comments: ['no'],
      additional_comments_text: ['']
    });
  }
  private setupValueChangeListeners(): void {
    // Body Type dependency
    this.omtForm.get('indicate_body_type')?.valueChanges.subscribe(value => {
      this.showBodyTypeFields = value === 'yes';
      if (!this.showBodyTypeFields) {
        this.omtForm.get('body_type')?.setValue('mesomorph');
      }
    });

    // Vitals dependency
    this.omtForm.get('vitals')?.valueChanges.subscribe(value => {
      this.showVitalsFields = value === 'yes';
      if (!this.showVitalsFields) {
        this.omtForm.patchValue({
          blood_pressure: 'no',
          temperature: 'no',
          pulse: 'no',
          respiration: 'no',
          weight: 'no'
        });
        this.showBloodPressureFields = false;
        this.showTemperatureFields = false;
        this.showPulseFields = false;
        this.showRespirationFields = false;
        this.showWeightFields = false;
      }
    });

    // Blood Pressure dependency (nested under Vitals)
    this.omtForm.get('blood_pressure')?.valueChanges.subscribe(value => {
      this.showBloodPressureFields = value === 'yes';
      if (!this.showBloodPressureFields) {
        this.omtForm.patchValue({
          blood_pressure_orthostatic_risk: false,
          blood_pressure_arm: 'right',
          blood_pressure_systolic: '',
          blood_pressure_diastolic: '',
          blood_pressure_location: 'upper_arm',
          blood_pressure_position: 'sitting'
        });
      }
    });

    // Temperature dependency (nested under Vitals)
    this.omtForm.get('temperature')?.valueChanges.subscribe(value => {
      this.showTemperatureFields = value === 'yes';
    });

    // Pulse dependency (nested under Vitals)
    this.omtForm.get('pulse')?.valueChanges.subscribe(value => {
      this.showPulseFields = value === 'yes';
      if (!this.showPulseFields) {
        this.omtForm.patchValue({
          pulse_value: '',
          pulse_bpm_type: 'bpm_radial',
          pulse_right: 'not_tested',
          pulse_left: 'not_tested'
        });
      }
    });

    // Respiration dependency (nested under Vitals)
    this.omtForm.get('respiration')?.valueChanges.subscribe(value => {
      this.showRespirationFields = value === 'yes';
      if (!this.showRespirationFields) {
        this.omtForm.patchValue({
          respiration_selections: [],
          respiration_comments: ''
        });
      }
    });

    // Weight dependency (nested under Vitals)
    this.omtForm.get('weight')?.valueChanges.subscribe(value => {
      this.showWeightFields = value === 'yes';
      if (!this.showWeightFields) {
        this.omtForm.patchValue({
          weight_value: '',
          weight_unit: 'lbs'
        });
      }
    });

    // ADL Management dependency
    this.omtForm.get('adl_management')?.valueChanges.subscribe(value => {
      this.showAdlManagementFields = value === 'yes';
      if (!this.showAdlManagementFields) {
        this.omtForm.patchValue({
          adl_bathing: 'no',
          adl_bathing_status: 'independent',
          adl_bathing_custom_text: '',
          adl_toileting: 'no',
          adl_toileting_status: 'independent',
          adl_toileting_custom_text: '',
          adl_dressing: 'no',
          adl_dressing_status: 'independent',
          adl_dressing_custom_text: '',
          adl_grooming: 'no',
          adl_grooming_status: 'independent',
          adl_grooming_custom_text: '',
          adl_eating: 'no',
          adl_eating_status: 'independent',
          adl_eating_custom_text: ''
        });
        this.showBathingStatus = false;
        this.showToiletingStatus = false;
        this.showDressingStatus = false;
        this.showGroomingStatus = false;
        this.showEatingStatus = false;
        this.showBathingCustom = false;
        this.showToiletingCustom = false;
        this.showDressingCustom = false;
        this.showGroomingCustom = false;
        this.showEatingCustom = false;
      }
    });

    // ADL Bathing nested dependency
    this.omtForm.get('adl_bathing')?.valueChanges.subscribe(value => {
      this.showBathingStatus = value === 'yes';
      if (!this.showBathingStatus) {
        this.omtForm.patchValue({ adl_bathing_status: 'independent', adl_bathing_custom_text: '' });
        this.showBathingCustom = false;
      }
    });

    // ADL Bathing Status custom dependency
    this.omtForm.get('adl_bathing_status')?.valueChanges.subscribe(value => {
      this.showBathingCustom = value === 'custom';
      if (!this.showBathingCustom) {
        this.omtForm.get('adl_bathing_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // ADL Toileting nested dependency
    this.omtForm.get('adl_toileting')?.valueChanges.subscribe(value => {
      this.showToiletingStatus = value === 'yes';
      if (!this.showToiletingStatus) {
        this.omtForm.patchValue({ adl_toileting_status: 'independent', adl_toileting_custom_text: '' });
        this.showToiletingCustom = false;
      }
    });

    // ADL Toileting Status custom dependency
    this.omtForm.get('adl_toileting_status')?.valueChanges.subscribe(value => {
      this.showToiletingCustom = value === 'custom';
      if (!this.showToiletingCustom) {
        this.omtForm.get('adl_toileting_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // ADL Dressing nested dependency
    this.omtForm.get('adl_dressing')?.valueChanges.subscribe(value => {
      this.showDressingStatus = value === 'yes';
      if (!this.showDressingStatus) {
        this.omtForm.patchValue({ adl_dressing_status: 'independent', adl_dressing_custom_text: '' });
        this.showDressingCustom = false;
      }
    });

    // ADL Dressing Status custom dependency
    this.omtForm.get('adl_dressing_status')?.valueChanges.subscribe(value => {
      this.showDressingCustom = value === 'custom';
      if (!this.showDressingCustom) {
        this.omtForm.get('adl_dressing_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // ADL Grooming nested dependency
    this.omtForm.get('adl_grooming')?.valueChanges.subscribe(value => {
      this.showGroomingStatus = value === 'yes';
      if (!this.showGroomingStatus) {
        this.omtForm.patchValue({ adl_grooming_status: 'independent', adl_grooming_custom_text: '' });
        this.showGroomingCustom = false;
      }
    });

    // ADL Grooming Status custom dependency
    this.omtForm.get('adl_grooming_status')?.valueChanges.subscribe(value => {
      this.showGroomingCustom = value === 'custom';
      if (!this.showGroomingCustom) {
        this.omtForm.get('adl_grooming_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // ADL Eating nested dependency
    this.omtForm.get('adl_eating')?.valueChanges.subscribe(value => {
      this.showEatingStatus = value === 'yes';
      if (!this.showEatingStatus) {
        this.omtForm.patchValue({ adl_eating_status: 'independent', adl_eating_custom_text: '' });
        this.showEatingCustom = false;
      }
    });

    // ADL Eating Status custom dependency
    this.omtForm.get('adl_eating_status')?.valueChanges.subscribe(value => {
      this.showEatingCustom = value === 'custom';
      if (!this.showEatingCustom) {
        this.omtForm.get('adl_eating_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // Breathing at Rest dependency
    this.omtForm.get('breathing_at_rest')?.valueChanges.subscribe(value => {
      this.showBreathingAtRestFields = value === 'yes';
      if (!this.showBreathingAtRestFields) {
        this.omtForm.patchValue({
          breathing_apical: false,
          breathing_diaphragmatically: false,
          breathing_shortened: false,
          breathing_asymmetrical: false,
          breathing_decreased: false,
          breathing_accessory: false,
          breathing_comments: ''
        });
      }
    });

    // Transfers dependency
    this.omtForm.get('transfers')?.valueChanges.subscribe(value => {
      this.showTransfersFields = value === 'yes';
      if (!this.showTransfersFields) {
        this.omtForm.patchValue({
          transfer_supine_to_sit: 'no',
          transfer_supine_to_sit_status: 'independent',
          transfer_supine_to_sit_comments: '',
          transfer_sit_to_stand: 'no',
          transfer_sit_to_stand_status: 'independent',
          transfer_sit_to_stand_comments: '',
          transfer_toilet: 'no',
          transfer_toilet_status: 'independent',
          transfer_toilet_comments: ''
        });
        this.showSupineToSitFields = false;
        this.showSitToStandFields = false;
        this.showToiletTransfersFields = false;
      }
    });

    // Supine to Sit nested dependency
    this.omtForm.get('transfer_supine_to_sit')?.valueChanges.subscribe(value => {
      this.showSupineToSitFields = value === 'yes';
      if (!this.showSupineToSitFields) {
        this.omtForm.patchValue({
          transfer_supine_to_sit_status: 'independent',
          transfer_supine_to_sit_comments: ''
        });
      }
    });

    // Sit to Stand nested dependency
    this.omtForm.get('transfer_sit_to_stand')?.valueChanges.subscribe(value => {
      this.showSitToStandFields = value === 'yes';
      if (!this.showSitToStandFields) {
        this.omtForm.patchValue({
          transfer_sit_to_stand_status: 'independent',
          transfer_sit_to_stand_comments: ''
        });
      }
    });

    // Toilet Transfers nested dependency
    this.omtForm.get('transfer_toilet')?.valueChanges.subscribe(value => {
      this.showToiletTransfersFields = value === 'yes';
      if (!this.showToiletTransfersFields) {
        this.omtForm.patchValue({
          transfer_toilet_status: 'independent',
          transfer_toilet_comments: ''
        });
      }
    });

    // Cast/Splint dependency
    this.omtForm.get('cast_splint')?.valueChanges.subscribe(value => {
      this.showCastSplintFields = value === 'yes';
      if (!this.showCastSplintFields) {
        this.omtForm.patchValue({
          cast_splint_type_1: 'cast',
          cast_splint_complaints_1: 'not_tested',
          cast_splint_date_applied_1: '',
          cast_splint_date_removed_1: '',
          cast_splint_comments_1: '',
          cast_splint_type_2: 'not_tested',
          cast_splint_complaints_2: 'not_tested',
          cast_splint_date_applied_2: '',
          cast_splint_date_removed_2: '',
          cast_splint_comments_2: ''
        });
      }
    });

    // Standing Posture dependency
    this.omtForm.get('standing_posture')?.valueChanges.subscribe(value => {
      this.showStandingPostureFields = value === 'yes';
      if (!this.showStandingPostureFields) {
        this.omtForm.patchValue({
          standing_posture_selections: [],
          standing_posture_comments: ''
        });
      }
    });

    // Protracted Scapulas dependency
    this.omtForm.get('protracted_scapulas')?.valueChanges.subscribe(value => {
      this.showProtractedScapulasFields = value === 'yes';
      if (!this.showProtractedScapulasFields) {
        this.omtForm.patchValue({
          protracted_scapulas_right: '1cm',
          protracted_scapulas_left: '1cm'
        });
      }
    });

    // Scoliosis dependency
    this.omtForm.get('scoliosis')?.valueChanges.subscribe(value => {
      this.showScoliosisFields = value === 'yes';
      if (!this.showScoliosisFields) {
        this.omtForm.patchValue({
          scoliosis_type: 'functional',
          scoliosis_curvature: 'right'
        });
      }
    });

    // Lower Extremity Structure dependency
    this.omtForm.get('lower_extremity_structure')?.valueChanges.subscribe(value => {
      this.showLowerExtremityStructureFields = value === 'yes';
      if (!this.showLowerExtremityStructureFields) {
        this.clearLowerExtremityStructure();
      }
    });

    // Gait dependency
    this.omtForm.get('gait')?.valueChanges.subscribe(value => {
      this.showGaitFields = value === 'yes';
      if (!this.showGaitFields) {
        this.omtForm.patchValue({
          gait_selections: [],
          gait_comments: ''
        });
      }
    });

    // 6 Minute Walk Test dependency
    this.omtForm.get('six_minute_walk_test')?.valueChanges.subscribe(value => {
      this.show6MinuteWalkTestFields = value === 'yes';
      if (!this.show6MinuteWalkTestFields) {
        this.clear6MinuteWalkTest();
      }
    });

    // Assistive Device dependency
    this.omtForm.get('assistive_device')?.valueChanges.subscribe(value => {
      this.showAssistiveDeviceFields = value === 'yes';
      if (!this.showAssistiveDeviceFields) {
        this.omtForm.patchValue({
          assistive_device_type: '2_axillary_crutches',
          assistive_device_custom_text: '',
          assistive_device_hand: 'bilateral',
          assistive_device_comments: ''
        });
        this.showAssistiveDeviceCustom = false;
      }
    });

    // Assistive Device Type custom dependency
    this.omtForm.get('assistive_device_type')?.valueChanges.subscribe(value => {
      this.showAssistiveDeviceCustom = value === 'custom';
      if (!this.showAssistiveDeviceCustom) {
        this.omtForm.get('assistive_device_custom_text')?.setValue('', { emitEvent: false });
      }
    });

    // Immobilizer dependency
    this.omtForm.get('immobilizer')?.valueChanges.subscribe(value => {
      this.showImmobilizerFields = value === 'yes';
      if (!this.showImmobilizerFields) {
        this.omtForm.patchValue({
          immobilizer_type: '',
          immobilizer_compliant: 'no'
        });
      }
    });

    // Muscular Asymmetries dependency
    this.omtForm.get('muscular_asymmetries')?.valueChanges.subscribe(value => {
      this.showMuscularAsymmetriesFields = value === 'yes';
      if (!this.showMuscularAsymmetriesFields) {
        this.omtForm.get('muscular_asymmetries_description')?.setValue('');
      }
    });

    // Muscle Guarding dependency
    this.omtForm.get('muscle_guarding')?.valueChanges.subscribe(value => {
      this.showMuscleGuardingFields = value === 'yes';
      if (!this.showMuscleGuardingFields) {
        this.omtForm.get('muscle_guarding_value')?.setValue('none');
      }
    });

    // Muscle Atrophy dependency
    this.omtForm.get('muscle_atrophy')?.valueChanges.subscribe(value => {
      this.showMuscleAtrophyFields = value === 'yes';
      if (!this.showMuscleAtrophyFields) {
        this.omtForm.get('muscle_atrophy_description')?.setValue('');
      }
    });

    // Edema dependency
    this.omtForm.get('edema')?.valueChanges.subscribe(value => {
      this.showEdemaFields = value === 'yes';
      if (!this.showEdemaFields) {
        this.omtForm.patchValue({
          edema_description: '',
          edema_pitting: 'no'
        });
      }
    });

    // Apprehension of Movement dependency
    this.omtForm.get('apprehension_of_movement')?.valueChanges.subscribe(value => {
      this.showApprehensionOfMovementFields = value === 'yes';
      if (!this.showApprehensionOfMovementFields) {
        this.omtForm.get('apprehension_value')?.setValue('none');
      }
    });

    // Additional Comments dependency
    this.omtForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
      if (!this.showAdditionalCommentsFields) {
        this.omtForm.get('additional_comments_text')?.setValue('');
      }
    });
  }

  private clearLowerExtremityStructure(): void {
    this.omtForm.patchValue({
      les_genu_valgus_right: 'not_tested',
      les_genu_valgus_left: 'not_tested',
      les_genu_varus_right: 'not_tested',
      les_genu_varus_left: 'not_tested',
      les_tibial_torsion_right: 'not_tested',
      les_tibial_torsion_left: 'not_tested',
      les_genu_recurvatum_right: 'not_tested',
      les_genu_recurvatum_left: 'not_tested',
      les_foot_pronation_right: 'not_tested',
      les_foot_pronation_left: 'not_tested',
      les_foot_supination_right: 'not_tested',
      les_foot_supination_left: 'not_tested',
      les_femoral_anteversion_right: 'not_tested',
      les_femoral_anteversion_left: 'not_tested',
      les_femoral_retroversion_right: 'not_tested',
      les_femoral_retroversion_left: 'not_tested',
      les_dyskinetic_le_chain_right: 'not_tested',
      les_dyskinetic_le_chain_left: 'not_tested',
      les_patellar_position_right: 'not_tested',
      les_patellar_position_left: 'not_tested',
      les_calcaneal_exostosis_right: 'not_tested',
      les_calcaneal_exostosis_left: 'not_tested',
      les_calcaneal_valgus_right: 'not_tested',
      les_calcaneal_valgus_left: 'not_tested',
      les_calcaneal_varus_right: 'not_tested',
      les_calcaneal_varus_left: 'not_tested',
      les_hallux_valgus_right: 'not_tested',
      les_hallux_valgus_left: 'not_tested'
    });
  }

  private clear6MinuteWalkTest(): void {
    this.omtForm.patchValue({
      walk_rest_sp02: '',
      walk_rest_heart_rate: '',
      walk_rest_respiratory_rate: '',
      walk_rest_borg_scale: '',
      walk_rest_distance: '',
      walk_1min_sp02: '',
      walk_1min_heart_rate: '',
      walk_1min_respiratory_rate: '',
      walk_1min_borg_scale: '',
      walk_1min_distance: '',
      walk_2min_sp02: '',
      walk_2min_heart_rate: '',
      walk_2min_respiratory_rate: '',
      walk_2min_borg_scale: '',
      walk_2min_distance: '',
      walk_3min_sp02: '',
      walk_3min_heart_rate: '',
      walk_3min_respiratory_rate: '',
      walk_3min_borg_scale: '',
      walk_3min_distance: '',
      walk_4min_sp02: '',
      walk_4min_heart_rate: '',
      walk_4min_respiratory_rate: '',
      walk_4min_borg_scale: '',
      walk_4min_distance: '',
      walk_5min_sp02: '',
      walk_5min_heart_rate: '',
      walk_5min_respiratory_rate: '',
      walk_5min_borg_scale: '',
      walk_5min_distance: '',
      walk_6min_sp02: '',
      walk_6min_heart_rate: '',
      walk_6min_respiratory_rate: '',
      walk_6min_borg_scale: '',
      walk_6min_distance: '',
      walk_comments: ''
    });
  }
}

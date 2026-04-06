import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionMapperService } from './services/inspection-mapper.service';
import { Inspection } from './models/Inspection';

@Component({
  selector: 'inspectionN',
  templateUrl: './inspectionN.component.html',
  styleUrls: ['./inspectionN.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InspectionNComponent implements OnInit {
  inspectionNForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() inspectionData: Inspection | null = null;

  // Visibility flags for dependent fields
  showPatientParentGuardianConsent: boolean = false;
  showChaperonePresent: boolean = false;
  showGirthUpper: boolean = false;
  showGirthLower: boolean = false;
  showPostOperativeFields: boolean = false;
  showIncisionSites: boolean = false;
  showIncisionSitesCustom: boolean = false;
  showSurgicalPrecautions: boolean = false;
  showSurgicalPrecautionsCustom: boolean = false;
  showScarMobility: boolean = false;
  showScarType: boolean = false;
  showScarTypeCustom: boolean = false;
  showWoundDescription: boolean = false;
  showWoundMeasurements: boolean = false;
  showWoundCareFields: boolean = false;
  showSurfaceCultureFields: boolean = false;
  showSurfaceCultureTechnique: boolean = false;
  showSurgicalScarringSelect: boolean = false;
  showSurgicalScarringCustom: boolean = false;
  showBodyMassIndexFields: boolean = false;
  showAdditionalCommentsText: boolean = false;

  // Dropdown options
  chaperoneOptions = [
    { value: 'not_existing', label: 'No' },
    { value: 'existing', label: 'Yes' }
  ];

  incisionSitesOptions = [
    { value: 'clean_healing_well', label: 'Clean and healing well' },
    { value: 'infected', label: 'Infected' },
    { value: 'dehisced', label: 'Dehisced' },
    { value: 'custom', label: 'Custom' }
  ];

  surgicalPrecautionsOptions = [
    { value: 'prom_only', label: 'PROM Only' },
    { value: 'no_weight_bearing', label: 'No Weight Bearing' },
    { value: 'partial_weight_bearing', label: 'Partial Weight Bearing' },
    { value: 'custom', label: 'Custom' }
  ];

  scarTypeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'hypertrophic', label: 'Hypertrophic' },
    { value: 'keloid', label: 'Keloid' },
    { value: 'custom', label: 'Custom' }
  ];

  surgicalScarringOptions = [
    { value: 'no_scarring', label: 'No Scarring' },
    { value: 'appendectomy', label: 'Appendectomy' },
    { value: 'laparotomy', label: 'Laparotomy' },
    { value: 'hernia', label: 'Hernia' },
    { value: 'hysterectomy', label: 'Hysterectomy' },
    { value: 'cholecystectomy', label: 'Cholecystectomy' },
    { value: 'custom', label: 'Custom' }
  ];

  constructor(
    private fb: FormBuilder,
    private inspectionMapper: InspectionMapperService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();

    // Load data if provided
    if (this.inspectionData) {
      this.loadFromDto(this.inspectionData);
    }

    this.formReady.emit(this.inspectionNForm);
  }

  /**
   * Get the inspection model from form (for sending to backend)
   */
  getInspectionModel(): Inspection {
    return this.inspectionMapper.toModel(this.inspectionNForm.getRawValue());
  }

  /**
   * Load inspection data from DTO into form
   */
  loadFromDto(dto: Inspection): void {
    const formValue = this.inspectionMapper.fromDto(dto);
    this.inspectionNForm.patchValue(formValue);
  }

  private initForm(): void {
    this.inspectionNForm = this.fb.group({
      patient_consent: ['no'],
      patient_parent_guardian_consent: ['no'],
      chaperone: ['no'],
      chaperone_present: [null],
      inspection: [''],
      girth_measurement_upper: ['no'],
      upper_arm_right: [''],
      upper_arm_left: [''],
      mid_biceps_right: [''],
      mid_biceps_left: [''],
      elbow_flexion_crease_right: [''],
      elbow_flexion_crease_left: [''],
      forearm_right: [''],
      forearm_left: [''],
      wrist_right: [''],
      wrist_left: [''],
      girth_measurement_lower: ['no'],
      mid_patella_right: [''],
      mid_patella_left: [''],
      mid_thigh_right: [''],
      mid_thigh_left: [''],
      mid_calf_right: [''],
      mid_calf_left: [''],
      mid_malleoli_right: [''],
      mid_malleoli_left: [''],
      ankle_figure_8_right: [''],
      ankle_figure_8_left: [''],
      mid_foot_right: [''],
      mid_foot_left: [''],
      metatarsal_heads_right: [''],
      metatarsal_heads_left: [''],
      post_operative_wound_healing: ['no'],
      incision_sites: [null],
      incision_sites_custom_text: [''],
      surgical_precautions: ['no'],
      surgical_precautions_select: [null],
      surgical_precautions_custom_text: [''],
      scar_mobility: ['no'],
      scar_mobility_text: [''],
      scar_type: ['no'],
      scar_type_select: [null],
      scar_type_custom_text: [''],
      wound_description: ['no'],
      wound_description_text: [''],
      wound_measurements: ['no'],
      wound_length: [''],
      wound_width: [''],
      wound_care: ['no'],
      surface_culture_used: ['na'],
      surface_culture_levine: [false],
      surface_culture_deep_swab: [false],
      surface_culture_semiquantitative: [false],
      surface_culture_quantitative: [false],
      surface_culture_reasoning: [''],
      surface_culture_technique: [''],
      surgical_scarring: ['no'],
      surgical_scarring_select: [[]],
      surgical_scarring_custom_text: [''],
      body_mass_index: ['no'],
      bmi_weight: [''],
      bmi_height: [''],
      bmi_units: ['lbs_in'],
      bmi_index: [''],
      bmi_followup_plan: [''],
      additional_comments: ['no'],
      additional_comments_text: ['']
    });
  }

  private setupValueChangeListeners(): void {
    // Patient/Parent/Guardian Consent dependency
    this.inspectionNForm.get('patient_consent')?.valueChanges.subscribe(value => {
      this.showPatientParentGuardianConsent = value === 'yes';
      if (!this.showPatientParentGuardianConsent) {
        this.inspectionNForm.get('patient_parent_guardian_consent')?.setValue('no', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Chaperone Present dependency
    this.inspectionNForm.get('chaperone')?.valueChanges.subscribe(value => {
      this.showChaperonePresent = value === 'yes';
      if (!this.showChaperonePresent) {
        this.inspectionNForm.get('chaperone_present')?.setValue(null, { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Girth Measurement Upper dependency
    this.inspectionNForm.get('girth_measurement_upper')?.valueChanges.subscribe(value => {
      this.showGirthUpper = value === 'yes';
      if (!this.showGirthUpper) {
        this.clearGirthUpper();
      }
      this.cdr.markForCheck();
    });

    // Girth Measurement Lower dependency
    this.inspectionNForm.get('girth_measurement_lower')?.valueChanges.subscribe(value => {
      this.showGirthLower = value === 'yes';
      if (!this.showGirthLower) {
        this.clearGirthLower();
      }
      this.cdr.markForCheck();
    });

    // Post Operative/Wound Healing dependency
    this.inspectionNForm.get('post_operative_wound_healing')?.valueChanges.subscribe(value => {
      this.showPostOperativeFields = value === 'yes';
      if (!this.showPostOperativeFields) {
        // Reset all child fields
        this.inspectionNForm.patchValue({
          incision_sites: null,
          incision_sites_custom_text: '',
          surgical_precautions: 'no',
          surgical_precautions_select: null,
          surgical_precautions_custom_text: '',
          scar_mobility: 'no',
          scar_mobility_text: '',
          scar_type: 'no',
          scar_type_select: null,
          scar_type_custom_text: '',
          wound_description: 'no',
          wound_description_text: '',
          wound_measurements: 'no',
          wound_length: '',
          wound_width: ''
        }, { emitEvent: false });
        // Reset nested visibility flags
        this.showIncisionSites = false;
        this.showIncisionSitesCustom = false;
        this.showSurgicalPrecautions = false;
        this.showSurgicalPrecautionsCustom = false;
        this.showScarMobility = false;
        this.showScarType = false;
        this.showScarTypeCustom = false;
        this.showWoundDescription = false;
        this.showWoundMeasurements = false;
      }
      this.cdr.markForCheck();
    });

    // Incision Sites dependency (nested under Post Operative)
    this.inspectionNForm.get('incision_sites')?.valueChanges.subscribe(value => {
      this.showIncisionSitesCustom = value === 'custom';
      if (!this.showIncisionSitesCustom) {
        this.inspectionNForm.get('incision_sites_custom_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Surgical Precautions dependency (nested under Post Operative)
    this.inspectionNForm.get('surgical_precautions')?.valueChanges.subscribe(value => {
      this.showSurgicalPrecautions = value === 'yes';
      if (!this.showSurgicalPrecautions) {
        this.inspectionNForm.get('surgical_precautions_select')?.setValue(null, { emitEvent: false });
        this.inspectionNForm.get('surgical_precautions_custom_text')?.setValue('', { emitEvent: false });
        this.showSurgicalPrecautionsCustom = false;
      }
      this.cdr.markForCheck();
    });

    // Surgical Precautions Select dependency (for custom option)
    this.inspectionNForm.get('surgical_precautions_select')?.valueChanges.subscribe(value => {
      this.showSurgicalPrecautionsCustom = value === 'custom';
      if (!this.showSurgicalPrecautionsCustom) {
        this.inspectionNForm.get('surgical_precautions_custom_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Scar Mobility dependency (nested under Post Operative)
    this.inspectionNForm.get('scar_mobility')?.valueChanges.subscribe(value => {
      this.showScarMobility = value === 'yes';
      if (!this.showScarMobility) {
        this.inspectionNForm.get('scar_mobility_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Scar Type dependency (nested under Post Operative)
    this.inspectionNForm.get('scar_type')?.valueChanges.subscribe(value => {
      this.showScarType = value === 'yes';
      if (!this.showScarType) {
        this.inspectionNForm.get('scar_type_select')?.setValue(null, { emitEvent: false });
        this.inspectionNForm.get('scar_type_custom_text')?.setValue('', { emitEvent: false });
        this.showScarTypeCustom = false;
      }
      this.cdr.markForCheck();
    });

    // Scar Type Select dependency (for custom option)
    this.inspectionNForm.get('scar_type_select')?.valueChanges.subscribe(value => {
      this.showScarTypeCustom = value === 'custom';
      if (!this.showScarTypeCustom) {
        this.inspectionNForm.get('scar_type_custom_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Wound Description dependency (nested under Post Operative)
    this.inspectionNForm.get('wound_description')?.valueChanges.subscribe(value => {
      this.showWoundDescription = value === 'yes';
      if (!this.showWoundDescription) {
        this.inspectionNForm.get('wound_description_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Wound Measurements dependency (nested under Post Operative)
    this.inspectionNForm.get('wound_measurements')?.valueChanges.subscribe(value => {
      this.showWoundMeasurements = value === 'yes';
      if (!this.showWoundMeasurements) {
        this.inspectionNForm.get('wound_length')?.setValue('', { emitEvent: false });
        this.inspectionNForm.get('wound_width')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Wound Care dependency
    this.inspectionNForm.get('wound_care')?.valueChanges.subscribe(value => {
      this.showWoundCareFields = value === 'yes';
      if (!this.showWoundCareFields) {
        this.inspectionNForm.get('surface_culture_used')?.setValue('na', { emitEvent: false });
        this.showSurfaceCultureFields = false;
        this.showSurfaceCultureTechnique = false;
        this.inspectionNForm.patchValue({
          surface_culture_levine: false,
          surface_culture_deep_swab: false,
          surface_culture_semiquantitative: false,
          surface_culture_quantitative: false,
          surface_culture_reasoning: '',
          surface_culture_technique: ''
        }, { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Surface Culture Used dependency
    this.inspectionNForm.get('surface_culture_used')?.valueChanges.subscribe(value => {
      this.showSurfaceCultureFields = value === 'yes';
      this.showSurfaceCultureTechnique = value === 'no';
      if (!this.showSurfaceCultureFields) {
        this.inspectionNForm.patchValue({
          surface_culture_levine: false,
          surface_culture_deep_swab: false,
          surface_culture_semiquantitative: false,
          surface_culture_quantitative: false,
          surface_culture_reasoning: ''
        }, { emitEvent: false });
      }
      if (!this.showSurfaceCultureTechnique) {
        this.inspectionNForm.get('surface_culture_technique')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Surgical Scarring dependency
    this.inspectionNForm.get('surgical_scarring')?.valueChanges.subscribe(value => {
      this.showSurgicalScarringSelect = value === 'yes';
      if (!this.showSurgicalScarringSelect) {
        this.inspectionNForm.get('surgical_scarring_select')?.setValue([], { emitEvent: false });
        this.inspectionNForm.get('surgical_scarring_custom_text')?.setValue('', { emitEvent: false });
        this.showSurgicalScarringCustom = false;
      }
      this.cdr.markForCheck();
    });

    // Surgical Scarring Select dependency (for custom option)
    this.inspectionNForm.get('surgical_scarring_select')?.valueChanges.subscribe(value => {
      this.showSurgicalScarringCustom = Array.isArray(value) && value.includes('custom');
      if (!this.showSurgicalScarringCustom) {
        this.inspectionNForm.get('surgical_scarring_custom_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Body Mass Index dependency
    this.inspectionNForm.get('body_mass_index')?.valueChanges.subscribe(value => {
      this.showBodyMassIndexFields = value === 'yes';
      if (!this.showBodyMassIndexFields) {
        this.inspectionNForm.patchValue({
          bmi_weight: '',
          bmi_height: '',
          bmi_units: 'lbs_in',
          bmi_index: '',
          bmi_followup_plan: ''
        }, { emitEvent: false });
      }
      this.cdr.markForCheck();
    });

    // Additional Comments dependency
    this.inspectionNForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsText = value === 'yes';
      if (!this.showAdditionalCommentsText) {
        this.inspectionNForm.get('additional_comments_text')?.setValue('', { emitEvent: false });
      }
      this.cdr.markForCheck();
    });
  }

  private clearGirthUpper(): void {
    this.inspectionNForm.patchValue({
      upper_arm_right: '',
      upper_arm_left: '',
      mid_biceps_right: '',
      mid_biceps_left: '',
      elbow_flexion_crease_right: '',
      elbow_flexion_crease_left: '',
      forearm_right: '',
      forearm_left: '',
      wrist_right: '',
      wrist_left: ''
    });
  }

  private clearGirthLower(): void {
    this.inspectionNForm.patchValue({
      mid_patella_right: '',
      mid_patella_left: '',
      mid_thigh_right: '',
      mid_thigh_left: '',
      mid_calf_right: '',
      mid_calf_left: '',
      mid_malleoli_right: '',
      mid_malleoli_left: '',
      ankle_figure_8_right: '',
      ankle_figure_8_left: '',
      mid_foot_right: '',
      mid_foot_left: '',
      metatarsal_heads_right: '',
      metatarsal_heads_left: ''
    });
  }
}

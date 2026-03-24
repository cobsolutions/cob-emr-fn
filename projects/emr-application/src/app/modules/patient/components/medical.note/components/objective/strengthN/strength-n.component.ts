import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generateMeasurementFieldName } from '../common/form-field-utils';
import { RomSectionConfig, RomSectionWithSelectsConfig } from '../range-of-motion/config';
import { StrengthSectionsConfig } from './config';
import { Strength } from './models/Strength';
import { StrengthMapperService } from './services/strength-mapper.service';

@Component({
  selector: 'strength-n',
  templateUrl: './strength-n.component.html',
  styleUrls: ['./strength-n.component.css']
})
export class StrengthNComponent implements OnInit {
  @Input() strengthData?: Strength;
  @Output() formReady = new EventEmitter<FormGroup>();
  strengthForm!: FormGroup;

  formData: any = {}; // Store mapped form data to pass to child components

  showNoLimitationsNotedFields: boolean = false;
  showSelectiveTissueTensionUpperFields: boolean = false;
  showSelectiveTissueTensionLowerFields: boolean = false;
  showGripPinchFields: boolean = false;
  showGrossMuscleTestsUpperFields: boolean = false;
  showRedcordNeuracStabilityTestsFields: boolean = false;
  showGrossMuscleTestsTrunkFields: boolean = false;
  showGrossMuscleTestsLowerFields: boolean = false;
  showCoreStrengthFields: boolean = false;
  showManualMuscleTestsFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;
  showCervicalFields: boolean = false;
  showTrunkFields: boolean = false;
  showBackRibsFields: boolean = false;
  showShoulderFields: boolean = false;
  showElbowFields: boolean = false;
  showWristFields: boolean = false;
  showHandFields: boolean = false;
  showHipFields: boolean = false;
  showKneeFields: boolean = false;
  showAnkleFields: boolean = false;
  showFootFields: boolean = false;
  showCervicalGrossMuscleTestsUpperFields: boolean = false;
  showShoulderGrossMuscleTestsUpperFields: boolean = false;
  showElbowGrossMuscleTestsUpperFields: boolean = false;
  showWristGrossMuscleTestsUpperFields: boolean = false;
  showHipGrossMuscleTestsLowerFields: boolean = false;
  showKneeGrossMuscleTestsLowerFields: boolean = false;
  showAnkleGrossMuscleTestsLowerFields: boolean = false;
  showUpperBodyMyofascialTestsFields: boolean = false;
  showLowerBodyMyofascialTestsFields: boolean = false;
  showCervicalMovementsFields: boolean = false;
  showCervicalMotorControlTestsFields: boolean = false;
  showLumbarMotorControlTestsFields: boolean = false;
  showProneExtensionCoreStrengthFields: boolean = false;
  showSupineFlexionCoreStrengthFields: boolean = false;
  showSitupsCoreStrengthFields: boolean = false;
  showPushupCoreStrengthFields: boolean = false;
  showRapidExchangeFields: boolean = false;
  showRepeatedGripFields: boolean = false;
  showFiveLevelGripFields: boolean = false;

  // Strength Sections Configuration
  readonly strengthConfig = StrengthSectionsConfig;

  constructor(
    private fb: FormBuilder,
    private strengthMapper: StrengthMapperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();

    // Load data if provided
    if (this.strengthData) {
      this.formData = this.strengthMapper.fromDto(this.strengthData);
      this.strengthForm.patchValue(this.formData); // Single patch - child components will use formData
    }

    this.formReady.emit(this.strengthForm);
  }
  /**
  * Generic helper to reset measurement-table fields (right/left)
  * Uses the same config and naming logic as the child component
  */
  private resetMeasurementFields(config: RomSectionConfig): void {
    const updates: any = {};

    // Reset Apply to All field
    if (config.showApplyToAll) {
      updates[config.applyToAllFieldName] = '';
    }

    // Reset all measurement fields (right and left)
    config.labels.forEach(label => {
      const rightField = generateMeasurementFieldName(config.fieldPrefix, label, 'right');
      const leftField = generateMeasurementFieldName(config.fieldPrefix, label, 'left');
      updates[rightField] = 'not_tested';
      updates[leftField] = 'not_tested';
    });

    // Reset comments field
    if (config.showComments) {
      updates[config.commentsFieldName] = '';
    }

    this.strengthForm.patchValue(updates, { emitEvent: false });
  }
  /*
    TODO
  */
  private resetMeasurementFieldsWithSelect(config: RomSectionWithSelectsConfig): void {

  }
  initForm() {
    this.strengthForm = this.fb.group({
      no_limitations_noted: ['no'],
      uper_extremity: [false],
      lower_extremity: [false],

      selective_tissue_tension_upper: ['no'],
      cervical: ['no'],
      trunk: ['no'],
      back_ribs: ['no'],
      shoulder: ['no'],
      elbow: ['no'],
      wrist: ['no'],
      hand: ['no'],

      selective_tissue_tension_lower: ['no'],
      hip: ['no'],
      knee: ['no'],
      ankle: ['no'],
      foot: ['no'],

      grip_pinch: ['no'],
      rapid_exchange: ['no'],
      repeated_grip: ['no'],
      five_level_grip: ['no'],


      gross_muscle_tests_upper: ['no'],
      cervical_gross_muscle_tests_upper: ['no'],
      cervical_gmt_upper_flexion: [''],
      cervical_gmt_upper_flexion_custom: [''],
      cervical_gmt_upper_extension: [''],
      cervical_gmt_upper_extension_custom: [''],
      cervical_gmt_upper_cervical_sidebending_right: [''],
      cervical_gmt_upper_cervical_sidebending_right_custom: [''],
      cervical_gmt_upper_cervical_sidebending_left: [''],
      cervical_gmt_upper_cervical_sidebending_left_custom: [''],
      cervical_gmt_upper_cervical_rotation_right: [''],
      cervical_gmt_upper_cervical_rotation_right_custom: [''],
      cervical_gmt_upper_cervical_rotation_left: [''],
      cervical_gmt_upper_cervical_rotation_left_custom: [''],
      cervical_gmt_upper_comments: [''],
      shoulder_gross_muscle_tests_upper: ['no'],
      shoulder_gmt_upper_shoulder_flexion_right: [''],
      shoulder_gmt_upper_shoulder_flexion_right_custom: [''],
      shoulder_gmt_upper_shoulder_flexion_left: [''],
      shoulder_gmt_upper_shoulder_flexion_left_custom: [''],
      shoulder_gmt_upper_shoulder_extension_right: [''],
      shoulder_gmt_upper_shoulder_extension_right_custom: [''],
      shoulder_gmt_upper_shoulder_extension_left: [''],
      shoulder_gmt_upper_shoulder_extension_left_custom: [''],
      shoulder_gmt_upper_shoulder_abduction_right: [''],
      shoulder_gmt_upper_shoulder_abduction_right_custom: [''],
      shoulder_gmt_upper_shoulder_abduction_left: [''],
      shoulder_gmt_upper_shoulder_abduction_left_custom: [''],
      shoulder_gmt_upper_shoulder_adduction_right: [''],
      shoulder_gmt_upper_shoulder_adduction_right_custom: [''],
      shoulder_gmt_upper_shoulder_adduction_left: [''],
      shoulder_gmt_upper_shoulder_adduction_left_custom: [''],
      shoulder_gmt_upper_shoulder_internal_rotation_right: [''],
      shoulder_gmt_upper_shoulder_internal_rotation_right_custom: [''],
      shoulder_gmt_upper_shoulder_internal_rotation_left: [''],
      shoulder_gmt_upper_shoulder_internal_rotation_left_custom: [''],
      shoulder_gmt_upper_shoulder_external_rotation_right: [''],
      shoulder_gmt_upper_shoulder_external_rotation_right_custom: [''],
      shoulder_gmt_upper_shoulder_external_rotation_left: [''],
      shoulder_gmt_upper_shoulder_external_rotation_left_custom: [''],
      shoulder_gmt_upper_shoulder_scaption_right: [''],
      shoulder_gmt_upper_shoulder_scaption_right_custom: [''],
      shoulder_gmt_upper_shoulder_scaption_left: [''],
      shoulder_gmt_upper_shoulder_scaption_left_custom: [''],
      'shoulder_gmt_upper_shoulder_er_@_90_abduction_right': [''],
      'shoulder_gmt_upper_shoulder_er_@_90_abduction_right_custom': [''],
      'shoulder_gmt_upper_shoulder_er_@_90_abduction_left': [''],
      'shoulder_gmt_upper_shoulder_er_@_90_abduction_left_custom': [''],
      'shoulder_gmt_upper_shoulder_ir_@_90_abduction_right': [''],
      'shoulder_gmt_upper_shoulder_ir_@_90_abduction_right_custom': [''],
      'shoulder_gmt_upper_shoulder_ir_@_90_abduction_left': [''],
      'shoulder_gmt_upper_shoulder_ir_@_90_abduction_left_custom': [''],
      shoulder_gmt_upper_comments: [''],
      elbow_gross_muscle_tests_upper: ['no'],
      elbow_gmt_upper_elbow_flexion_right: [''],
      elbow_gmt_upper_elbow_flexion_right_custom: [''],
      elbow_gmt_upper_elbow_flexion_left: [''],
      elbow_gmt_upper_elbow_flexion_left_custom: [''],
      elbow_gmt_upper_elbow_extension_right: [''],
      elbow_gmt_upper_elbow_extension_right_custom: [''],
      elbow_gmt_upper_elbow_extension_left: [''],
      elbow_gmt_upper_elbow_extension_left_custom: [''],
      elbow_gmt_upper_elbow_supination_right: [''],
      elbow_gmt_upper_elbow_supination_right_custom: [''],
      elbow_gmt_upper_elbow_supination_left: [''],
      elbow_gmt_upper_elbow_supination_left_custom: [''],
      elbow_gmt_upper_elbow_pronation_right: [''],
      elbow_gmt_upper_elbow_pronation_right_custom: [''],
      elbow_gmt_upper_elbow_pronation_left: [''],
      elbow_gmt_upper_elbow_pronation_left_custom: [''],
      elbow_gmt_upper_comments: [''],
      wrist_gross_muscle_tests_upper: ['no'],
      wrist_gmt_upper_wrist_flexion_right: [''],
      wrist_gmt_upper_wrist_flexion_right_custom: [''],
      wrist_gmt_upper_wrist_flexion_left: [''],
      wrist_gmt_upper_wrist_flexion_left_custom: [''],
      wrist_gmt_upper_wrist_extension_right: [''],
      wrist_gmt_upper_wrist_extension_right_custom: [''],
      wrist_gmt_upper_wrist_extension_left: [''],
      wrist_gmt_upper_wrist_extension_left_custom: [''],
      wrist_gmt_upper_radial_deviation_right: [''],
      wrist_gmt_upper_radial_deviation_right_custom: [''],
      wrist_gmt_upper_radial_deviation_left: [''],
      wrist_gmt_upper_radial_deviation_left_custom: [''],
      wrist_gmt_upper_ulnar_deviation_right: [''],
      wrist_gmt_upper_ulnar_deviation_right_custom: [''],
      wrist_gmt_upper_ulnar_deviation_left: [''],
      wrist_gmt_upper_ulnar_deviation_left_custom: [''],
      wrist_gmt_upper_comments: [''],

      redcord_neurac_stability_tests: ['no'],
      upper_body_myofascial_tests: ['no'],
      lower_body_myofascial_tests: ['no'],
      cervical_movements: ['no'],
      cervical_motor_control_tests: ['no'],
      lumbar_motor_control_tests: ['no'],

      gross_muscle_tests_trunk: ['no'],

      gross_muscle_tests_lower: ['no'],
      hip_gross_muscle_tests_lower: ['no'],
      hip_gmt_lower_hip_flexion_right: [''],
      hip_gmt_lower_hip_flexion_right_custom: [''],
      hip_gmt_lower_hip_flexion_left: [''],
      hip_gmt_lower_hip_flexion_left_custom: [''],
      hip_gmt_lower_hip_extension_right: [''],
      hip_gmt_lower_hip_extension_right_custom: [''],
      hip_gmt_lower_hip_extension_left: [''],
      hip_gmt_lower_hip_extension_left_custom: [''],
      hip_gmt_lower_hip_abduction_right: [''],
      hip_gmt_lower_hip_abduction_right_custom: [''],
      hip_gmt_lower_hip_abduction_left: [''],
      hip_gmt_lower_hip_abduction_left_custom: [''],
      hip_gmt_lower_hip_adduction_right: [''],
      hip_gmt_lower_hip_adduction_right_custom: [''],
      hip_gmt_lower_hip_adduction_left: [''],
      hip_gmt_lower_hip_adduction_left_custom: [''],
      hip_gmt_lower_hip_internal_rotation_right: [''],
      hip_gmt_lower_hip_internal_rotation_right_custom: [''],
      hip_gmt_lower_hip_internal_rotation_left: [''],
      hip_gmt_lower_hip_internal_rotation_left_custom: [''],
      hip_gmt_lower_hip_external_rotation_right: [''],
      hip_gmt_lower_hip_external_rotation_right_custom: [''],
      hip_gmt_lower_hip_external_rotation_left: [''],
      hip_gmt_lower_hip_external_rotation_left_custom: [''],
      hip_gmt_lower_comments: [''],
      knee_gross_muscle_tests_lower: ['no'],
      knee_gmt_lower_knee_flexion_right: [''],
      knee_gmt_lower_knee_flexion_right_custom: [''],
      knee_gmt_lower_knee_flexion_left: [''],
      knee_gmt_lower_knee_flexion_left_custom: [''],
      knee_gmt_lower_knee_extension_right: [''],
      knee_gmt_lower_knee_extension_right_custom: [''],
      knee_gmt_lower_knee_extension_left: [''],
      knee_gmt_lower_knee_extension_left_custom: [''],
      knee_gmt_lower_comments: [''],
      ankle_gross_muscle_tests_lower: ['no'],
      ankle_gmt_lower_ankle_dorsiflexion_right: [''],
      ankle_gmt_lower_ankle_dorsiflexion_right_custom: [''],
      ankle_gmt_lower_ankle_dorsiflexion_left: [''],
      ankle_gmt_lower_ankle_dorsiflexion_left_custom: [''],
      ankle_gmt_lower_ankle_plantarflexion_right: [''],
      ankle_gmt_lower_ankle_plantarflexion_right_custom: [''],
      ankle_gmt_lower_ankle_plantarflexion_left: [''],
      ankle_gmt_lower_ankle_plantarflexion_left_custom: [''],
      ankle_gmt_lower_ankle_inversion_right: [''],
      ankle_gmt_lower_ankle_inversion_right_custom: [''],
      ankle_gmt_lower_ankle_inversion_left: [''],
      ankle_gmt_lower_ankle_inversion_left_custom: [''],
      ankle_gmt_lower_ankle_eversion_right: [''],
      ankle_gmt_lower_ankle_eversion_right_custom: [''],
      ankle_gmt_lower_ankle_eversion_left: [''],
      ankle_gmt_lower_ankle_eversion_left_custom: [''],
      ankle_gmt_lower_comments: [''],

      core_strength: ['no'],
      prone_extensioncore_strength: ['no'],
      prone_extension_cs_seconds: [''],
      prone_extension_cs_value: [''],
      supine_flexion_core_strength: ['no'],
      supine_flexion_cs_seconds: [''],
      supine_flexion_cs_value: [''],
      situps_core_strength: ['no'],
      situps_cs_completed: [''],
      situps_cs_value: [''],
      pushup_core_strength: ['no'],
      pushup_cs_completed: [''],
      pushup_cs_value1: [''],
      pushup_cs_knee_completed: [''],
      pushup_cs_value2: [''],

      manual_muscle_tests: ['no'],

      additional_comments: ['no'],
      additional_comments_text: ['']
    })
  }
  setupValueChangeListeners() {
    this.strengthForm.get('no_limitations_noted')?.valueChanges.subscribe(value => {
      this.showNoLimitationsNotedFields = value === 'yes';
      if (!this.showNoLimitationsNotedFields) {
        this.strengthForm.patchValue({
          uper_extremity: false,
          lower_extremity: false
        });
      }
    });

    this.strengthForm.get('selective_tissue_tension_upper')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionUpperFields = value === 'yes';
      if (!this.showSelectiveTissueTensionUpperFields) {
        this.strengthForm.patchValue({
          cervical: 'no',
          trunk: 'no',
          back_ribs: 'no',
          shoulder: 'no',
          elbow: 'no',
          wrist: 'no',
          hand: 'no',
        });
      }
    });

    this.strengthForm.get('cervical')?.valueChanges.subscribe(value => {
      this.showCervicalFields = value === 'yes';
    });

    this.strengthForm.get('trunk')?.valueChanges.subscribe(value => {
      this.showTrunkFields = value === 'yes';
    });

    this.strengthForm.get('back_ribs')?.valueChanges.subscribe(value => {
      this.showBackRibsFields = value === 'yes';
    });

    this.strengthForm.get('shoulder')?.valueChanges.subscribe(value => {
      this.showShoulderFields = value === 'yes';
    });

    this.strengthForm.get('elbow')?.valueChanges.subscribe(value => {
      this.showElbowFields = value === 'yes';
    });

    this.strengthForm.get('wrist')?.valueChanges.subscribe(value => {
      this.showWristFields = value === 'yes';
    });

    this.strengthForm.get('hand')?.valueChanges.subscribe(value => {
      this.showHandFields = value === 'yes';
    });

    this.strengthForm.get('selective_tissue_tension_lower')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionLowerFields = value === 'yes';
      if (!this.showSelectiveTissueTensionLowerFields) {
        this.strengthForm.patchValue({
          hip: 'no',
          knee: 'no',
          ankle: 'no',
          foot: 'no'
        })
      }

    });

    this.strengthForm.get('hip')?.valueChanges.subscribe(value => {
      this.showHipFields = value === 'yes';
    });

    this.strengthForm.get('knee')?.valueChanges.subscribe(value => {
      this.showKneeFields = value === 'yes';
    });

    this.strengthForm.get('ankle')?.valueChanges.subscribe(value => {
      this.showAnkleFields = value === 'yes';
    });

    this.strengthForm.get('foot')?.valueChanges.subscribe(value => {
      this.showFootFields = value === 'yes';
    });

    this.strengthForm.get('grip_pinch')?.valueChanges.subscribe(value => {
      this.showGripPinchFields = value === 'yes';
      if (!this.showGripPinchFields) {
        this.strengthForm.patchValue({
          rapid_exchange: 'no',
          repeated_grip: 'no',
          five_level_grip: 'no'
        })
      }
    });

    this.strengthForm.get('rapid_exchange')?.valueChanges.subscribe(value => {
      this.showRapidExchangeFields = value === 'yes';
    });

    this.strengthForm.get('repeated_grip')?.valueChanges.subscribe(value => {
      this.showRepeatedGripFields = value === 'yes';
    });

    this.strengthForm.get('five_level_grip')?.valueChanges.subscribe(value => {
      this.showFiveLevelGripFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsUpperFields = value === 'yes';
      if (!this.showGrossMuscleTestsUpperFields) {
        this.strengthForm.patchValue({
          cervical_gross_muscle_tests_upper: 'no',
          shoulder_gross_muscle_tests_upper: 'no',
          elbow_gross_muscle_tests_upper: 'no',
          wrist_gross_muscle_tests_upper: 'no'
        })
      }
    });

    this.strengthForm.get('cervical_gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showCervicalGrossMuscleTestsUpperFields = value === 'yes';
    });

    this.strengthForm.get('shoulder_gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showShoulderGrossMuscleTestsUpperFields = value === 'yes';
    });

    this.strengthForm.get('elbow_gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showElbowGrossMuscleTestsUpperFields = value === 'yes';
    });

    this.strengthForm.get('wrist_gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showWristGrossMuscleTestsUpperFields = value === 'yes';
    });

    this.strengthForm.get('redcord_neurac_stability_tests')?.valueChanges.subscribe(value => {
      this.showRedcordNeuracStabilityTestsFields = value === 'yes';
      if (!this.showRedcordNeuracStabilityTestsFields) {
        this.strengthForm.patchValue({
          upper_body_myofascial_tests: 'no',
          lower_body_myofascial_tests: 'no',
          cervical_movements: 'no',
          cervical_motor_control_tests: 'no',
          lumbar_motor_control_tests: 'no'
        })
      }
    });

    this.strengthForm.get('upper_body_myofascial_tests')?.valueChanges.subscribe(value => {
      this.showUpperBodyMyofascialTestsFields = value === 'yes';
    });

    this.strengthForm.get('lower_body_myofascial_tests')?.valueChanges.subscribe(value => {
      this.showLowerBodyMyofascialTestsFields = value === 'yes';
    });

    this.strengthForm.get('cervical_movements')?.valueChanges.subscribe(value => {
      this.showCervicalMovementsFields = value === 'yes';
    });

    this.strengthForm.get('cervical_motor_control_tests')?.valueChanges.subscribe(value => {
      this.showCervicalMotorControlTestsFields = value === 'yes';
    });

    this.strengthForm.get('lumbar_motor_control_tests')?.valueChanges.subscribe(value => {
      this.showLumbarMotorControlTestsFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_trunk')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsTrunkFields = value === 'yes';
      if (!this.showGrossMuscleTestsTrunkFields) {
        // Use generic reset helper with config
        this.resetMeasurementFieldsWithSelect(this.strengthConfig.grossMuscleTestsTrunk);
      }
    });

    this.strengthForm.get('gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsLowerFields = value === 'yes';
      if (!this.showGrossMuscleTestsLowerFields) {
        this.strengthForm.patchValue({
          hip_gross_muscle_tests_lower: 'no',
          knee_gross_muscle_tests_lower: 'no',
          ankle_gross_muscle_tests_lower: 'no'
        })
      }
    });

    this.strengthForm.get('hip_gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showHipGrossMuscleTestsLowerFields = value === 'yes';
      if (!this.showHipGrossMuscleTestsLowerFields) {
        this.resetMeasurementFields(this.strengthConfig.hipGmtLower);
      }
    });

    this.strengthForm.get('knee_gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showKneeGrossMuscleTestsLowerFields = value === 'yes';
      if (!this.showKneeGrossMuscleTestsLowerFields) {
        this.resetMeasurementFields(this.strengthConfig.kneeGmtLower);
      }
    });

    this.strengthForm.get('ankle_gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showAnkleGrossMuscleTestsLowerFields = value === 'yes';
      if (!this.showAnkleGrossMuscleTestsLowerFields) {
        this.resetMeasurementFields(this.strengthConfig.ankleGmtLower);
      }
    });

    this.strengthForm.get('core_strength')?.valueChanges.subscribe(value => {
      this.showCoreStrengthFields = value === 'yes';
      if (!this.showCoreStrengthFields) {
        this.strengthForm.patchValue({
          prone_extensioncore_strength: 'no',
          supine_flexion_core_strength: 'no',
          situps_core_strength: 'no',
          pushup_core_strength: 'no',
        })
      }
    });

    this.strengthForm.get('prone_extensioncore_strength')?.valueChanges.subscribe(value => {
      this.showProneExtensionCoreStrengthFields = value === 'yes';
      if (!this.showProneExtensionCoreStrengthFields) {
        this.strengthForm.patchValue({
          prone_extension_cs_seconds: '',
          prone_extension_cs_value: '',
        });
      }
    });

    this.strengthForm.get('supine_flexion_core_strength')?.valueChanges.subscribe(value => {
      this.showSupineFlexionCoreStrengthFields = value === 'yes';
      if (!this.showSupineFlexionCoreStrengthFields) {
        this.strengthForm.patchValue({
          supine_flexion_cs_seconds: '',
          supine_flexion_cs_value: '',
        });
      }
    });

    this.strengthForm.get('situps_core_strength')?.valueChanges.subscribe(value => {
      this.showSitupsCoreStrengthFields = value === 'yes';
      if (!this.showSitupsCoreStrengthFields) {
        this.strengthForm.patchValue({
          situps_cs_completed: '',
          situps_cs_value: '',
        });
      }
    });

    this.strengthForm.get('pushup_core_strength')?.valueChanges.subscribe(value => {
      this.showPushupCoreStrengthFields = value === 'yes';
      if (!this.showPushupCoreStrengthFields) {
        this.strengthForm.patchValue({
          pushup_cs_completed: '',
          pushup_cs_value1: '',
          pushup_cs_knee_completed: '',
          pushup_cs_value2: '',
        });
      }
    });

    this.strengthForm.get('manual_muscle_tests')?.valueChanges.subscribe(value => {
      this.showManualMuscleTestsFields = value === 'yes';
    });

    this.strengthForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
      if (!this.showAdditionalCommentsFields) {
        this.strengthForm.get('additional_comments_text')?.setValue('');
      }
    });
  }

  /**
   * Get the strength model from form (for sending to backend)
   */
  getStrengthModel(): Strength {
    return this.strengthMapper.toModel(this.strengthForm.getRawValue());
  }

  /**
   * Load strength data from DTO into form
   */
  loadFromDto(dto: Strength): void {
    const formValue = this.strengthMapper.fromDto(dto);
    this.strengthForm.patchValue(formValue);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RangeOfMotionModel } from './models/range-of-motion.model';
import { RangeOfMotionMapperService } from './services/range-of-motion-mapper.service';
import { RomSectionsConfig } from './config';

@Component({
  selector: 'range-of-motion-n',
  templateUrl: './range-of-motion-n.component.html',
  styleUrls: ['./range-of-motion-n.component.css']
})
export class RangeOfMotionNComponent implements OnInit {
  @Input() rangeOfMotionData?: RangeOfMotionModel;
  @Output() formReady = new EventEmitter<FormGroup>();

  romForm!: FormGroup;

  // Visibility flags for dependent fields
  showNoLimitationsNotedFields: boolean = false;
  showPromFields: boolean = false;
  showCervicalAromFields: boolean = false;
  showCostovertebralExpansionFields: boolean = false;
  showShoulderAromFields: boolean = false;
  showShoulderPromFields: boolean = false;
  showElbowAromFields: boolean = false;
  showElbowPromFields: boolean = false;
  showWristAromFields: boolean = false;
  showWristPromFields: boolean = false;
  showHandAromPromFields: boolean = false;
  showThumbAromPromFields: boolean = false;
  showIndexFingerAromPromFields: boolean = false;
  showMiddleFingerAromPromFields: boolean = false;
  showRingFingerAromPromFields: boolean = false;
  showSmallFingerAromPromFields: boolean = false;
  showThoracicAromSittingWithPassiveOverpressureFields: boolean = false;
  showThoracicAromStandingFields: boolean = false;
  showLumbarAromFields: boolean = false;
  showHipAromFields: boolean = false;
  showHipPromFields: boolean = false;
  showKneeAromFields: boolean = false;
  showKneePromFields: boolean = false;
  showAnkleAromFields: boolean = false;
  showAnklePromFields: boolean = false;
  show1stMtpAromFields: boolean = false;
  show1stMtpPromFields: boolean = false;
  show1stIpAromFields: boolean = false;
  show1stIpPromFields: boolean = false;
  showToeAromFields: boolean = false;
  showToePromFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;

  // Dummy examples visibility flags
  showShoulderAromWithLabelsFields: boolean = false;
  showGripTestNoLabelsFields: boolean = false;
  showElbowAromWithSelectsFields: boolean = false;
  showCervicalAromSingleColumnFields: boolean = false;

  // Dropdown options
  cervicalRomOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wfl', label: 'WFL' },
    { value: 'limited', label: 'Limited' }
  ];

  applyToAllOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' },

  ];

  romTestOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' },
    { value: 'limited', label: 'Limited' }
  ];
  wristAROMOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' }
  ];
  wristPROMOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' }
  ];
  thoracicAROMStandingOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' }
  ];
  lumbarAROMOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' }
  ];
  hipPromOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' },
    { value: 'limited', label: 'Limited' }
  ];

  // ROM Sections Configuration
  readonly romConfig = RomSectionsConfig;

  constructor(
    private fb: FormBuilder,
    private rangeOfMotionMapper: RangeOfMotionMapperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();

    // Load data if provided
    if (this.rangeOfMotionData) {
      this.loadFromDto(this.rangeOfMotionData);
    }

    this.formReady.emit(this.romForm);
  }

  /**
   * Get the range of motion model from form (for sending to backend)
   */
  getRangeOfMotionModel(): RangeOfMotionModel {
    return this.rangeOfMotionMapper.toModel(this.romForm.getRawValue());
  }

  /**
   * Load range of motion data from DTO into form
   */
  loadFromDto(dto: RangeOfMotionModel): void {
    const formValue = this.rangeOfMotionMapper.fromDto(dto);
    this.romForm.patchValue(formValue);
  }

  private initForm(): void {
    this.romForm = this.fb.group({
      // No Limitations Noted
      no_limitations_noted: ['no'],
      arom: [false],
      prom: [false],
      prom_cervical: [false],
      prom_thoracic: [false],
      prom_shoulder: [false],
      prom_elbow: [false],
      prom_wrist: [false],
      prom_hand: [false],
      prom_lumbar: [false],
      prom_hip: [false],
      prom_knee: [false],
      prom_ankle: [false],
      prom_feet: [false],
      prom_comments: [''],
      
      cervical_arrom: ['no'],
      
      
      costovertebral_expansion: ['no'],
      
      shoulder_arrom: ['no'],
      shoulder_apply_to_all: [''],
      shoulder_flexion_right: ['not_tested'],
      shoulder_flexion_left: ['not_tested'],
      shoulder_scaption_right: ['not_tested'],
      shoulder_scaption_left: ['not_tested'],
      shoulder_abduction_right: ['not_tested'],
      shoulder_abduction_left: ['not_tested'],
      shoulder_extension_right: ['not_tested'],
      shoulder_extension_left: ['not_tested'],
      shoulder_functional_er_reach_right: ['not_tested'],
      shoulder_functional_er_reach_left: ['not_tested'],
      shoulder_functional_ir_reach_right: ['not_tested'],
      shoulder_functional_ir_reach_left: ['not_tested'],
      shoulder_er_neutral_right: ['not_tested'],
      shoulder_er_neutral_left: ['not_tested'],
      shoulder_ir_neutral_right: ['not_tested'],
      shoulder_ir_neutral_left: ['not_tested'],
      shoulder_horizontal_abduction_right: ['not_tested'],
      shoulder_horizontal_abduction_left: ['not_tested'],
      shoulder_horizontal_adduction_right: ['not_tested'],
      shoulder_horizontal_adduction_left: ['not_tested'],
      shoulder_prom: ['no'],
      shoulder_prom_apply_to_all: [''],
      shoulder_prom_flexion_right: ['not_tested'],
      shoulder_prom_flexion_right_endfeel: ['not_tested'],
      shoulder_prom_flexion_left: ['not_tested'],
      shoulder_prom_flexion_left_endfeel: ['not_tested'],
      shoulder_prom_scaption_right: ['not_tested'],
      shoulder_prom_scaption_right_endfeel: ['not_tested'],
      shoulder_prom_scaption_left: ['not_tested'],
      shoulder_prom_scaption_left_endfeel: ['not_tested'],
      shoulder_prom_abduction_right: ['not_tested'],
      shoulder_prom_abduction_right_endfeel: ['not_tested'],
      shoulder_prom_abduction_left: ['not_tested'],
      shoulder_prom_abduction_left_endfeel: ['not_tested'],
      shoulder_prom_extension_right: ['not_tested'],
      shoulder_prom_extension_right_endfeel: ['not_tested'],
      shoulder_prom_extension_left: ['not_tested'],
      shoulder_prom_extension_left_endfeel: ['not_tested'],
      shoulder_prom_er_neutral_right: ['not_tested'],
      shoulder_prom_er_neutral_right_endfeel: ['not_tested'],
      shoulder_prom_er_neutral_left: ['not_tested'],
      shoulder_prom_er_neutral_left_endfeel: ['not_tested'],
      shoulder_prom_ir_neutral_right: ['not_tested'],
      shoulder_prom_ir_neutral_right_endfeel: ['not_tested'],
      shoulder_prom_ir_neutral_left: ['not_tested'],
      shoulder_prom_ir_neutral_left_endfeel: ['not_tested'],
      shoulder_prom_er_scapular_plane_right: ['not_tested'],
      shoulder_prom_er_scapular_plane_right_endfeel: ['not_tested'],
      shoulder_prom_er_scapular_plane_left: ['not_tested'],
      shoulder_prom_er_scapular_plane_left_endfeel: ['not_tested'],
      shoulder_prom_ir_scapular_plane_right: ['not_tested'],
      shoulder_prom_ir_scapular_plane_right_endfeel: ['not_tested'],
      shoulder_prom_ir_scapular_plane_left: ['not_tested'],
      shoulder_prom_ir_scapular_plane_left_endfeel: ['not_tested'],
      shoulder_prom_er_90_degrees_abduction_right: ['not_tested'],
      shoulder_prom_er_90_degrees_abduction_right_endfeel: ['not_tested'],
      shoulder_prom_er_90_degrees_abduction_left: ['not_tested'],
      shoulder_prom_er_90_degrees_abduction_left_endfeel: ['not_tested'],
      shoulder_prom_ir_90_degrees_abduction_right: ['not_tested'],
      shoulder_prom_ir_90_degrees_abduction_right_endfeel: ['not_tested'],
      shoulder_prom_ir_90_degrees_abduction_left: ['not_tested'],
      shoulder_prom_ir_90_degrees_abduction_left_endfeel: ['not_tested'],
      shoulder_prom_ir_sleeper_stretch_right: ['not_tested'],
      shoulder_prom_ir_sleeper_stretch_right_endfeel: ['not_tested'],
      shoulder_prom_ir_sleeper_stretch_left: ['not_tested'],
      shoulder_prom_ir_sleeper_stretch_left_endfeel: ['not_tested'],
      shoulder_prom_horizontal_abduction_right: ['not_tested'],
      shoulder_prom_horizontal_abduction_right_endfeel: ['not_tested'],
      shoulder_prom_horizontal_abduction_left: ['not_tested'],
      shoulder_prom_horizontal_abduction_left_endfeel: ['not_tested'],
      shoulder_prom_horizontal_adduction_right: ['not_tested'],
      shoulder_prom_horizontal_adduction_right_endfeel: ['not_tested'],
      shoulder_prom_horizontal_adduction_left: ['not_tested'],
      shoulder_prom_horizontal_adduction_left_endfeel: ['not_tested'],
      elbow_arrom: ['no'],
      elbow_arrom_apply_to_all: [''],
      elbow_arrom_flexion_right: ['not_tested'],
      elbow_arrom_flexion_left: ['not_tested'],
      elbow_arrom_extension_right: ['not_tested'],
      elbow_arrom_extension_left: ['not_tested'],
      elbow_arrom_pronation_right: ['not_tested'],
      elbow_arrom_pronation_left: ['not_tested'],
      elbow_arrom_supination_right: ['not_tested'],
      elbow_arrom_supination_left: ['not_tested'],
      elbow_prom: ['no'],
      elbow_prom_apply_to_all: [''],
      elbow_prom_extension_right: ['not_tested'],
      elbow_prom_extension_right_endfeel: ['not_tested'],
      elbow_prom_extension_left: ['not_tested'],
      elbow_prom_extension_left_endfeel: ['not_tested'],
      elbow_prom_flexion_right: ['not_tested'],
      elbow_prom_flexion_right_endfeel: ['not_tested'],
      elbow_prom_flexion_left: ['not_tested'],
      elbow_prom_flexion_left_endfeel: ['not_tested'],
      elbow_prom_supination_right: ['not_tested'],
      elbow_prom_supination_right_endfeel: ['not_tested'],
      elbow_prom_supination_left: ['not_tested'],
      elbow_prom_supination_left_endfeel: ['not_tested'],
      elbow_prom_pronation_right: ['not_tested'],
      elbow_prom_pronation_right_endfeel: ['not_tested'],
      elbow_prom_pronation_left: ['not_tested'],
      elbow_prom_pronation_left_endfeel: ['not_tested'],

      wrist_arrom: ['no'],
      wrist_arrom_apply_to_all: [''],
      extension_right: ['not_tested'],
      extension_left: ['not_tested'],
      flexion_right: ['not_tested'],
      flexion_left: ['not_tested'],
      radial_deviation_right: ['not_tested'],
      radial_deviation_left: ['not_tested'],
      ulnar_deviation_right: ['not_tested'],
      ulnar_deviation_left: ['not_tested'],

      wrist_prom: ['no'],
      wrist_prom_apply_to_all: [''],
      wrist_prom_extension_right: ['not_tested'],
      wrist_prom_extension_right_endfeel: ['not_tested'],
      wrist_prom_extension_left: ['not_tested'],
      wrist_prom_extension_left_endfeel: ['not_tested'],
      wrist_prom_flexion_right: ['not_tested'],
      wrist_prom_flexion_right_endfeel: ['not_tested'],
      wrist_prom_flexion_left: ['not_tested'],
      wrist_prom_flexion_left_endfeel: ['not_tested'],
      wrist_prom_radial_deviation_right: ['not_tested'],
      wrist_prom_radial_deviation_right_endfeel: ['not_tested'],
      wrist_prom_radial_deviation_left: ['not_tested'],
      wrist_prom_radial_deviation_left_endfeel: ['not_tested'],
      wrist_prom_ulnar_deviation_right: ['not_tested'],
      wrist_prom_ulnar_deviation_right_endfeel: ['not_tested'],
      wrist_prom_ulnar_deviation_left: ['not_tested'],
      wrist_prom_ulnar_deviation_left_endfeel: ['not_tested'],

      hand_arrom_prom: ['no'],
      calculate_total_rom: [false],
      thumb_arrom_prom: [false],
      thumb_cmc_palmar_abduction_right_arom: ['not_tested'],
      thumb_cmc_palmar_abduction_right_prom: ['not_tested'],
      thumb_cmc_palmar_abduction_left_arom: ['not_tested'],
      thumb_cmc_palmar_abduction_left_prom: ['not_tested'],
      thumb_cmc_radial_abduction_right_arom: ['not_tested'],
      thumb_cmc_radial_abduction_right_prom: ['not_tested'],
      thumb_cmc_radial_abduction_left_arom: ['not_tested'],
      thumb_cmc_radial_abduction_left_prom: ['not_tested'],
      thumb_cmc_adduction_right_arom: ['not_tested'],
      thumb_cmc_adduction_right_prom: ['not_tested'],
      thumb_cmc_adduction_left_arom: ['not_tested'],
      thumb_cmc_adduction_left_prom: ['not_tested'],
      thumb_cmc_extension_right_arom: ['not_tested'],
      thumb_cmc_extension_right_prom: ['not_tested'],
      thumb_cmc_extension_left_arom: ['not_tested'],
      thumb_cmc_extension_left_prom: ['not_tested'],
      thumb_cmc_flexion_right_arom: ['not_tested'],
      thumb_cmc_flexion_right_prom: ['not_tested'],
      thumb_cmc_flexion_left_arom: ['not_tested'],
      thumb_cmc_flexion_left_prom: ['not_tested'],
      thumb_cmc_total_motion_right_arom: [''],
      thumb_cmc_total_motion_right_prom: [''],
      thumb_cmc_total_motion_left_arom: [''],
      thumb_cmc_total_motion_left_prom: [''],
      thumb_mp_extension_right_arom: ['not_tested'],
      thumb_mp_extension_right_prom: ['not_tested'],
      thumb_mp_extension_left_arom: ['not_tested'],
      thumb_mp_extension_left_prom: ['not_tested'],
      thumb_mp_flexion_right_arom: ['not_tested'],
      thumb_mp_flexion_right_prom: ['not_tested'],
      thumb_mp_flexion_left_arom: ['not_tested'],
      thumb_mp_flexion_left_prom: ['not_tested'],
      thumb_mp_total_motion_right_arom: [''],
      thumb_mp_total_motion_right_prom: [''],
      thumb_mp_total_motion_left_arom: [''],
      thumb_mp_total_motion_left_prom: [''],
      thumb_ip_extension_right_arom: ['not_tested'],
      thumb_ip_extension_right_prom: ['not_tested'],
      thumb_ip_extension_left_arom: ['not_tested'],
      thumb_ip_extension_left_prom: ['not_tested'],
      thumb_ip_flexion_right_arom: ['not_tested'],
      thumb_ip_flexion_right_prom: ['not_tested'],
      thumb_ip_flexion_left_arom: ['not_tested'],
      thumb_ip_flexion_left_prom: ['not_tested'],
      thumb_ip_total_motion_right_arom: [''],
      thumb_ip_total_motion_right_prom: [''],
      thumb_ip_total_motion_left_arom: [''],
      thumb_ip_total_motion_left_prom: [''],
      thumb_comments: [''],

      index_finger_arrom_prom: [false],
      index_mp_adduction_right_arom: ['not_tested'],
      index_mp_adduction_right_prom: ['not_tested'],
      index_mp_adduction_left_arom: ['not_tested'],
      index_mp_adduction_left_prom: ['not_tested'],
      index_mp_extension_right_arom: ['not_tested'],
      index_mp_extension_right_prom: ['not_tested'],
      index_mp_extension_left_arom: ['not_tested'],
      index_mp_extension_left_prom: ['not_tested'],
      index_mp_flexion_right_arom: ['not_tested'],
      index_mp_flexion_right_prom: ['not_tested'],
      index_mp_flexion_left_arom: ['not_tested'],
      index_mp_flexion_left_prom: ['not_tested'],
      index_mp_total_motion_right_arom: [''],
      index_mp_total_motion_right_prom: [''],
      index_mp_total_motion_left_arom: [''],
      index_mp_total_motion_left_prom: [''],
      index_pip_extension_right_arom: ['not_tested'],
      index_pip_extension_right_prom: ['not_tested'],
      index_pip_extension_left_arom: ['not_tested'],
      index_pip_extension_left_prom: ['not_tested'],
      index_pip_flexion_right_arom: ['not_tested'],
      index_pip_flexion_right_prom: ['not_tested'],
      index_pip_flexion_left_arom: ['not_tested'],
      index_pip_flexion_left_prom: ['not_tested'],
      index_pip_total_motion_right_arom: [''],
      index_pip_total_motion_right_prom: [''],
      index_pip_total_motion_left_arom: [''],
      index_pip_total_motion_left_prom: [''],
      index_dip_extension_right_arom: ['not_tested'],
      index_dip_extension_right_prom: ['not_tested'],
      index_dip_extension_left_arom: ['not_tested'],
      index_dip_extension_left_prom: ['not_tested'],
      index_dip_flexion_right_arom: ['not_tested'],
      index_dip_flexion_right_prom: ['not_tested'],
      index_dip_flexion_left_arom: ['not_tested'],
      index_dip_flexion_left_prom: ['not_tested'],
      index_dip_total_motion_right_arom: [''],
      index_dip_total_motion_right_prom: [''],
      index_dip_total_motion_left_arom: [''],
      index_dip_total_motion_left_prom: [''],
      index_comments: [''],

      middle_finger_arrom_prom: [false],
      middle_mp_adduction_right_arom: ['not_tested'],
      middle_mp_adduction_right_prom: ['not_tested'],
      middle_mp_adduction_left_arom: ['not_tested'],
      middle_mp_adduction_left_prom: ['not_tested'],
      middle_mp_extension_right_arom: ['not_tested'],
      middle_mp_extension_right_prom: ['not_tested'],
      middle_mp_extension_left_arom: ['not_tested'],
      middle_mp_extension_left_prom: ['not_tested'],
      middle_mp_flexion_right_arom: ['not_tested'],
      middle_mp_flexion_right_prom: ['not_tested'],
      middle_mp_flexion_left_arom: ['not_tested'],
      middle_mp_flexion_left_prom: ['not_tested'],
      middle_mp_total_motion_right_arom: [''],
      middle_mp_total_motion_right_prom: [''],
      middle_mp_total_motion_left_arom: [''],
      middle_mp_total_motion_left_prom: [''],
      middle_pip_extension_right_arom: ['not_tested'],
      middle_pip_extension_right_prom: ['not_tested'],
      middle_pip_extension_left_arom: ['not_tested'],
      middle_pip_extension_left_prom: ['not_tested'],
      middle_pip_flexion_right_arom: ['not_tested'],
      middle_pip_flexion_right_prom: ['not_tested'],
      middle_pip_flexion_left_arom: ['not_tested'],
      middle_pip_flexion_left_prom: ['not_tested'],
      middle_pip_total_motion_right_arom: [''],
      middle_pip_total_motion_right_prom: [''],
      middle_pip_total_motion_left_arom: [''],
      middle_pip_total_motion_left_prom: [''],
      middle_dip_extension_right_arom: ['not_tested'],
      middle_dip_extension_right_prom: ['not_tested'],
      middle_dip_extension_left_arom: ['not_tested'],
      middle_dip_extension_left_prom: ['not_tested'],
      middle_dip_flexion_right_arom: ['not_tested'],
      middle_dip_flexion_right_prom: ['not_tested'],
      middle_dip_flexion_left_arom: ['not_tested'],
      middle_dip_flexion_left_prom: ['not_tested'],
      middle_dip_total_motion_right_arom: [''],
      middle_dip_total_motion_right_prom: [''],
      middle_dip_total_motion_left_arom: [''],
      middle_dip_total_motion_left_prom: [''],
      middle_comments: [''],

      ring_finger_arrom_prom: [false],
      ring_mp_adduction_right_arom: ['not_tested'],
      ring_mp_adduction_right_prom: ['not_tested'],
      ring_mp_adduction_left_arom: ['not_tested'],
      ring_mp_adduction_left_prom: ['not_tested'],
      ring_mp_extension_right_arom: ['not_tested'],
      ring_mp_extension_right_prom: ['not_tested'],
      ring_mp_extension_left_arom: ['not_tested'],
      ring_mp_extension_left_prom: ['not_tested'],
      ring_mp_flexion_right_arom: ['not_tested'],
      ring_mp_flexion_right_prom: ['not_tested'],
      ring_mp_flexion_left_arom: ['not_tested'],
      ring_mp_flexion_left_prom: ['not_tested'],
      ring_mp_total_motion_right_arom: [''],
      ring_mp_total_motion_right_prom: [''],
      ring_mp_total_motion_left_arom: [''],
      ring_mp_total_motion_left_prom: [''],
      ring_pip_extension_right_arom: ['not_tested'],
      ring_pip_extension_right_prom: ['not_tested'],
      ring_pip_extension_left_arom: ['not_tested'],
      ring_pip_extension_left_prom: ['not_tested'],
      ring_pip_flexion_right_arom: ['not_tested'],
      ring_pip_flexion_right_prom: ['not_tested'],
      ring_pip_flexion_left_arom: ['not_tested'],
      ring_pip_flexion_left_prom: ['not_tested'],
      ring_pip_total_motion_right_arom: [''],
      ring_pip_total_motion_right_prom: [''],
      ring_pip_total_motion_left_arom: [''],
      ring_pip_total_motion_left_prom: [''],
      ring_dip_extension_right_arom: ['not_tested'],
      ring_dip_extension_right_prom: ['not_tested'],
      ring_dip_extension_left_arom: ['not_tested'],
      ring_dip_extension_left_prom: ['not_tested'],
      ring_dip_flexion_right_arom: ['not_tested'],
      ring_dip_flexion_right_prom: ['not_tested'],
      ring_dip_flexion_left_arom: ['not_tested'],
      ring_dip_flexion_left_prom: ['not_tested'],
      ring_dip_total_motion_right_arom: [''],
      ring_dip_total_motion_right_prom: [''],
      ring_dip_total_motion_left_arom: [''],
      ring_dip_total_motion_left_prom: [''],
      ring_comments: [''],

      small_finger_arrom_prom: [false],
      small_mp_adduction_right_arom: ['not_tested'],
      small_mp_adduction_right_prom: ['not_tested'],
      small_mp_adduction_left_arom: ['not_tested'],
      small_mp_adduction_left_prom: ['not_tested'],
      small_mp_extension_right_arom: ['not_tested'],
      small_mp_extension_right_prom: ['not_tested'],
      small_mp_extension_left_arom: ['not_tested'],
      small_mp_extension_left_prom: ['not_tested'],
      small_mp_flexion_right_arom: ['not_tested'],
      small_mp_flexion_right_prom: ['not_tested'],
      small_mp_flexion_left_arom: ['not_tested'],
      small_mp_flexion_left_prom: ['not_tested'],
      small_mp_total_motion_right_arom: [''],
      small_mp_total_motion_right_prom: [''],
      small_mp_total_motion_left_arom: [''],
      small_mp_total_motion_left_prom: [''],
      small_pip_extension_right_arom: ['not_tested'],
      small_pip_extension_right_prom: ['not_tested'],
      small_pip_extension_left_arom: ['not_tested'],
      small_pip_extension_left_prom: ['not_tested'],
      small_pip_flexion_right_arom: ['not_tested'],
      small_pip_flexion_right_prom: ['not_tested'],
      small_pip_flexion_left_arom: ['not_tested'],
      small_pip_flexion_left_prom: ['not_tested'],
      small_pip_total_motion_right_arom: [''],
      small_pip_total_motion_right_prom: [''],
      small_pip_total_motion_left_arom: [''],
      small_pip_total_motion_left_prom: [''],
      small_dip_extension_right_arom: ['not_tested'],
      small_dip_extension_right_prom: ['not_tested'],
      small_dip_extension_left_arom: ['not_tested'],
      small_dip_extension_left_prom: ['not_tested'],
      small_dip_flexion_right_arom: ['not_tested'],
      small_dip_flexion_right_prom: ['not_tested'],
      small_dip_flexion_left_arom: ['not_tested'],
      small_dip_flexion_left_prom: ['not_tested'],
      small_dip_total_motion_right_arom: [''],
      small_dip_total_motion_right_prom: [''],
      small_dip_total_motion_left_arom: [''],
      small_dip_total_motion_left_prom: [''],
      small_comments: [''],

      thoracic_arrom_sitting_with_passive_overpressure: ['no'],
      thoracic_arrom_sitting_apply_to_all: [''],
      thoracic_arrom_sitting_forward_bending: ['not_tested'],
      thoracic_arrom_sitting_backward_bending: ['not_tested'],
      thoracic_arrom_sitting_right_rotation: ['not_tested'],
      thoracic_arrom_sitting_left_rotation: ['not_tested'],
      thoracic_arrom_sitting_right_side_bending: ['not_tested'],
      thoracic_arrom_sitting_left_side_bending: ['not_tested'],
      //thoracic_arrom_standing
      thoracic_arrom_standing: ['no'],
      thoracic_arrom_standing_apply_to_all: [''],
      thoracic_arrom_standing_forward_bending: ['not_tested'],
      thoracic_arrom_standing_backward_bending: ['not_tested'],
      thoracic_arrom_standing_right_rotation: ['not_tested'],
      thoracic_arrom_standing_left_rotation: ['not_tested'],
      thoracic_arrom_standing_right_side_bending: ['not_tested'],
      thoracic_arrom_standing_left_side_bending: ['not_tested'],

      //lumbar_arrom
      lumbar_arrom: ['no'],

      hip_arrom: ['no'],
      hip_flexion_right: ['not_tested'],
      hip_flexion_left: ['not_tested'],
      hip_extension_right: ['not_tested'],
      hip_extension_left: ['not_tested'],
      hip_abduction_right: ['not_tested'],
      hip_abduction_left: ['not_tested'],
      hip_adduction_right: ['not_tested'],
      hip_adduction_left: ['not_tested'],
      hip_internal_rotation_right: ['not_tested'],
      hip_internal_rotation_left: ['not_tested'],
      hip_external_rotation_right: ['not_tested'],
      hip_external_rotation_left: ['not_tested'],
      hip_arrom_comments: [''],

      hip_prom: ['no'],
      hip_prom_apply_to_all: [''],
      hip_prom_flexion_right: ['not_tested'],
      hip_prom_flexion_right_endfeel: ['not_tested'],
      hip_prom_flexion_left: ['not_tested'],
      hip_prom_flexion_left_endfeel: ['not_tested'],

      hip_prom_extension_right: ['not_tested'],
      hip_prom_extension_right_endfeel: ['not_tested'],
      hip_prom_extension_left: ['not_tested'],
      hip_prom_extension_left_endfeel: ['not_tested'],

      hip_prom_abduction_right: ['not_tested'],
      hip_prom_abduction_right_endfeel: ['not_tested'],
      hip_prom_abduction_left: ['not_tested'],
      hip_prom_abduction_left_endfeel: ['not_tested'],

      hip_prom_adduction_right: ['not_tested'],
      hip_prom_adduction_right_endfeel: ['not_tested'],
      hip_prom_adduction_left: ['not_tested'],
      hip_prom_adduction_left_endfeel: ['not_tested'],

      hip_prom_internal_rotation_right: ['not_tested'],
      hip_prom_internal_rotation_right_endfeel: ['not_tested'],
      hip_prom_internal_rotation_left: ['not_tested'],
      hip_prom_internal_rotation_left_endfeel: ['not_tested'],

      hip_prom_external_rotation_right: ['not_tested'],
      hip_prom_external_rotation_right_endfeel: ['not_tested'],
      hip_prom_external_rotation_left: ['not_tested'],
      hip_prom_external_rotation_left_endfeel: ['not_tested'],
      hip_prom_comments: [''], // For common component

      knee_arrom: ['no'],
      knee_arom_apply_to_all: [''],
      knee_apply_to_all: [''], // New name for common component
      knee_flexion_right: ['not_tested'],
      knee_flexion_left: ['not_tested'],
      knee_extension_right: ['not_tested'],
      knee_extension_left: ['not_tested'],
      knee_arrom_comments: [''],
      knee_comments: [''], // New name for common component
      knee_prom: ['no'],
      ankle_arrom: ['no'],
      ankle_arom_apply_to_all: [''],
      ankle_apply_to_all: [''], // New name for common component
      ankle_dorsiflexion_0_knee_flexion_right: ['not_tested'],
      ankle_dorsiflexion_0_knee_flexion_left: ['not_tested'],
      ankle_dorsiflexion_90_knee_flexion_right: ['not_tested'],
      ankle_dorsiflexion_90_knee_flexion_left: ['not_tested'],
      ankle_plantarflexion_right: ['not_tested'],
      ankle_plantarflexion_left: ['not_tested'],
      ankle_inversion_right: ['not_tested'],
      ankle_inversion_left: ['not_tested'],
      ankle_eversion_right: ['not_tested'],
      ankle_eversion_left: ['not_tested'],
      ankle_arrom_comments: [''],
      ankle_comments: [''], // New name for common component
      ankle_prom: ['no'],
      ankle_prom_apply_to_all: [''],
      ankle_prom_dorsiflexion_0_knee_flexion_right: ['not_tested'],
      ankle_prom_dorsiflexion_0_knee_flexion_right_endfeel: ['not_tested'],
      ankle_prom_dorsiflexion_0_knee_flexion_left: ['not_tested'],
      ankle_prom_dorsiflexion_0_knee_flexion_left_endfeel: ['not_tested'],
      ankle_prom_dorsiflexion_90_knee_flexion_right: ['not_tested'],
      ankle_prom_dorsiflexion_90_knee_flexion_right_endfeel: ['not_tested'],
      ankle_prom_dorsiflexion_90_knee_flexion_left: ['not_tested'],
      ankle_prom_dorsiflexion_90_knee_flexion_left_endfeel: ['not_tested'],
      ankle_prom_plantarflexion_right: ['not_tested'],
      ankle_prom_plantarflexion_right_endfeel: ['not_tested'],
      ankle_prom_plantarflexion_left: ['not_tested'],
      ankle_prom_plantarflexion_left_endfeel: ['not_tested'],
      ankle_prom_inversion_right: ['not_tested'],
      ankle_prom_inversion_right_endfeel: ['not_tested'],
      ankle_prom_inversion_left: ['not_tested'],
      ankle_prom_inversion_left_endfeel: ['not_tested'],
      ankle_prom_eversion_right: ['not_tested'],
      ankle_prom_eversion_right_endfeel: ['not_tested'],
      ankle_prom_eversion_left: ['not_tested'],
      ankle_prom_eversion_left_endfeel: ['not_tested'],
      ankle_prom_comments: [''],
      fst_mtp_arrom: ['no'],
      fst_mtp_arom_apply_to_all: [''],
      fst_mtp_apply_to_all: [''], // New name for common component
      fst_mtp_flexion_right: ['not_tested'],
      fst_mtp_flexion_left: ['not_tested'],
      fst_mtp_extension_right: ['not_tested'],
      fst_mtp_extension_left: ['not_tested'],
      fst_mtp_arrom_comments: [''],
      fst_mtp_comments: [''], // New name for common component
      fst_mtp_prom: ['no'],
      fst_ip_arrom: ['no'],
      fst_ip_arom_apply_to_all: [''],
      fst_ip_apply_to_all: [''], // New name for common component
      fst_ip_flexion_right: ['not_tested'],
      fst_ip_flexion_left: ['not_tested'],
      fst_ip_extension_right: ['not_tested'],
      fst_ip_extension_left: ['not_tested'],
      fst_ip_arrom_comments: [''],
      fst_ip_comments: [''], // New name for common component
      fst_ip_prom: ['no'],
      toe_arrom: ['no'],
      toe_arom_apply_to_all: [''],
      toe_apply_to_all: [''], // New name for common component
      toe_arom_2nd_mtp_flexion_right: ['not_tested'],
      toe_arom_2nd_mtp_flexion_left: ['not_tested'],
      toe_arom_2nd_mtp_extension_right: ['not_tested'],
      toe_arom_2nd_mtp_extension_left: ['not_tested'],
      toe_arom_2nd_ip_flexion_right: ['not_tested'],
      toe_arom_2nd_ip_flexion_left: ['not_tested'],
      toe_arom_2nd_ip_extension_right: ['not_tested'],
      toe_arom_2nd_ip_extension_left: ['not_tested'],
      toe_arom_3rd_mtp_flexion_right: ['not_tested'],
      toe_arom_3rd_mtp_flexion_left: ['not_tested'],
      toe_arom_3rd_mtp_extension_right: ['not_tested'],
      toe_arom_3rd_mtp_extension_left: ['not_tested'],
      toe_arom_3rd_ip_flexion_right: ['not_tested'],
      toe_arom_3rd_ip_flexion_left: ['not_tested'],
      toe_arom_3rd_ip_extension_right: ['not_tested'],
      toe_arom_3rd_ip_extension_left: ['not_tested'],
      toe_arom_4th_mtp_flexion_right: ['not_tested'],
      toe_arom_4th_mtp_flexion_left: ['not_tested'],
      toe_arom_4th_mtp_extension_right: ['not_tested'],
      toe_arom_4th_mtp_extension_left: ['not_tested'],
      toe_arom_4th_ip_flexion_right: ['not_tested'],
      toe_arom_4th_ip_flexion_left: ['not_tested'],
      toe_arom_4th_ip_extension_right: ['not_tested'],
      toe_arom_4th_ip_extension_left: ['not_tested'],
      toe_arom_5th_mtp_flexion_right: ['not_tested'],
      toe_arom_5th_mtp_flexion_left: ['not_tested'],
      toe_arom_5th_mtp_extension_right: ['not_tested'],
      toe_arom_5th_mtp_extension_left: ['not_tested'],
      toe_arom_5th_ip_flexion_right: ['not_tested'],
      toe_arom_5th_ip_flexion_left: ['not_tested'],
      toe_arom_5th_ip_extension_right: ['not_tested'],
      toe_arom_5th_ip_extension_left: ['not_tested'],
      toe_arrom_comments: [''],
      toe_comments: [''], // New name for common component
      toe_prom: ['no'],
      toe_prom_apply_to_all: [''],
      toe_2nd_mtp_flexion_right: ['not_tested'],
      toe_2nd_mtp_flexion_right_endfeel: ['not_tested'],
      toe_2nd_mtp_flexion_left: ['not_tested'],
      toe_2nd_mtp_flexion_left_endfeel: ['not_tested'],
      toe_2nd_mtp_extension_right: ['not_tested'],
      toe_2nd_mtp_extension_right_endfeel: ['not_tested'],
      toe_2nd_mtp_extension_left: ['not_tested'],
      toe_2nd_mtp_extension_left_endfeel: ['not_tested'],
      toe_2nd_ip_flexion_right: ['not_tested'],
      toe_2nd_ip_flexion_right_endfeel: ['not_tested'],
      toe_2nd_ip_flexion_left: ['not_tested'],
      toe_2nd_ip_flexion_left_endfeel: ['not_tested'],
      toe_2nd_ip_extension_right: ['not_tested'],
      toe_2nd_ip_extension_right_endfeel: ['not_tested'],
      toe_2nd_ip_extension_left: ['not_tested'],
      toe_2nd_ip_extension_left_endfeel: ['not_tested'],
      toe_3rd_mtp_flexion_right: ['not_tested'],
      toe_3rd_mtp_flexion_right_endfeel: ['not_tested'],
      toe_3rd_mtp_flexion_left: ['not_tested'],
      toe_3rd_mtp_flexion_left_endfeel: ['not_tested'],
      toe_3rd_mtp_extension_right: ['not_tested'],
      toe_3rd_mtp_extension_right_endfeel: ['not_tested'],
      toe_3rd_mtp_extension_left: ['not_tested'],
      toe_3rd_mtp_extension_left_endfeel: ['not_tested'],
      toe_3rd_ip_flexion_right: ['not_tested'],
      toe_3rd_ip_flexion_right_endfeel: ['not_tested'],
      toe_3rd_ip_flexion_left: ['not_tested'],
      toe_3rd_ip_flexion_left_endfeel: ['not_tested'],
      toe_3rd_ip_extension_right: ['not_tested'],
      toe_3rd_ip_extension_right_endfeel: ['not_tested'],
      toe_3rd_ip_extension_left: ['not_tested'],
      toe_3rd_ip_extension_left_endfeel: ['not_tested'],
      toe_4th_mtp_flexion_right: ['not_tested'],
      toe_4th_mtp_flexion_right_endfeel: ['not_tested'],
      toe_4th_mtp_flexion_left: ['not_tested'],
      toe_4th_mtp_flexion_left_endfeel: ['not_tested'],
      toe_4th_mtp_extension_right: ['not_tested'],
      toe_4th_mtp_extension_right_endfeel: ['not_tested'],
      toe_4th_mtp_extension_left: ['not_tested'],
      toe_4th_mtp_extension_left_endfeel: ['not_tested'],
      toe_4th_ip_flexion_right: ['not_tested'],
      toe_4th_ip_flexion_right_endfeel: ['not_tested'],
      toe_4th_ip_flexion_left: ['not_tested'],
      toe_4th_ip_flexion_left_endfeel: ['not_tested'],
      toe_4th_ip_extension_right: ['not_tested'],
      toe_4th_ip_extension_right_endfeel: ['not_tested'],
      toe_4th_ip_extension_left: ['not_tested'],
      toe_4th_ip_extension_left_endfeel: ['not_tested'],
      toe_5th_mtp_flexion_right: ['not_tested'],
      toe_5th_mtp_flexion_right_endfeel: ['not_tested'],
      toe_5th_mtp_flexion_left: ['not_tested'],
      toe_5th_mtp_flexion_left_endfeel: ['not_tested'],
      toe_5th_mtp_extension_right: ['not_tested'],
      toe_5th_mtp_extension_right_endfeel: ['not_tested'],
      toe_5th_mtp_extension_left: ['not_tested'],
      toe_5th_mtp_extension_left_endfeel: ['not_tested'],
      toe_5th_ip_flexion_right: ['not_tested'],
      toe_5th_ip_flexion_right_endfeel: ['not_tested'],
      toe_5th_ip_flexion_left: ['not_tested'],
      toe_5th_ip_flexion_left_endfeel: ['not_tested'],
      toe_5th_ip_extension_right: ['not_tested'],
      toe_5th_ip_extension_right_endfeel: ['not_tested'],
      toe_5th_ip_extension_left: ['not_tested'],
      toe_5th_ip_extension_left_endfeel: ['not_tested'],
      toe_prom_comments: [''],

      // Dummy Example: Shoulder AROM with Labels
      shoulder_arom_with_labels: ['no'],
      shoulder_arom_retraction_rom: ['not_tested'],
      shoulder_arom_retraction_rom_text: [''],
      shoulder_arom_retraction_movement_quality: ['not_tested'],
      shoulder_arom_retraction_movement_quality_text: [''],
      shoulder_arom_retraction_pain_free_movement: ['not_tested'],
      shoulder_arom_retraction_pain_free_movement_text: [''],
      shoulder_arom_right_rotation_rom: ['not_tested'],
      shoulder_arom_right_rotation_rom_text: [''],
      shoulder_arom_right_rotation_movement_quality: ['not_tested'],
      shoulder_arom_right_rotation_movement_quality_text: [''],
      shoulder_arom_right_rotation_pain_free_movement: ['not_tested'],
      shoulder_arom_right_rotation_pain_free_movement_text: [''],
      shoulder_arom_left_rotation_rom: ['not_tested'],
      shoulder_arom_left_rotation_rom_text: [''],
      shoulder_arom_left_rotation_movement_quality: ['not_tested'],
      shoulder_arom_left_rotation_movement_quality_text: [''],
      shoulder_arom_left_rotation_pain_free_movement: ['not_tested'],
      shoulder_arom_left_rotation_pain_free_movement_text: [''],
      shoulder_arom_right_lateral_flexion_rom: ['not_tested'],
      shoulder_arom_right_lateral_flexion_rom_text: [''],
      shoulder_arom_right_lateral_flexion_movement_quality: ['not_tested'],
      shoulder_arom_right_lateral_flexion_movement_quality_text: [''],
      shoulder_arom_right_lateral_flexion_pain_free_movement: ['not_tested'],
      shoulder_arom_right_lateral_flexion_pain_free_movement_text: [''],
      shoulder_arom_left_lateral_flexion_rom: ['not_tested'],
      shoulder_arom_left_lateral_flexion_rom_text: [''],
      shoulder_arom_left_lateral_flexion_movement_quality: ['not_tested'],
      shoulder_arom_left_lateral_flexion_movement_quality_text: [''],
      shoulder_arom_left_lateral_flexion_pain_free_movement: ['not_tested'],
      shoulder_arom_left_lateral_flexion_pain_free_movement_text: [''],
      shoulder_arom_extension_rom: ['not_tested'],
      shoulder_arom_extension_rom_text: [''],
      shoulder_arom_extension_movement_quality: ['not_tested'],
      shoulder_arom_extension_movement_quality_text: [''],
      shoulder_arom_extension_pain_free_movement: ['not_tested'],
      shoulder_arom_extension_pain_free_movement_text: [''],
      shoulder_arom_comments: [''],

      // Dummy Example: Grip Test without Labels
      grip_test_no_labels: ['no'],
      grip_test_right: ['not_tested'],
      grip_test_right_text: [''],
      grip_test_left: ['not_tested'],
      grip_test_left_text: [''],
      grip_test_comments: [''],

      // Dummy Example: Elbow AROM with Top Selects
      elbow_arom_with_selects: ['no'],
      elbow_arom_patient_position: [''],
      elbow_arom_test_method: [''],
      elbow_arom_pain_level: [''],
      elbow_arom_flexion_right: ['not_tested'],
      elbow_arom_flexion_left: ['not_tested'],
      elbow_arom_extension_right: ['not_tested'],
      elbow_arom_extension_left: ['not_tested'],
      elbow_arom_supination_right: ['not_tested'],
      elbow_arom_supination_left: ['not_tested'],
      elbow_arom_pronation_right: ['not_tested'],
      elbow_arom_pronation_left: ['not_tested'],
      elbow_arom_comments: [''],

      // Dummy Example: Cervical AROM Single Column
      cervical_arom_single_column_dummy: ['no'],

      additional_comments: ['no']
    });
  }

  private setupValueChangeListeners(): void {
    // No Limitations Noted dependency
    this.romForm.get('no_limitations_noted')?.valueChanges.subscribe(value => {
      this.showNoLimitationsNotedFields = value === 'yes';
      if (!this.showNoLimitationsNotedFields) {
        this.romForm.patchValue({
          arom: false,
          prom: false,
          prom_cervical: false,
          prom_thoracic: false,
          prom_shoulder: false,
          prom_elbow: false,
          prom_wrist: false,
          prom_hand: false,
          prom_lumbar: false,
          prom_hip: false,
          prom_knee: false,
          prom_ankle: false,
          prom_feet: false,
          prom_comments: ''
        });
        this.showPromFields = false;
      }
    });

    // PROM nested dependency
    this.romForm.get('prom')?.valueChanges.subscribe(value => {
      this.showPromFields = value === true;
      if (!this.showPromFields) {
        this.romForm.patchValue({
          prom_cervical: false,
          prom_thoracic: false,
          prom_shoulder: false,
          prom_elbow: false,
          prom_wrist: false,
          prom_hand: false,
          prom_lumbar: false,
          prom_hip: false,
          prom_knee: false,
          prom_ankle: false,
          prom_feet: false,
          prom_comments: ''
        });
      }
    });



    this.romForm.get('cervical_arrom')?.valueChanges.subscribe(value => {
      this.showCervicalAromFields = value === 'yes';
      if (!this.showCervicalAromFields) {
        this.romForm.patchValue({
          cervical_forward_bending: 'not_tested',
          cervical_backward_bending: 'not_tested',
          cervical_right_rotation: 'not_tested',
          cervical_left_rotation: 'not_tested',
          cervical_right_side_bending: 'not_tested',
          cervical_left_side_bending: 'not_tested',
          cervical_comments: ''
        });
      }
    });

    this.romForm.get('costovertebral_expansion')?.valueChanges.subscribe(value => {
      this.showCostovertebralExpansionFields = value === 'yes';
      if (!this.showCostovertebralExpansionFields) {
        this.romForm.patchValue({
          costovertebral_apply_to_all: '',
          costovertebral_t4: 'not_tested',
          costovertebral_t9: 'not_tested',
          costovertebral_umbilicus: 'not_tested',
          costovertebral_expansion_comments: ''
        });
      }
    });


    this.romForm.get('shoulder_arrom')?.valueChanges.subscribe(value => {
      this.showShoulderAromFields = value === 'yes';
      if (!this.showShoulderAromFields) {
        this.romForm.patchValue({
          shoulder_apply_to_all: '',
          shoulder_flexion_right: 'not_tested',
          shoulder_flexion_left: 'not_tested',
          shoulder_scaption_right: 'not_tested',
          shoulder_scaption_left: 'not_tested',
          shoulder_abduction_right: 'not_tested',
          shoulder_abduction_left: 'not_tested',
          shoulder_extension_right: 'not_tested',
          shoulder_extension_left: 'not_tested',
          shoulder_functional_er_reach_right: 'not_tested',
          shoulder_functional_er_reach_left: 'not_tested',
          shoulder_functional_ir_reach_right: 'not_tested',
          shoulder_functional_ir_reach_left: 'not_tested',
          shoulder_er_neutral_right: 'not_tested',
          shoulder_er_neutral_left: 'not_tested',
          shoulder_ir_neutral_right: 'not_tested',
          shoulder_ir_neutral_left: 'not_tested',
          shoulder_horizontal_abduction_right: 'not_tested',
          shoulder_horizontal_abduction_left: 'not_tested',
          shoulder_horizontal_adduction_right: 'not_tested',
          shoulder_horizontal_adduction_left: 'not_tested'
        });
      }
    });

    // Shoulder AROM Apply to All
    this.romForm.get('shoulder_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          shoulder_flexion_right: value,
          shoulder_flexion_left: value,
          shoulder_scaption_right: value,
          shoulder_scaption_left: value,
          shoulder_abduction_right: value,
          shoulder_abduction_left: value,
          shoulder_extension_right: value,
          shoulder_extension_left: value,
          shoulder_functional_er_reach_right: value,
          shoulder_functional_er_reach_left: value,
          shoulder_functional_ir_reach_right: value,
          shoulder_functional_ir_reach_left: value,
          shoulder_er_neutral_right: value,
          shoulder_er_neutral_left: value,
          shoulder_ir_neutral_right: value,
          shoulder_ir_neutral_left: value,
          shoulder_horizontal_abduction_right: value,
          shoulder_horizontal_abduction_left: value,
          shoulder_horizontal_adduction_right: value,
          shoulder_horizontal_adduction_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('shoulder_prom')?.valueChanges.subscribe(value => {
      this.showShoulderPromFields = value === 'yes';
      if (!this.showShoulderPromFields) {
        this.romForm.patchValue({
          shoulder_prom_apply_to_all: '',
          shoulder_prom_flexion_right: 'not_tested',
          shoulder_prom_flexion_right_endfeel: 'not_tested',
          shoulder_prom_flexion_left: 'not_tested',
          shoulder_prom_flexion_left_endfeel: 'not_tested',
          shoulder_prom_scaption_right: 'not_tested',
          shoulder_prom_scaption_right_endfeel: 'not_tested',
          shoulder_prom_scaption_left: 'not_tested',
          shoulder_prom_scaption_left_endfeel: 'not_tested',
          shoulder_prom_abduction_right: 'not_tested',
          shoulder_prom_abduction_right_endfeel: 'not_tested',
          shoulder_prom_abduction_left: 'not_tested',
          shoulder_prom_abduction_left_endfeel: 'not_tested',
          shoulder_prom_extension_right: 'not_tested',
          shoulder_prom_extension_right_endfeel: 'not_tested',
          shoulder_prom_extension_left: 'not_tested',
          shoulder_prom_extension_left_endfeel: 'not_tested',
          shoulder_prom_er_neutral_right: 'not_tested',
          shoulder_prom_er_neutral_right_endfeel: 'not_tested',
          shoulder_prom_er_neutral_left: 'not_tested',
          shoulder_prom_er_neutral_left_endfeel: 'not_tested',
          shoulder_prom_ir_neutral_right: 'not_tested',
          shoulder_prom_ir_neutral_right_endfeel: 'not_tested',
          shoulder_prom_ir_neutral_left: 'not_tested',
          shoulder_prom_ir_neutral_left_endfeel: 'not_tested',
          shoulder_prom_er_scapular_plane_right: 'not_tested',
          shoulder_prom_er_scapular_plane_right_endfeel: 'not_tested',
          shoulder_prom_er_scapular_plane_left: 'not_tested',
          shoulder_prom_er_scapular_plane_left_endfeel: 'not_tested',
          shoulder_prom_ir_scapular_plane_right: 'not_tested',
          shoulder_prom_ir_scapular_plane_right_endfeel: 'not_tested',
          shoulder_prom_ir_scapular_plane_left: 'not_tested',
          shoulder_prom_ir_scapular_plane_left_endfeel: 'not_tested',
          shoulder_prom_er_90_degrees_abduction_right: 'not_tested',
          shoulder_prom_er_90_degrees_abduction_right_endfeel: 'not_tested',
          shoulder_prom_er_90_degrees_abduction_left: 'not_tested',
          shoulder_prom_er_90_degrees_abduction_left_endfeel: 'not_tested',
          shoulder_prom_ir_90_degrees_abduction_right: 'not_tested',
          shoulder_prom_ir_90_degrees_abduction_right_endfeel: 'not_tested',
          shoulder_prom_ir_90_degrees_abduction_left: 'not_tested',
          shoulder_prom_ir_90_degrees_abduction_left_endfeel: 'not_tested',
          shoulder_prom_ir_sleeper_stretch_right: 'not_tested',
          shoulder_prom_ir_sleeper_stretch_right_endfeel: 'not_tested',
          shoulder_prom_ir_sleeper_stretch_left: 'not_tested',
          shoulder_prom_ir_sleeper_stretch_left_endfeel: 'not_tested',
          shoulder_prom_horizontal_abduction_right: 'not_tested',
          shoulder_prom_horizontal_abduction_right_endfeel: 'not_tested',
          shoulder_prom_horizontal_abduction_left: 'not_tested',
          shoulder_prom_horizontal_abduction_left_endfeel: 'not_tested',
          shoulder_prom_horizontal_adduction_right: 'not_tested',
          shoulder_prom_horizontal_adduction_right_endfeel: 'not_tested',
          shoulder_prom_horizontal_adduction_left: 'not_tested',
          shoulder_prom_horizontal_adduction_left_endfeel: 'not_tested'
        });
      }
    });

    // Shoulder PROM Apply to All
    this.romForm.get('shoulder_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          shoulder_prom_flexion_right: value,
          shoulder_prom_flexion_left: value,
          shoulder_prom_scaption_right: value,
          shoulder_prom_scaption_left: value,
          shoulder_prom_abduction_right: value,
          shoulder_prom_abduction_left: value,
          shoulder_prom_extension_right: value,
          shoulder_prom_extension_left: value,
          shoulder_prom_er_neutral_right: value,
          shoulder_prom_er_neutral_left: value,
          shoulder_prom_ir_neutral_right: value,
          shoulder_prom_ir_neutral_left: value,
          shoulder_prom_er_scapular_plane_right: value,
          shoulder_prom_er_scapular_plane_left: value,
          shoulder_prom_ir_scapular_plane_right: value,
          shoulder_prom_ir_scapular_plane_left: value,
          shoulder_prom_er_90_degrees_abduction_right: value,
          shoulder_prom_er_90_degrees_abduction_left: value,
          shoulder_prom_ir_90_degrees_abduction_right: value,
          shoulder_prom_ir_90_degrees_abduction_left: value,
          shoulder_prom_ir_sleeper_stretch_right: value,
          shoulder_prom_ir_sleeper_stretch_left: value,
          shoulder_prom_horizontal_abduction_right: value,
          shoulder_prom_horizontal_abduction_left: value,
          shoulder_prom_horizontal_adduction_right: value,
          shoulder_prom_horizontal_adduction_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('elbow_arrom')?.valueChanges.subscribe(value => {
      this.showElbowAromFields = value === 'yes';
      if (!this.showElbowAromFields) {
        this.romForm.patchValue({
          elbow_arrom_apply_to_all: '',
          elbow_arrom_flexion_right: 'not_tested',
          elbow_arrom_flexion_left: 'not_tested',
          elbow_arrom_extension_right: 'not_tested',
          elbow_arrom_extension_left: 'not_tested',
          elbow_arrom_pronation_right: 'not_tested',
          elbow_arrom_pronation_left: 'not_tested',
          elbow_arrom_supination_right: 'not_tested',
          elbow_arrom_supination_left: 'not_tested'
        });
      }
    });

    // Elbow AROM Apply to All
    this.romForm.get('elbow_arrom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          elbow_arrom_flexion_right: value,
          elbow_arrom_flexion_left: value,
          elbow_arrom_extension_right: value,
          elbow_arrom_extension_left: value,
          elbow_arrom_pronation_right: value,
          elbow_arrom_pronation_left: value,
          elbow_arrom_supination_right: value,
          elbow_arrom_supination_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('elbow_prom')?.valueChanges.subscribe(value => {
      this.showElbowPromFields = value === 'yes';
      if (!this.showElbowPromFields) {
        this.romForm.patchValue({
          elbow_prom_apply_to_all: '',
          elbow_prom_extension_right: 'not_tested',
          elbow_prom_extension_right_endfeel: 'not_tested',
          elbow_prom_extension_left: 'not_tested',
          elbow_prom_extension_left_endfeel: 'not_tested',
          elbow_prom_flexion_right: 'not_tested',
          elbow_prom_flexion_right_endfeel: 'not_tested',
          elbow_prom_flexion_left: 'not_tested',
          elbow_prom_flexion_left_endfeel: 'not_tested',
          elbow_prom_supination_right: 'not_tested',
          elbow_prom_supination_right_endfeel: 'not_tested',
          elbow_prom_supination_left: 'not_tested',
          elbow_prom_supination_left_endfeel: 'not_tested',
          elbow_prom_pronation_right: 'not_tested',
          elbow_prom_pronation_right_endfeel: 'not_tested',
          elbow_prom_pronation_left: 'not_tested',
          elbow_prom_pronation_left_endfeel: 'not_tested'
        });
      }
    });

    // Elbow PROM Apply to All
    this.romForm.get('elbow_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          elbow_prom_extension_right: value,
          elbow_prom_extension_left: value,
          elbow_prom_flexion_right: value,
          elbow_prom_flexion_left: value,
          elbow_prom_supination_right: value,
          elbow_prom_supination_left: value,
          elbow_prom_pronation_right: value,
          elbow_prom_pronation_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('wrist_arrom')?.valueChanges.subscribe(value => {
      this.showWristAromFields = value === 'yes';
      if (value === 'no') {
        this.romForm.patchValue({
          wrist_arrom_apply_to_all: '',
          extension_right: 'not_tested',
          extension_left: 'not_tested',
          flexion_right: 'not_tested',
          flexion_left: 'not_tested',
          radial_deviation_right: 'not_tested',
          radial_deviation_left: 'not_tested',
          ulnar_deviation_right: 'not_tested',
          ulnar_deviation_left: 'not_tested'
        }, { emitEvent: false });
      }
    });

    this.romForm.get('wrist_arrom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          extension_right: value,
          extension_left: value,
          flexion_right: value,
          flexion_left: value,
          radial_deviation_right: value,
          radial_deviation_left: value,
          ulnar_deviation_right: value,
          ulnar_deviation_left: value
        }, { emitEvent: false });
      }
    });
    this.romForm.get('wrist_prom')?.valueChanges.subscribe(value => {
      this.showWristPromFields = value === 'yes';
      if (value === 'no') {
        this.romForm.patchValue({
          wrist_prom_apply_to_all: '',
          wrist_prom_extension_right: 'not_tested',
          wrist_prom_extension_right_endfeel: 'not_tested',
          wrist_prom_extension_left: 'not_tested',
          wrist_prom_extension_left_endfeel: 'not_tested',
          wrist_prom_flexion_right: 'not_tested',
          wrist_prom_flexion_right_endfeel: 'not_tested',
          wrist_prom_flexion_left: 'not_tested',
          wrist_prom_flexion_left_endfeel: 'not_tested',
          wrist_prom_radial_deviation_right: 'not_tested',
          wrist_prom_radial_deviation_right_endfeel: 'not_tested',
          wrist_prom_radial_deviation_left: 'not_tested',
          wrist_prom_radial_deviation_left_endfeel: 'not_tested',
          wrist_prom_ulnar_deviation_right: 'not_tested',
          wrist_prom_ulnar_deviation_right_endfeel: 'not_tested',
          wrist_prom_ulnar_deviation_left: 'not_tested',
          wrist_prom_ulnar_deviation_left_endfeel: 'not_tested'
        }, { emitEvent: false });
      }
    });

    this.romForm.get('wrist_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          wrist_prom_extension_right: value,
          wrist_prom_extension_left: value,
          wrist_prom_flexion_right: value,
          wrist_prom_flexion_left: value,
          wrist_prom_radial_deviation_right: value,
          wrist_prom_radial_deviation_left: value,
          wrist_prom_ulnar_deviation_right: value,
          wrist_prom_ulnar_deviation_left: value
        }, { emitEvent: false });
      }
    });
    this.romForm.get('hand_arrom_prom')?.valueChanges.subscribe(value => {
      this.showHandAromPromFields = value === 'yes';
      if (value === 'no') {
        this.romForm.patchValue({
          calculate_total_rom: false,
          thumb_arrom_prom: false,
          index_finger_arrom_prom: false,
          middle_finger_arrom_prom: false,
          ring_finger_arrom_prom: false,
          small_finger_arrom_prom: false
        }, { emitEvent: false });
      }
    });

    this.romForm.get('thumb_arrom_prom')?.valueChanges.subscribe(value => {
      this.showThumbAromPromFields = value === true;
      if (value === false) {
        this.romForm.patchValue({
          thumb_cmc_palmar_abduction_right_arom: 'not_tested',
          thumb_cmc_palmar_abduction_right_prom: 'not_tested',
          thumb_cmc_palmar_abduction_left_arom: 'not_tested',
          thumb_cmc_palmar_abduction_left_prom: 'not_tested',
          thumb_cmc_radial_abduction_right_arom: 'not_tested',
          thumb_cmc_radial_abduction_right_prom: 'not_tested',
          thumb_cmc_radial_abduction_left_arom: 'not_tested',
          thumb_cmc_radial_abduction_left_prom: 'not_tested',
          thumb_cmc_adduction_right_arom: 'not_tested',
          thumb_cmc_adduction_right_prom: 'not_tested',
          thumb_cmc_adduction_left_arom: 'not_tested',
          thumb_cmc_adduction_left_prom: 'not_tested',
          thumb_cmc_extension_right_arom: 'not_tested',
          thumb_cmc_extension_right_prom: 'not_tested',
          thumb_cmc_extension_left_arom: 'not_tested',
          thumb_cmc_extension_left_prom: 'not_tested',
          thumb_cmc_flexion_right_arom: 'not_tested',
          thumb_cmc_flexion_right_prom: 'not_tested',
          thumb_cmc_flexion_left_arom: 'not_tested',
          thumb_cmc_flexion_left_prom: 'not_tested',
          thumb_cmc_total_motion_right_arom: '',
          thumb_cmc_total_motion_right_prom: '',
          thumb_cmc_total_motion_left_arom: '',
          thumb_cmc_total_motion_left_prom: '',
          thumb_mp_extension_right_arom: 'not_tested',
          thumb_mp_extension_right_prom: 'not_tested',
          thumb_mp_extension_left_arom: 'not_tested',
          thumb_mp_extension_left_prom: 'not_tested',
          thumb_mp_flexion_right_arom: 'not_tested',
          thumb_mp_flexion_right_prom: 'not_tested',
          thumb_mp_flexion_left_arom: 'not_tested',
          thumb_mp_flexion_left_prom: 'not_tested',
          thumb_mp_total_motion_right_arom: '',
          thumb_mp_total_motion_right_prom: '',
          thumb_mp_total_motion_left_arom: '',
          thumb_mp_total_motion_left_prom: '',
          thumb_ip_extension_right_arom: 'not_tested',
          thumb_ip_extension_right_prom: 'not_tested',
          thumb_ip_extension_left_arom: 'not_tested',
          thumb_ip_extension_left_prom: 'not_tested',
          thumb_ip_flexion_right_arom: 'not_tested',
          thumb_ip_flexion_right_prom: 'not_tested',
          thumb_ip_flexion_left_arom: 'not_tested',
          thumb_ip_flexion_left_prom: 'not_tested',
          thumb_ip_total_motion_right_arom: '',
          thumb_ip_total_motion_right_prom: '',
          thumb_ip_total_motion_left_arom: '',
          thumb_ip_total_motion_left_prom: '',
          thumb_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('index_finger_arrom_prom')?.valueChanges.subscribe(value => {
      this.showIndexFingerAromPromFields = value === true;
      if (value === false) {
        this.romForm.patchValue({
          index_mp_adduction_right_arom: 'not_tested',
          index_mp_adduction_right_prom: 'not_tested',
          index_mp_adduction_left_arom: 'not_tested',
          index_mp_adduction_left_prom: 'not_tested',
          index_mp_extension_right_arom: 'not_tested',
          index_mp_extension_right_prom: 'not_tested',
          index_mp_extension_left_arom: 'not_tested',
          index_mp_extension_left_prom: 'not_tested',
          index_mp_flexion_right_arom: 'not_tested',
          index_mp_flexion_right_prom: 'not_tested',
          index_mp_flexion_left_arom: 'not_tested',
          index_mp_flexion_left_prom: 'not_tested',
          index_mp_total_motion_right_arom: '',
          index_mp_total_motion_right_prom: '',
          index_mp_total_motion_left_arom: '',
          index_mp_total_motion_left_prom: '',
          index_pip_extension_right_arom: 'not_tested',
          index_pip_extension_right_prom: 'not_tested',
          index_pip_extension_left_arom: 'not_tested',
          index_pip_extension_left_prom: 'not_tested',
          index_pip_flexion_right_arom: 'not_tested',
          index_pip_flexion_right_prom: 'not_tested',
          index_pip_flexion_left_arom: 'not_tested',
          index_pip_flexion_left_prom: 'not_tested',
          index_pip_total_motion_right_arom: '',
          index_pip_total_motion_right_prom: '',
          index_pip_total_motion_left_arom: '',
          index_pip_total_motion_left_prom: '',
          index_dip_extension_right_arom: 'not_tested',
          index_dip_extension_right_prom: 'not_tested',
          index_dip_extension_left_arom: 'not_tested',
          index_dip_extension_left_prom: 'not_tested',
          index_dip_flexion_right_arom: 'not_tested',
          index_dip_flexion_right_prom: 'not_tested',
          index_dip_flexion_left_arom: 'not_tested',
          index_dip_flexion_left_prom: 'not_tested',
          index_dip_total_motion_right_arom: '',
          index_dip_total_motion_right_prom: '',
          index_dip_total_motion_left_arom: '',
          index_dip_total_motion_left_prom: '',
          index_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('middle_finger_arrom_prom')?.valueChanges.subscribe(value => {
      this.showMiddleFingerAromPromFields = value === true;
      if (value === false) {
        this.romForm.patchValue({
          middle_mp_adduction_right_arom: 'not_tested',
          middle_mp_adduction_right_prom: 'not_tested',
          middle_mp_adduction_left_arom: 'not_tested',
          middle_mp_adduction_left_prom: 'not_tested',
          middle_mp_extension_right_arom: 'not_tested',
          middle_mp_extension_right_prom: 'not_tested',
          middle_mp_extension_left_arom: 'not_tested',
          middle_mp_extension_left_prom: 'not_tested',
          middle_mp_flexion_right_arom: 'not_tested',
          middle_mp_flexion_right_prom: 'not_tested',
          middle_mp_flexion_left_arom: 'not_tested',
          middle_mp_flexion_left_prom: 'not_tested',
          middle_mp_total_motion_right_arom: '',
          middle_mp_total_motion_right_prom: '',
          middle_mp_total_motion_left_arom: '',
          middle_mp_total_motion_left_prom: '',
          middle_pip_extension_right_arom: 'not_tested',
          middle_pip_extension_right_prom: 'not_tested',
          middle_pip_extension_left_arom: 'not_tested',
          middle_pip_extension_left_prom: 'not_tested',
          middle_pip_flexion_right_arom: 'not_tested',
          middle_pip_flexion_right_prom: 'not_tested',
          middle_pip_flexion_left_arom: 'not_tested',
          middle_pip_flexion_left_prom: 'not_tested',
          middle_pip_total_motion_right_arom: '',
          middle_pip_total_motion_right_prom: '',
          middle_pip_total_motion_left_arom: '',
          middle_pip_total_motion_left_prom: '',
          middle_dip_extension_right_arom: 'not_tested',
          middle_dip_extension_right_prom: 'not_tested',
          middle_dip_extension_left_arom: 'not_tested',
          middle_dip_extension_left_prom: 'not_tested',
          middle_dip_flexion_right_arom: 'not_tested',
          middle_dip_flexion_right_prom: 'not_tested',
          middle_dip_flexion_left_arom: 'not_tested',
          middle_dip_flexion_left_prom: 'not_tested',
          middle_dip_total_motion_right_arom: '',
          middle_dip_total_motion_right_prom: '',
          middle_dip_total_motion_left_arom: '',
          middle_dip_total_motion_left_prom: '',
          middle_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('ring_finger_arrom_prom')?.valueChanges.subscribe(value => {
      this.showRingFingerAromPromFields = value === true;
      if (value === false) {
        this.romForm.patchValue({
          ring_mp_adduction_right_arom: 'not_tested',
          ring_mp_adduction_right_prom: 'not_tested',
          ring_mp_adduction_left_arom: 'not_tested',
          ring_mp_adduction_left_prom: 'not_tested',
          ring_mp_extension_right_arom: 'not_tested',
          ring_mp_extension_right_prom: 'not_tested',
          ring_mp_extension_left_arom: 'not_tested',
          ring_mp_extension_left_prom: 'not_tested',
          ring_mp_flexion_right_arom: 'not_tested',
          ring_mp_flexion_right_prom: 'not_tested',
          ring_mp_flexion_left_arom: 'not_tested',
          ring_mp_flexion_left_prom: 'not_tested',
          ring_mp_total_motion_right_arom: '',
          ring_mp_total_motion_right_prom: '',
          ring_mp_total_motion_left_arom: '',
          ring_mp_total_motion_left_prom: '',
          ring_pip_extension_right_arom: 'not_tested',
          ring_pip_extension_right_prom: 'not_tested',
          ring_pip_extension_left_arom: 'not_tested',
          ring_pip_extension_left_prom: 'not_tested',
          ring_pip_flexion_right_arom: 'not_tested',
          ring_pip_flexion_right_prom: 'not_tested',
          ring_pip_flexion_left_arom: 'not_tested',
          ring_pip_flexion_left_prom: 'not_tested',
          ring_pip_total_motion_right_arom: '',
          ring_pip_total_motion_right_prom: '',
          ring_pip_total_motion_left_arom: '',
          ring_pip_total_motion_left_prom: '',
          ring_dip_extension_right_arom: 'not_tested',
          ring_dip_extension_right_prom: 'not_tested',
          ring_dip_extension_left_arom: 'not_tested',
          ring_dip_extension_left_prom: 'not_tested',
          ring_dip_flexion_right_arom: 'not_tested',
          ring_dip_flexion_right_prom: 'not_tested',
          ring_dip_flexion_left_arom: 'not_tested',
          ring_dip_flexion_left_prom: 'not_tested',
          ring_dip_total_motion_right_arom: '',
          ring_dip_total_motion_right_prom: '',
          ring_dip_total_motion_left_arom: '',
          ring_dip_total_motion_left_prom: '',
          ring_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('small_finger_arrom_prom')?.valueChanges.subscribe(value => {
      this.showSmallFingerAromPromFields = value === true;
      if (value === false) {
        this.romForm.patchValue({
          small_mp_adduction_right_arom: 'not_tested',
          small_mp_adduction_right_prom: 'not_tested',
          small_mp_adduction_left_arom: 'not_tested',
          small_mp_adduction_left_prom: 'not_tested',
          small_mp_extension_right_arom: 'not_tested',
          small_mp_extension_right_prom: 'not_tested',
          small_mp_extension_left_arom: 'not_tested',
          small_mp_extension_left_prom: 'not_tested',
          small_mp_flexion_right_arom: 'not_tested',
          small_mp_flexion_right_prom: 'not_tested',
          small_mp_flexion_left_arom: 'not_tested',
          small_mp_flexion_left_prom: 'not_tested',
          small_mp_total_motion_right_arom: '',
          small_mp_total_motion_right_prom: '',
          small_mp_total_motion_left_arom: '',
          small_mp_total_motion_left_prom: '',
          small_pip_extension_right_arom: 'not_tested',
          small_pip_extension_right_prom: 'not_tested',
          small_pip_extension_left_arom: 'not_tested',
          small_pip_extension_left_prom: 'not_tested',
          small_pip_flexion_right_arom: 'not_tested',
          small_pip_flexion_right_prom: 'not_tested',
          small_pip_flexion_left_arom: 'not_tested',
          small_pip_flexion_left_prom: 'not_tested',
          small_pip_total_motion_right_arom: '',
          small_pip_total_motion_right_prom: '',
          small_pip_total_motion_left_arom: '',
          small_pip_total_motion_left_prom: '',
          small_dip_extension_right_arom: 'not_tested',
          small_dip_extension_right_prom: 'not_tested',
          small_dip_extension_left_arom: 'not_tested',
          small_dip_extension_left_prom: 'not_tested',
          small_dip_flexion_right_arom: 'not_tested',
          small_dip_flexion_right_prom: 'not_tested',
          small_dip_flexion_left_arom: 'not_tested',
          small_dip_flexion_left_prom: 'not_tested',
          small_dip_total_motion_right_arom: '',
          small_dip_total_motion_right_prom: '',
          small_dip_total_motion_left_arom: '',
          small_dip_total_motion_left_prom: '',
          small_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('thoracic_arrom_sitting_with_passive_overpressure')?.valueChanges.subscribe(value => {
      this.showThoracicAromSittingWithPassiveOverpressureFields = value === 'yes';
      if (!this.showThoracicAromSittingWithPassiveOverpressureFields) {
        this.romForm.patchValue({
          thoracic_arrom_sitting_apply_to_all: '',
          thoracic_arrom_sitting_forward_bending: 'not_tested',
          thoracic_arrom_sitting_backward_bending: 'not_tested',
          thoracic_arrom_sitting_right_rotation: 'not_tested',
          thoracic_arrom_sitting_left_rotation: 'not_tested',
          thoracic_arrom_sitting_right_side_bending: 'not_tested',
          thoracic_arrom_sitting_left_side_bending: 'not_tested'
        });
      }
    });

    // Thoracic AROM Sitting with Passive Overpressure Apply to All
    this.romForm.get('thoracic_arrom_sitting_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          thoracic_arrom_sitting_forward_bending: value,
          thoracic_arrom_sitting_backward_bending: value,
          thoracic_arrom_sitting_right_rotation: value,
          thoracic_arrom_sitting_left_rotation: value,
          thoracic_arrom_sitting_right_side_bending: value,
          thoracic_arrom_sitting_left_side_bending: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('thoracic_arrom_standing')?.valueChanges.subscribe(value => {
      this.showThoracicAromStandingFields = value === 'yes';
      if (!this.showThoracicAromStandingFields) {
        this.romForm.patchValue({
          thoracic_arrom_standing_apply_to_all: '',
          thoracic_arrom_standing_forward_bending: 'not_tested',
          thoracic_arrom_standing_backward_bending: 'not_tested',
          thoracic_arrom_standing_right_rotation: 'not_tested',
          thoracic_arrom_standing_left_rotation: 'not_tested',
          thoracic_arrom_standing_right_side_bending: 'not_tested',
          thoracic_arrom_standing_left_side_bending: 'not_tested'
        });
      }
    });
    this.romForm.get('thoracic_arrom_standing_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          thoracic_arrom_standing_forward_bending: value,
          thoracic_arrom_standing_backward_bending: value,
          thoracic_arrom_standing_right_rotation: value,
          thoracic_arrom_standing_left_rotation: value,
          thoracic_arrom_standing_right_side_bending: value,
          thoracic_arrom_standing_left_side_bending: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('lumbar_arrom')?.valueChanges.subscribe(value => {
      this.showLumbarAromFields = value === 'yes';
      if (!this.showLumbarAromFields) {
        this.romForm.patchValue({
          lumbar_arrom_apply_to_all: '',
          lumbar_arrom_forward_bending: 'not_tested',
          lumbar_arrom_backward_bending: 'not_tested',
          lumbar_arrom_right_rotation: 'not_tested',
          lumbar_arrom_left_rotation: 'not_tested',
          lumbar_arrom_right_side_bending: 'not_tested',
          lumbar_arrom_left_side_bending: 'not_tested',
          lumbar_arrom_comments: ''
        });
      }
    });


    this.romForm.get('hip_arrom')?.valueChanges.subscribe(value => {
      this.showHipAromFields = value === 'yes';
      if (!this.showHipAromFields) {
        this.romForm.patchValue({
          hip_flexion_right: 'not_tested',
          hip_flexion_left: 'not_tested',
          hip_extension_right: 'not_tested',
          hip_extension_left: 'not_tested',
          hip_abduction_right: 'not_tested',
          hip_abduction_left: 'not_tested',
          hip_adduction_right: 'not_tested',
          hip_adduction_left: 'not_tested',
          hip_internal_rotation_right: 'not_tested',
          hip_internal_rotation_left: 'not_tested',
          hip_external_rotation_right: 'not_tested',
          hip_external_rotation_left: 'not_tested',
          hip_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('hip_prom')?.valueChanges.subscribe(value => {
      this.showHipPromFields = value === 'yes';
      if (value === 'no') {
        this.romForm.patchValue({
          hip_prom_apply_to_all: '',
          hip_prom_flexion_right: 'not_tested',
          hip_prom_flexion_right_endfeel: 'not_tested',
          hip_prom_flexion_left: 'not_tested',
          hip_prom_flexion_left_endfeel: 'not_tested',

          hip_prom_extension_right: 'not_tested',
          hip_prom_extension_right_endfeel: 'not_tested',
          hip_prom_extension_left: 'not_tested',
          hip_prom_extension_left_endfeel: 'not_tested',

          hip_prom_abduction_right: 'not_tested',
          hip_prom_abduction_right_endfeel: 'not_tested',
          hip_prom_abduction_left: 'not_tested',
          hip_prom_abduction_left_endfeel: 'not_tested',

          hip_prom_adduction_right: 'not_tested',
          hip_prom_adduction_right_endfeel: 'not_tested',
          hip_prom_adduction_left: 'not_tested',
          hip_prom_adduction_left_endfeel: 'not_tested',

          hip_prom_internal_rotation_right: 'not_tested',
          hip_prom_internal_rotation_right_endfeel: 'not_tested',
          hip_prom_internal_rotation_left: 'not_tested',
          hip_prom_internal_rotation_left_endfeel: 'not_tested',

          hip_prom_external_rotation_right: 'not_tested',
          hip_prom_external_rotation_right_endfeel: 'not_tested',
          hip_prom_external_rotation_left: 'not_tested',
          hip_prom_external_rotation_left_endfeel: 'not_tested'
        })
      }
    });

    this.romForm.get('hip_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          hip_prom_flexion_right: value,
          hip_prom_flexion_right_endfeel: value,
          hip_prom_flexion_left: value,
          hip_prom_flexion_left_endfeel: value,

          hip_prom_extension_right: value,
          hip_prom_extension_right_endfeel: value,
          hip_prom_extension_left: value,
          hip_prom_extension_left_endfeel: value,

          hip_prom_abduction_right: value,
          hip_prom_abduction_right_endfeel: value,
          hip_prom_abduction_left: value,
          hip_prom_abduction_left_endfeel: value,

          hip_prom_adduction_right: value,
          hip_prom_adduction_right_endfeel: value,
          hip_prom_adduction_left: value,
          hip_prom_adduction_left_endfeel: value,

          hip_prom_internal_rotation_right: value,
          hip_prom_internal_rotation_right_endfeel: value,
          hip_prom_internal_rotation_left: value,
          hip_prom_internal_rotation_left_endfeel: value,

          hip_prom_external_rotation_right: value,
          hip_prom_external_rotation_right_endfeel: value,
          hip_prom_external_rotation_left: value,
          hip_prom_external_rotation_left_endfeel: value
        }, { emitEvent: false });
      }
    });
    this.romForm.get('knee_arrom')?.valueChanges.subscribe(value => {
      this.showKneeAromFields = value === 'yes';
      if (!this.showKneeAromFields) {
        this.romForm.patchValue({
          knee_arom_apply_to_all: '',
          knee_flexion_right: 'not_tested',
          knee_flexion_left: 'not_tested',
          knee_extension_right: 'not_tested',
          knee_extension_left: 'not_tested',
          knee_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    // Knee AROM Apply to All
    this.romForm.get('knee_arom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          knee_flexion_right: value,
          knee_flexion_left: value,
          knee_extension_right: value,
          knee_extension_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('knee_prom')?.valueChanges.subscribe(value => {
      this.showKneePromFields = value === 'yes';
    });

    this.romForm.get('ankle_arrom')?.valueChanges.subscribe(value => {
      this.showAnkleAromFields = value === 'yes';
      if (!this.showAnkleAromFields) {
        this.romForm.patchValue({
          ankle_arom_apply_to_all: '',
          ankle_dorsiflexion_0_knee_flexion_right: 'not_tested',
          ankle_dorsiflexion_0_knee_flexion_left: 'not_tested',
          ankle_dorsiflexion_90_knee_flexion_right: 'not_tested',
          ankle_dorsiflexion_90_knee_flexion_left: 'not_tested',
          ankle_plantarflexion_right: 'not_tested',
          ankle_plantarflexion_left: 'not_tested',
          ankle_inversion_right: 'not_tested',
          ankle_inversion_left: 'not_tested',
          ankle_eversion_right: 'not_tested',
          ankle_eversion_left: 'not_tested',
          ankle_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    // Ankle AROM Apply to All
    this.romForm.get('ankle_arom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          ankle_dorsiflexion_0_knee_flexion_right: value,
          ankle_dorsiflexion_0_knee_flexion_left: value,
          ankle_dorsiflexion_90_knee_flexion_right: value,
          ankle_dorsiflexion_90_knee_flexion_left: value,
          ankle_plantarflexion_right: value,
          ankle_plantarflexion_left: value,
          ankle_inversion_right: value,
          ankle_inversion_left: value,
          ankle_eversion_right: value,
          ankle_eversion_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('ankle_prom')?.valueChanges.subscribe(value => {
      this.showAnklePromFields = value === 'yes';
      if (!this.showAnklePromFields) {
        this.romForm.patchValue({
          ankle_prom_apply_to_all: '',
          ankle_prom_dorsiflexion_0_knee_flexion_right: 'not_tested',
          ankle_prom_dorsiflexion_0_knee_flexion_right_endfeel: 'not_tested',
          ankle_prom_dorsiflexion_0_knee_flexion_left: 'not_tested',
          ankle_prom_dorsiflexion_0_knee_flexion_left_endfeel: 'not_tested',
          ankle_prom_dorsiflexion_90_knee_flexion_right: 'not_tested',
          ankle_prom_dorsiflexion_90_knee_flexion_right_endfeel: 'not_tested',
          ankle_prom_dorsiflexion_90_knee_flexion_left: 'not_tested',
          ankle_prom_dorsiflexion_90_knee_flexion_left_endfeel: 'not_tested',
          ankle_prom_plantarflexion_right: 'not_tested',
          ankle_prom_plantarflexion_right_endfeel: 'not_tested',
          ankle_prom_plantarflexion_left: 'not_tested',
          ankle_prom_plantarflexion_left_endfeel: 'not_tested',
          ankle_prom_inversion_right: 'not_tested',
          ankle_prom_inversion_right_endfeel: 'not_tested',
          ankle_prom_inversion_left: 'not_tested',
          ankle_prom_inversion_left_endfeel: 'not_tested',
          ankle_prom_eversion_right: 'not_tested',
          ankle_prom_eversion_right_endfeel: 'not_tested',
          ankle_prom_eversion_left: 'not_tested',
          ankle_prom_eversion_left_endfeel: 'not_tested',
          ankle_prom_comments: ''
        }, { emitEvent: false });
      }
    });

    // Ankle PROM Apply to All - applies only to measurement fields, not endfeel
    this.romForm.get('ankle_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          ankle_prom_dorsiflexion_0_knee_flexion_right: value,
          ankle_prom_dorsiflexion_0_knee_flexion_left: value,
          ankle_prom_dorsiflexion_90_knee_flexion_right: value,
          ankle_prom_dorsiflexion_90_knee_flexion_left: value,
          ankle_prom_plantarflexion_right: value,
          ankle_prom_plantarflexion_left: value,
          ankle_prom_inversion_right: value,
          ankle_prom_inversion_left: value,
          ankle_prom_eversion_right: value,
          ankle_prom_eversion_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('fst_mtp_arrom')?.valueChanges.subscribe(value => {
      this.show1stMtpAromFields = value === 'yes';
      if (!this.show1stMtpAromFields) {
        this.romForm.patchValue({
          fst_mtp_arom_apply_to_all: '',
          fst_mtp_flexion_right: 'not_tested',
          fst_mtp_flexion_left: 'not_tested',
          fst_mtp_extension_right: 'not_tested',
          fst_mtp_extension_left: 'not_tested',
          fst_mtp_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    // 1st MTP AROM Apply to All
    this.romForm.get('fst_mtp_arom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          fst_mtp_flexion_right: value,
          fst_mtp_flexion_left: value,
          fst_mtp_extension_right: value,
          fst_mtp_extension_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('fst_mtp_prom')?.valueChanges.subscribe(value => {
      this.show1stMtpPromFields = value === 'yes';
    });

    this.romForm.get('fst_ip_arrom')?.valueChanges.subscribe(value => {
      this.show1stIpAromFields = value === 'yes';
      if (!this.show1stIpAromFields) {
        this.romForm.patchValue({
          fst_ip_arom_apply_to_all: '',
          fst_ip_flexion_right: 'not_tested',
          fst_ip_flexion_left: 'not_tested',
          fst_ip_extension_right: 'not_tested',
          fst_ip_extension_left: 'not_tested',
          fst_ip_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    // 1st IP AROM Apply to All
    this.romForm.get('fst_ip_arom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          fst_ip_flexion_right: value,
          fst_ip_flexion_left: value,
          fst_ip_extension_right: value,
          fst_ip_extension_left: value
        }, { emitEvent: false });
      }
    });

    this.romForm.get('fst_ip_prom')?.valueChanges.subscribe(value => {
      this.show1stIpPromFields = value === 'yes';
    });

    this.romForm.get('toe_arrom')?.valueChanges.subscribe(value => {
      this.showToeAromFields = value === 'yes';
      if (!this.showToeAromFields) {
        this.romForm.patchValue({
          toe_arom_apply_to_all: '',
          toe_arom_2nd_mtp_flexion_right: 'not_tested',
          toe_arom_2nd_mtp_flexion_left: 'not_tested',
          toe_arom_2nd_mtp_extension_right: 'not_tested',
          toe_arom_2nd_mtp_extension_left: 'not_tested',
          toe_arom_2nd_ip_flexion_right: 'not_tested',
          toe_arom_2nd_ip_flexion_left: 'not_tested',
          toe_arom_2nd_ip_extension_right: 'not_tested',
          toe_arom_2nd_ip_extension_left: 'not_tested',
          toe_arom_3rd_mtp_flexion_right: 'not_tested',
          toe_arom_3rd_mtp_flexion_left: 'not_tested',
          toe_arom_3rd_mtp_extension_right: 'not_tested',
          toe_arom_3rd_mtp_extension_left: 'not_tested',
          toe_arom_3rd_ip_flexion_right: 'not_tested',
          toe_arom_3rd_ip_flexion_left: 'not_tested',
          toe_arom_3rd_ip_extension_right: 'not_tested',
          toe_arom_3rd_ip_extension_left: 'not_tested',
          toe_arom_4th_mtp_flexion_right: 'not_tested',
          toe_arom_4th_mtp_flexion_left: 'not_tested',
          toe_arom_4th_mtp_extension_right: 'not_tested',
          toe_arom_4th_mtp_extension_left: 'not_tested',
          toe_arom_4th_ip_flexion_right: 'not_tested',
          toe_arom_4th_ip_flexion_left: 'not_tested',
          toe_arom_4th_ip_extension_right: 'not_tested',
          toe_arom_4th_ip_extension_left: 'not_tested',
          toe_arom_5th_mtp_flexion_right: 'not_tested',
          toe_arom_5th_mtp_flexion_left: 'not_tested',
          toe_arom_5th_mtp_extension_right: 'not_tested',
          toe_arom_5th_mtp_extension_left: 'not_tested',
          toe_arom_5th_ip_flexion_right: 'not_tested',
          toe_arom_5th_ip_flexion_left: 'not_tested',
          toe_arom_5th_ip_extension_right: 'not_tested',
          toe_arom_5th_ip_extension_left: 'not_tested',
          toe_arrom_comments: ''
        }, { emitEvent: false });
      }
    });

    this.romForm.get('toe_prom')?.valueChanges.subscribe(value => {
      this.showToePromFields = value === 'yes';
      if (!this.showToePromFields) {
        this.romForm.patchValue({
          toe_prom_apply_to_all: '',
          toe_2nd_mtp_flexion_right: 'not_tested',
          toe_2nd_mtp_flexion_right_endfeel: 'not_tested',
          toe_2nd_mtp_flexion_left: 'not_tested',
          toe_2nd_mtp_flexion_left_endfeel: 'not_tested',
          toe_2nd_mtp_extension_right: 'not_tested',
          toe_2nd_mtp_extension_right_endfeel: 'not_tested',
          toe_2nd_mtp_extension_left: 'not_tested',
          toe_2nd_mtp_extension_left_endfeel: 'not_tested',
          toe_2nd_ip_flexion_right: 'not_tested',
          toe_2nd_ip_flexion_right_endfeel: 'not_tested',
          toe_2nd_ip_flexion_left: 'not_tested',
          toe_2nd_ip_flexion_left_endfeel: 'not_tested',
          toe_2nd_ip_extension_right: 'not_tested',
          toe_2nd_ip_extension_right_endfeel: 'not_tested',
          toe_2nd_ip_extension_left: 'not_tested',
          toe_2nd_ip_extension_left_endfeel: 'not_tested',
          toe_3rd_mtp_flexion_right: 'not_tested',
          toe_3rd_mtp_flexion_right_endfeel: 'not_tested',
          toe_3rd_mtp_flexion_left: 'not_tested',
          toe_3rd_mtp_flexion_left_endfeel: 'not_tested',
          toe_3rd_mtp_extension_right: 'not_tested',
          toe_3rd_mtp_extension_right_endfeel: 'not_tested',
          toe_3rd_mtp_extension_left: 'not_tested',
          toe_3rd_mtp_extension_left_endfeel: 'not_tested',
          toe_3rd_ip_flexion_right: 'not_tested',
          toe_3rd_ip_flexion_right_endfeel: 'not_tested',
          toe_3rd_ip_flexion_left: 'not_tested',
          toe_3rd_ip_flexion_left_endfeel: 'not_tested',
          toe_3rd_ip_extension_right: 'not_tested',
          toe_3rd_ip_extension_right_endfeel: 'not_tested',
          toe_3rd_ip_extension_left: 'not_tested',
          toe_3rd_ip_extension_left_endfeel: 'not_tested',
          toe_4th_mtp_flexion_right: 'not_tested',
          toe_4th_mtp_flexion_right_endfeel: 'not_tested',
          toe_4th_mtp_flexion_left: 'not_tested',
          toe_4th_mtp_flexion_left_endfeel: 'not_tested',
          toe_4th_mtp_extension_right: 'not_tested',
          toe_4th_mtp_extension_right_endfeel: 'not_tested',
          toe_4th_mtp_extension_left: 'not_tested',
          toe_4th_mtp_extension_left_endfeel: 'not_tested',
          toe_4th_ip_flexion_right: 'not_tested',
          toe_4th_ip_flexion_right_endfeel: 'not_tested',
          toe_4th_ip_flexion_left: 'not_tested',
          toe_4th_ip_flexion_left_endfeel: 'not_tested',
          toe_4th_ip_extension_right: 'not_tested',
          toe_4th_ip_extension_right_endfeel: 'not_tested',
          toe_4th_ip_extension_left: 'not_tested',
          toe_4th_ip_extension_left_endfeel: 'not_tested',
          toe_5th_mtp_flexion_right: 'not_tested',
          toe_5th_mtp_flexion_right_endfeel: 'not_tested',
          toe_5th_mtp_flexion_left: 'not_tested',
          toe_5th_mtp_flexion_left_endfeel: 'not_tested',
          toe_5th_mtp_extension_right: 'not_tested',
          toe_5th_mtp_extension_right_endfeel: 'not_tested',
          toe_5th_mtp_extension_left: 'not_tested',
          toe_5th_mtp_extension_left_endfeel: 'not_tested',
          toe_5th_ip_flexion_right: 'not_tested',
          toe_5th_ip_flexion_right_endfeel: 'not_tested',
          toe_5th_ip_flexion_left: 'not_tested',
          toe_5th_ip_flexion_left_endfeel: 'not_tested',
          toe_5th_ip_extension_right: 'not_tested',
          toe_5th_ip_extension_right_endfeel: 'not_tested',
          toe_5th_ip_extension_left: 'not_tested',
          toe_5th_ip_extension_left_endfeel: 'not_tested',
          toe_prom_comments: ''
        }, { emitEvent: false });
      }
    });

    // Toe AROM Apply to All
    this.romForm.get('toe_arom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          toe_arom_2nd_mtp_flexion_right: value,
          toe_arom_2nd_mtp_flexion_left: value,
          toe_arom_2nd_mtp_extension_right: value,
          toe_arom_2nd_mtp_extension_left: value,
          toe_arom_2nd_ip_flexion_right: value,
          toe_arom_2nd_ip_flexion_left: value,
          toe_arom_2nd_ip_extension_right: value,
          toe_arom_2nd_ip_extension_left: value,
          toe_arom_3rd_mtp_flexion_right: value,
          toe_arom_3rd_mtp_flexion_left: value,
          toe_arom_3rd_mtp_extension_right: value,
          toe_arom_3rd_mtp_extension_left: value,
          toe_arom_3rd_ip_flexion_right: value,
          toe_arom_3rd_ip_flexion_left: value,
          toe_arom_3rd_ip_extension_right: value,
          toe_arom_3rd_ip_extension_left: value,
          toe_arom_4th_mtp_flexion_right: value,
          toe_arom_4th_mtp_flexion_left: value,
          toe_arom_4th_mtp_extension_right: value,
          toe_arom_4th_mtp_extension_left: value,
          toe_arom_4th_ip_flexion_right: value,
          toe_arom_4th_ip_flexion_left: value,
          toe_arom_4th_ip_extension_right: value,
          toe_arom_4th_ip_extension_left: value,
          toe_arom_5th_mtp_flexion_right: value,
          toe_arom_5th_mtp_flexion_left: value,
          toe_arom_5th_mtp_extension_right: value,
          toe_arom_5th_mtp_extension_left: value,
          toe_arom_5th_ip_flexion_right: value,
          toe_arom_5th_ip_flexion_left: value,
          toe_arom_5th_ip_extension_right: value,
          toe_arom_5th_ip_extension_left: value
        }, { emitEvent: false });
      }
    });

    // Toe PROM Apply to All - applies only to measurement fields, not endfeel
    this.romForm.get('toe_prom_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          toe_2nd_mtp_flexion_right: value,
          toe_2nd_mtp_flexion_left: value,
          toe_2nd_mtp_extension_right: value,
          toe_2nd_mtp_extension_left: value,
          toe_2nd_ip_flexion_right: value,
          toe_2nd_ip_flexion_left: value,
          toe_2nd_ip_extension_right: value,
          toe_2nd_ip_extension_left: value,
          toe_3rd_mtp_flexion_right: value,
          toe_3rd_mtp_flexion_left: value,
          toe_3rd_mtp_extension_right: value,
          toe_3rd_mtp_extension_left: value,
          toe_3rd_ip_flexion_right: value,
          toe_3rd_ip_flexion_left: value,
          toe_3rd_ip_extension_right: value,
          toe_3rd_ip_extension_left: value,
          toe_4th_mtp_flexion_right: value,
          toe_4th_mtp_flexion_left: value,
          toe_4th_mtp_extension_right: value,
          toe_4th_mtp_extension_left: value,
          toe_4th_ip_flexion_right: value,
          toe_4th_ip_flexion_left: value,
          toe_4th_ip_extension_right: value,
          toe_4th_ip_extension_left: value,
          toe_5th_mtp_flexion_right: value,
          toe_5th_mtp_flexion_left: value,
          toe_5th_mtp_extension_right: value,
          toe_5th_mtp_extension_left: value,
          toe_5th_ip_flexion_right: value,
          toe_5th_ip_flexion_left: value,
          toe_5th_ip_extension_right: value,
          toe_5th_ip_extension_left: value
        }, { emitEvent: false });
      }
    });

    // Dummy Example: Shoulder AROM with Labels
    this.romForm.get('shoulder_arom_with_labels')?.valueChanges.subscribe(value => {
      this.showShoulderAromWithLabelsFields = value === 'yes';
    });

    // Dummy Example: Grip Test without Labels
    this.romForm.get('grip_test_no_labels')?.valueChanges.subscribe(value => {
      this.showGripTestNoLabelsFields = value === 'yes';
    });

    // Dummy Example: Elbow AROM with Top Selects
    this.romForm.get('elbow_arom_with_selects')?.valueChanges.subscribe(value => {
      this.showElbowAromWithSelectsFields = value === 'yes';
    });

    // Dummy Example: Cervical AROM Single Column
    this.romForm.get('cervical_arom_single_column_dummy')?.valueChanges.subscribe(value => {
      this.showCervicalAromSingleColumnFields = value === 'yes';
    });

    this.romForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });
  }
}

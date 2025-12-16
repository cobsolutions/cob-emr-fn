import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RangeOfMotionModel } from './models/range-of-motion.model';
import { RangeOfMotionMapperService } from './services/range-of-motion-mapper.service';

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

  // Dropdown options
  cervicalRomOptions = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: 'wfl', label: 'WFL' },
    { value: 'limited', label: 'Limited' }
  ];

  applyToAllOptions = [
    { value: '', label: '' },
    { value: 'wnl', label: 'WNL' },
    { value: 'wfl', label: 'WFL' },
    { value: 'not_tested', label: 'Not Tested' }
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
      cervical_forward_bending: ['not_tested'],
      cervical_backward_bending: ['not_tested'],
      cervical_right_rotation: ['not_tested'],
      cervical_left_rotation: ['not_tested'],
      cervical_right_side_bending: ['not_tested'],
      cervical_left_side_bending: ['not_tested'],
      cervical_comments: [''],
      costovertebral_expansion: ['no'],
      costovertebral_apply_to_all: [''],
      costovertebral_t4: ['not_tested'],
      costovertebral_t9: ['not_tested'],
      costovertebral_umbilicus: ['not_tested'],
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
      extension_right: ['not_tested'],
      extension_left: ['not_tested'],

      flexion_right: ['not_tested'],
      flexion_left: ['not_tested'],

      radial_deviation_right: ['not_tested'],
      radial_deviation_left: ['not_tested'],

      ulnar_deviation_right: ['not_tested'],
      ulnar_deviation_left: ['not_tested'],
      wrist_prom: ['no'],
      hand_arrom_prom: ['no'],
      thoracic_arrom_sitting_with_passive_overpressure: ['no'],
      thoracic_arrom_sitting_apply_to_all: [''],
      thoracic_arrom_sitting_forward_bending: ['not_tested'],
      thoracic_arrom_sitting_backward_bending: ['not_tested'],
      thoracic_arrom_sitting_right_rotation: ['not_tested'],
      thoracic_arrom_sitting_left_rotation: ['not_tested'],
      thoracic_arrom_sitting_right_side_bending: ['not_tested'],
      thoracic_arrom_sitting_left_side_bending: ['not_tested'],
      thoracic_arrom_standing: ['no'],
      lumbar_arrom: ['no'],
      hip_arrom: ['no'],
      hip_prom: ['no'],
      knee_arrom: ['no'],
      knee_prom: ['no'],
      ankle_arrom: ['no'],
      ankle_prom: ['no'],
      fst_mtp_arrom: ['no'],
      fst_mtp_prom: ['no'],
      fst_ip_arrom: ['no'],
      fst_ip_prom: ['no'],
      toe_arrom: ['no'],
      toe_prom: ['no'],
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
          costovertebral_umbilicus: 'not_tested'
        });
      }
    });

    // Costovertebral Expansion Apply to All
    this.romForm.get('costovertebral_apply_to_all')?.valueChanges.subscribe(value => {
      if (value) {
        this.romForm.patchValue({
          costovertebral_t4: value,
          costovertebral_t9: value,
          costovertebral_umbilicus: value
        }, { emitEvent: false });
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
      if (value) {
        this.romForm.patchValue({
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

    this.romForm.get('wrist_prom')?.valueChanges.subscribe(value => {
      this.showWristPromFields = value === 'yes';
    });

    this.romForm.get('hand_arrom_prom')?.valueChanges.subscribe(value => {
      this.showHandAromPromFields = value === 'yes';
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
    });

    this.romForm.get('lumbar_arrom')?.valueChanges.subscribe(value => {
      this.showLumbarAromFields = value === 'yes';
    });

    this.romForm.get('hip_arrom')?.valueChanges.subscribe(value => {
      this.showHipAromFields = value === 'yes';
    });

    this.romForm.get('hip_prom')?.valueChanges.subscribe(value => {
      this.showHipPromFields = value === 'yes';
    });

    this.romForm.get('knee_arrom')?.valueChanges.subscribe(value => {
      this.showKneeAromFields = value === 'yes';
    });

    this.romForm.get('knee_prom')?.valueChanges.subscribe(value => {
      this.showKneePromFields = value === 'yes';
    });

    this.romForm.get('ankle_arrom')?.valueChanges.subscribe(value => {
      this.showAnkleAromFields = value === 'yes';
    });

    this.romForm.get('ankle_prom')?.valueChanges.subscribe(value => {
      this.showAnklePromFields = value === 'yes';
    });

    this.romForm.get('1st_mtp_arrom')?.valueChanges.subscribe(value => {
      this.show1stMtpAromFields = value === 'yes';
    });

    this.romForm.get('1st_mtp_prom')?.valueChanges.subscribe(value => {
      this.show1stMtpPromFields = value === 'yes';
    });

    this.romForm.get('1st_ip_arrom')?.valueChanges.subscribe(value => {
      this.show1stIpAromFields = value === 'yes';
    });

    this.romForm.get('1st_ip_prom')?.valueChanges.subscribe(value => {
      this.show1stIpPromFields = value === 'yes';
    });

    this.romForm.get('toe_arrom')?.valueChanges.subscribe(value => {
      this.showToeAromFields = value === 'yes';
    });

    this.romForm.get('toe_prom')?.valueChanges.subscribe(value => {
      this.showToePromFields = value === 'yes';
    });

    this.romForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });
  }
}

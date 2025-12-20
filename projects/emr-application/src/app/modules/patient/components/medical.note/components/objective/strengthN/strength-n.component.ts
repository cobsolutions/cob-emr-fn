import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'strength-n',
  templateUrl: './strength-n.component.html',
  styleUrls: ['./strength-n.component.css']
})
export class StrengthNComponent implements OnInit {
  strengthForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
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

      gross_muscle_tests_upper: ['no'],
      cervical_gross_muscle_tests_upper: ['no'],
      shoulder_gross_muscle_tests_upper: ['no'],
      elbow_gross_muscle_tests_upper: ['no'],
      wrist_gross_muscle_tests_upper: ['no'],

      redcord_neurac_stability_tests: ['no'],
      upper_body_myofascial_tests: ['no'],
      lower_body_myofascial_tests: ['no'],
      cervical_movements: ['no'],
      cervical_motor_control_tests: ['no'],
      lumbar_motor_control_tests: ['no'],

      gross_muscle_tests_trunk: ['no'],

      gross_muscle_tests_lower: ['no'],
      hip_gross_muscle_tests_lower: ['no'],
      knee_gross_muscle_tests_lower: ['no'],
      ankle_gross_muscle_tests_lower: ['no'],

      core_strength: ['no'],
      manual_muscle_tests: ['no'],
      additional_comments: ['no']
    })
  }
  setupValueChangeListeners() {
    this.strengthForm.get('no_limitations_noted')?.valueChanges.subscribe(value => {
      this.showNoLimitationsNotedFields = value === 'yes';
      if (!this.showNoLimitationsNotedFields) {
        this.strengthForm.patchValue({
          no_limitations_noted: false,
          uper_extremity: false,
        });
      }
    });

    this.strengthForm.get('selective_tissue_tension_upper')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionUpperFields = value === 'yes';
      if (!this.showSelectiveTissueTensionUpperFields) {
        this.strengthForm.patchValue({
          cervical: false,
          trunk: false,
          back_ribs: false,
          shoulder: false,
          elbow: false,
          wrist: false,
          hand: false,
        });
      }
    });

    this.strengthForm.get('selective_tissue_tension_lower')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionLowerFields = value === 'yes';
      if (!this.showSelectiveTissueTensionLowerFields) {
        this.strengthForm.patchValue({
          hip: false,
          knee: false,
          ankle: false,
          foot: false
        })
      }

    });

    this.strengthForm.get('grip_pinch')?.valueChanges.subscribe(value => {
      this.showGripPinchFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsUpperFields = value === 'yes';
      if (!this.showGrossMuscleTestsUpperFields) {
        this.strengthForm.patchValue({
          cervical_gross_muscle_tests_upper: false,
          shoulder_gross_muscle_tests_upper: false,
          elbow_gross_muscle_tests_upper: false,
          wrist_gross_muscle_tests_upper: false
        })
      }
    });

    this.strengthForm.get('redcord_neurac_stability_tests')?.valueChanges.subscribe(value => {
      this.showRedcordNeuracStabilityTestsFields = value === 'yes';
      if (!this.showRedcordNeuracStabilityTestsFields) {
        this.strengthForm.patchValue({
          upper_body_myofascial_tests: false,
          lower_body_myofascial_tests: false,
          cervical_movements: false,
          cervical_motor_control_tests: false,
          lumbar_motor_control_tests: false
        })
      }
    });

    this.strengthForm.get('gross_muscle_tests_trunk')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsTrunkFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsLowerFields = value === 'yes';
      if (!this.showGrossMuscleTestsLowerFields) {
        this.strengthForm.patchValue({
          hip_gross_muscle_tests_lower: false,
          knee_gross_muscle_tests_lower: false,
          ankle_gross_muscle_tests_lower: false
        })
      }
    });

    this.strengthForm.get('core_strength')?.valueChanges.subscribe(value => {
      this.showCoreStrengthFields = value === 'yes';
    });

    this.strengthForm.get('manual_muscle_tests')?.valueChanges.subscribe(value => {
      this.showManualMuscleTestsFields = value === 'yes';
    });

    this.strengthForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });
  }

}

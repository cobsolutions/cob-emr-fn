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
      selective_tissue_tension_upper: ['no'],
      selective_tissue_tension_lower: ['no'],
      grip_pinch: ['no'],
      gross_muscle_tests_upper: ['no'],
      redcord_neurac_stability_tests: ['no'],
      gross_muscle_tests_trunk: ['no'],
      gross_muscle_tests_lower: ['no'],
      core_strength: ['no'],
      manual_muscle_tests: ['no'],
      additional_comments: ['no']
    })
  }
  setupValueChangeListeners() {
    this.strengthForm.get('no_limitations_noted')?.valueChanges.subscribe(value => {
      this.showNoLimitationsNotedFields = value === 'yes';
    });

    this.strengthForm.get('selective_tissue_tension_upper')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionUpperFields = value === 'yes';
    });

    this.strengthForm.get('selective_tissue_tension_lower')?.valueChanges.subscribe(value => {
      this.showSelectiveTissueTensionLowerFields = value === 'yes';
    });

    this.strengthForm.get('grip_pinch')?.valueChanges.subscribe(value => {
      this.showGripPinchFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_upper')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsUpperFields = value === 'yes';
    });

    this.strengthForm.get('redcord_neurac_stability_tests')?.valueChanges.subscribe(value => {
      this.showRedcordNeuracStabilityTestsFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_trunk')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsTrunkFields = value === 'yes';
    });

    this.strengthForm.get('gross_muscle_tests_lower')?.valueChanges.subscribe(value => {
      this.showGrossMuscleTestsLowerFields = value === 'yes';
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

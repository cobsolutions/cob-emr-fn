import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OutcomeMeasurementToolsMapperService } from './services/outcome-measurement-tools-mapper.service';
import { OutcomeMeasurementToolsModel } from './models/outcome-measurement-tools.model';

@Component({
  selector: 'outcome-measurement-tools',
  templateUrl: './outcome-measurement-tools.component.html',
  styleUrls: ['./outcome-measurement-tools.component.css']
})
export class OutcomeMeasurementToolsComponent implements OnInit {
  omtForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() omtData: OutcomeMeasurementToolsModel | null = null;

  // Visibility flags for dependent fields
  showCustomOutcomeFields: boolean = false;
  showVestibularFields: boolean = false;
  showUpperExtremityFields: boolean = false;
  showSpineFields: boolean = false;
  showLowerExtremityFields: boolean = false;
  showBalanceFields: boolean = false;
  showPainFields: boolean = false;
  showGeneralFunctionFields: boolean = false;

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
  getOutcomeMeasurementToolsModel(): OutcomeMeasurementToolsModel {
    return this.omtMapper.toModel(this.omtForm.getRawValue());
  }

  /**
   * Load OMT data from DTO into form
   */
  loadFromDto(dto: OutcomeMeasurementToolsModel): void {
    const formValue = this.omtMapper.fromDto(dto);
    this.omtForm.patchValue(formValue);
  }

  private initForm(): void {
    this.omtForm = this.fb.group({
      custom_outcome_measurement: ['no'],
      vestibular: ['no'],
      upper_extremity: ['no'],
      spine: ['no'],
      lower_extremity: ['no'],
      balance: ['no'],
      pain: ['no'],
      general_function: ['no']
    });
  }

  private setupValueChangeListeners(): void {
    // Custom Outcome Measurement dependency
    this.omtForm.get('custom_outcome_measurement')?.valueChanges.subscribe(value => {
      this.showCustomOutcomeFields = value === 'yes';
      if (!this.showCustomOutcomeFields) {
        // Clear custom outcome fields when disabled
      }
    });

    // Vestibular dependency
    this.omtForm.get('vestibular')?.valueChanges.subscribe(value => {
      this.showVestibularFields = value === 'yes';
      if (!this.showVestibularFields) {
        // Clear vestibular fields when disabled
      }
    });

    // Upper Extremity dependency
    this.omtForm.get('upper_extremity')?.valueChanges.subscribe(value => {
      this.showUpperExtremityFields = value === 'yes';
      if (!this.showUpperExtremityFields) {
        // Clear upper extremity fields when disabled
      }
    });

    // Spine dependency
    this.omtForm.get('spine')?.valueChanges.subscribe(value => {
      this.showSpineFields = value === 'yes';
      if (!this.showSpineFields) {
        // Clear spine fields when disabled
      }
    });

    // Lower Extremity dependency
    this.omtForm.get('lower_extremity')?.valueChanges.subscribe(value => {
      this.showLowerExtremityFields = value === 'yes';
      if (!this.showLowerExtremityFields) {
        // Clear lower extremity fields when disabled
      }
    });

    // Balance dependency
    this.omtForm.get('balance')?.valueChanges.subscribe(value => {
      this.showBalanceFields = value === 'yes';
      if (!this.showBalanceFields) {
        // Clear balance fields when disabled
      }
    });

    // Pain dependency
    this.omtForm.get('pain')?.valueChanges.subscribe(value => {
      this.showPainFields = value === 'yes';
      if (!this.showPainFields) {
        // Clear pain fields when disabled
      }
    });

    // General Function dependency
    this.omtForm.get('general_function')?.valueChanges.subscribe(value => {
      this.showGeneralFunctionFields = value === 'yes';
      if (!this.showGeneralFunctionFields) {
        // Clear general function fields when disabled
      }
    });
  }
}

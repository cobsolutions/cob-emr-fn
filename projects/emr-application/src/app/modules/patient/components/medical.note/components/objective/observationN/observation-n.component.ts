import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'observation-n',
  templateUrl: './observation-n.component.html',
  styleUrls: ['./observation-n.component.css']
})
export class ObservationNComponent implements OnInit {
  omtForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  // Visibility flags for dependent fields
  showBodyTypeFields: boolean = false;
  showVitalsFields: boolean = false;
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
  showImmobilizerFields: boolean = false;
  showMuscularAsymmetriesFields: boolean = false;
  showMuscleGuardingFields: boolean = false;
  showMuscleAtrophyFields: boolean = false;
  showEdemaFields: boolean = false;
  showApprehensionOfMovementFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }

  private initForm(): void {
    this.omtForm = this.fb.group({
      indicate_body_type: ['no'],
      vitals: ['no'],
      adl_management: ['no'],
      breathing_at_rest: ['no'],
      transfers: ['no'],
      cast_splint: ['no'],
      standing_posture: ['no'],
      protracted_scapulas: ['no'],
      scoliosis: ['no'],
      lower_extremity_structure: ['no'],
      gait: ['no'],
      six_minute_walk_test: ['no'],
      assistive_device: ['no'],
      immobilizer: ['no'],
      muscular_asymmetries: ['no'],
      muscle_guarding: ['no'],
      muscle_atrophy: ['no'],
      edema: ['no'],
      apprehension_of_movement: ['no'],
      additional_comments: ['no'],
    })
  }
  setupValueChangeListeners() {
    this.omtForm.get('indicate_body_type')?.valueChanges.subscribe(value => {
      this.showBodyTypeFields = value === 'yes';
      if (!this.showBodyTypeFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('vitals')?.valueChanges.subscribe(value => {
      this.showVitalsFields = value === 'yes';
      if (!this.showVitalsFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('adl_management')?.valueChanges.subscribe(value => {
      this.showAdlManagementFields = value === 'yes';
      if (!this.showAdlManagementFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('breathing_at_rest')?.valueChanges.subscribe(value => {
      this.showBreathingAtRestFields = value === 'yes';
      if (!this.showBreathingAtRestFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('transfers')?.valueChanges.subscribe(value => {
      this.showTransfersFields = value === 'yes';
      if (!this.showTransfersFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('cast_splint')?.valueChanges.subscribe(value => {
      this.showCastSplintFields = value === 'yes';
      if (!this.showCastSplintFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('standing_posture')?.valueChanges.subscribe(value => {
      this.showStandingPostureFields = value === 'yes';
      if (!this.showStandingPostureFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('protracted_scapulas')?.valueChanges.subscribe(value => {
      this.showProtractedScapulasFields = value === 'yes';
      if (!this.showProtractedScapulasFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('scoliosis')?.valueChanges.subscribe(value => {
      this.showScoliosisFields = value === 'yes';
      if (!this.showScoliosisFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('lower_extremity_structure')?.valueChanges.subscribe(value => {
      this.showLowerExtremityStructureFields = value === 'yes';
      if (!this.showLowerExtremityStructureFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('gait')?.valueChanges.subscribe(value => {
      this.showGaitFields = value === 'yes';
      if (!this.showGaitFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('six_minute_walk_test')?.valueChanges.subscribe(value => {
      this.show6MinuteWalkTestFields = value === 'yes';
      if (!this.show6MinuteWalkTestFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('assistive_device')?.valueChanges.subscribe(value => {
      this.showAssistiveDeviceFields = value === 'yes';
      if (!this.showAssistiveDeviceFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('immobilizer')?.valueChanges.subscribe(value => {
      this.showImmobilizerFields = value === 'yes';
      if (!this.showImmobilizerFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('muscular_asymmetries')?.valueChanges.subscribe(value => {
      this.showMuscularAsymmetriesFields = value === 'yes';
      if (!this.showMuscularAsymmetriesFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('muscle_guarding')?.valueChanges.subscribe(value => {
      this.showMuscleGuardingFields = value === 'yes';
      if (!this.showMuscleGuardingFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('muscle_atrophy')?.valueChanges.subscribe(value => {
      this.showMuscleAtrophyFields = value === 'yes';
      if (!this.showMuscleAtrophyFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('edema')?.valueChanges.subscribe(value => {
      this.showEdemaFields = value === 'yes';
      if (!this.showEdemaFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('apprehension_of_movement')?.valueChanges.subscribe(value => {
      this.showApprehensionOfMovementFields = value === 'yes';
      if (!this.showApprehensionOfMovementFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
    
    this.omtForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
      if (!this.showAdditionalCommentsFields) {
        this.omtForm.patchValue({
          custom_outcome_name: '',
          custom_outcome_comments: '',
          custom_outcome_score: ''
        });
      }
    });
  }
}

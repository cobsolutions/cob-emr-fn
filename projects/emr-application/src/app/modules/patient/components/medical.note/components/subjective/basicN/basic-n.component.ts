import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'subjective-basic-n',
  templateUrl: './basic-n.component.html',
  styleUrls: ['./basic-n.component.css']
})
export class BasicNComponent implements OnInit {
  basicForm!: FormGroup;
  showHospitalizationDates = false;
  @Output() formReady = new EventEmitter<FormGroup>();

  // ICD-10 Diagnosis configuration
  diagnosisFieldName = 'icdten_diagnosis';

  // Treatment Diagnosis configuration
  treatmentDiagnosisFieldName = 'treatment_diagnosis';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.basicForm);
  }

  setupValueChangeListeners() {
    // Listen to prior_hospitalization changes to show/hide date fields
    this.basicForm.get('prior_hospitalization')?.valueChanges.subscribe(value => {
      this.showHospitalizationDates = value === 'yes';
      if (value === 'no') {
        // Clear the date fields when user selects 'no'
        this.basicForm.patchValue({
          from_date: null,
          to_date: null
        });
      }
    });
  }

  onDiagnosisChange(diagnoses: { code: string; description: string; order: number }[]): void {
    // Optional: Handle changes from ICD-10 diagnosis component
    console.log('ICD-10 Diagnosis updated:', diagnoses);
  }

  onTreatmentDiagnosisChange(diagnoses: { code: string; description: string; order: number }[]): void {
    // Optional: Handle changes from treatment diagnosis component
    console.log('Treatment Diagnosis updated:', diagnoses);
  }
  initForm() {
    this.basicForm = this.fb.group({
      dos_date: [null], // name : Date of Initial Examination , Type Date Picker
      time:['no'],  // name  Time In/Time Out , type radio
      number_of_visit:[''], // Visit Number , type : input text
      icdten_diagnosis: [[]], // ICD-10 Diagnosis codes
      treatment_diagnosis: [[]], // Treatment Diagnosis ICD-10 codes
      treatment_side:[], //name Treatment Side checkboxs  (N/A,Left,Right) in vertical align , Type checkbox
      specific_physician_rders:['no'], //name Specific Physician Orders , type radio box
      injury_onset_date:[null], //name Injury/Onset Date/Change of Status Date , type : date picker
      chronic:[], //check box
      Insidious:[], //check box
      new_injury:[], //check box
      surgery_performed:['no'], //Type Radio
      prior_hospitalization:['no'], //Type Radio
      from_date:[null], //Type Date
      to_date:[null], // Type Date
      pelvic_speech_profile:[], // Type Select input
      movement_based_spinal_assessment_questionnaire:['no'], //Type radio 
      history_of_present_condition_Mechanism_of_injury:[''],//Text Area
      primary_concern_chief_complaint:[''] //Text Area








    }); 
  }

}

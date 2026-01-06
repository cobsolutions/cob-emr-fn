import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IcdtenComponent } from '../basic/icd10/icdten.component';

@Component({
  selector: 'subjective-basic-n',
  templateUrl: './basic-n.component.html',
  styleUrls: ['./basic-n.component.css']
})
export class BasicNComponent implements OnInit {
  basicForm!: FormGroup;
  showHospitalizationDates = false;
  specificPhysicianOrders = false;
  showHospitalizationTime = false;
  showSurgeryPperformed = false;
  showNewInjury = false;
  @Input() basicFormData: any;
  @Output() formReady = new EventEmitter<FormGroup>();

  // ICD-10 Diagnosis configuration
  diagnosisFieldName = 'icdten_diagnosis';

  // Treatment Diagnosis configuration
  treatmentDiagnosisFieldName = 'treatment_diagnosis';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.patchFormData()
    this.setupValueChangeListeners();
    this.formReady.emit(this.basicForm);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in painFormData
    if (changes['basicFormData'] && !changes['basicFormData'].firstChange && this.basicForm) {
      this.patchFormData();
    }
  }
  patchFormData() {
    if (this.basicFormData) {
      const formData = {
        icdten_diagnosis: this.basicFormData.icdtenDiagnosis
      }      
      this.basicForm.patchValue(formData);
    }
  }


  onDiagnosisChange(diagnoses: { code: string; description: string; order: number }[]): void {
    // Optional: Handle changes from ICD-10 diagnosis component
    
  }

  onTreatmentDiagnosisChange(diagnoses: { code: string; description: string; order: number }[]): void {
    
  }
  initForm() {
    this.basicForm = this.fb.group({
      dos_date: [null], // name : Date of Initial Examination , Type Date Picker
      time: ['no'],  // name  Time In/Time Out , type radio

      time_in: ['no'],
      time_out: ['no'],
      number_of_visit: [''], // Visit Number , type : input text
      icdten_diagnosis: [[]], // ICD-10 Diagnosis codes
      treatment_diagnosis: [[]], // Treatment Diagnosis ICD-10 codes

      treatment_side: [], //name Treatment Side checkboxs  (N/A,Left,Right) in vertical align , Type checkbox
      specific_physician_rders: ['no'], //name Specific Physician Orders , type radio box
      specific_physician_rders_text: [''],
      injury_onset_date: [null], //name Injury/Onset Date/Change of Status Date , type : date picker
      chronic: [false], //check box
      insidious: [false], //check box
      new_injury: [false], //check box
      new_injury_text: [''], //check box

      surgery_performed: ['no'],
      surgery_performed_date_of_surgery: [null],
      surgery_performed_type_of_surgery: [''],

      prior_hospitalization: ['no'], //Type Radio
      from_date: [null], //Type Date
      to_date: [null], // Type Date
      pelvic_speech_profile: [''], // Type Select input
      history_of_present_condition_Mechanism_of_injury: [''],//Text Area
      primary_concern_chief_complaint: [''] //Text Area
    });
  }
  setupValueChangeListeners() {
    this.basicForm.get('time')?.valueChanges.subscribe(value => {
      this.showHospitalizationTime = value === 'yes'
    })
    this.basicForm.get('specific_physician_rders')?.valueChanges.subscribe(value => {
      this.specificPhysicianOrders = value === 'yes'
    })
    this.basicForm.get('surgery_performed')?.valueChanges.subscribe(value => {
      this.showSurgeryPperformed = value === 'yes'
    })

    this.basicForm.get('new_injury')?.valueChanges.subscribe(value => {
      this.showNewInjury = value
    });
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

  // Treatment Side checkbox array handling
  onTreatmentSideChange(value: string, isChecked: boolean): void {
    const currentValues: string[] = this.basicForm.get('treatment_side')?.value || [];

    if (isChecked) {
      // Add value if not already present
      if (!currentValues.includes(value)) {
        this.basicForm.patchValue({
          treatment_side: [...currentValues, value]
        });
      }
    } else {
      // Remove value
      this.basicForm.patchValue({
        treatment_side: currentValues.filter(v => v !== value)
      });
    }
  }

  isTreatmentSideSelected(value: string): boolean {
    const currentValues: string[] = this.basicForm.get('treatment_side')?.value || [];
    return currentValues.includes(value);
  }
}

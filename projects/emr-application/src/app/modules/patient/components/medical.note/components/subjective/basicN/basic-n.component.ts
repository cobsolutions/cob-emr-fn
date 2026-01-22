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
  @Input() noteType: string;
  @Output() formReady = new EventEmitter<FormGroup>();

  get isDailyNote(): boolean {
    return this.noteType === 'DailyNote' || this.noteType === '2';
  }

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
    // Set dos_date to current date if no data from backend
    if (!this.basicFormData?.dosDate) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      this.basicForm.patchValue({
        dos_date: formattedDate
      });
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

      time_in: [],
      time_out: [],
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
      primary_concern_chief_complaint: [''], //Text Area,
      current_complaints_gains:['']//Text Area,
    });
  }
  setupValueChangeListeners() {
    this.basicForm.get('time')?.valueChanges.subscribe(value => {
      this.showHospitalizationTime = value === 'yes'
      if (value === 'no') {
        this.basicForm.patchValue({
          time_in: null,
          time_out: null
        })
      }
    })
    this.basicForm.get('specific_physician_rders')?.valueChanges.subscribe(value => {
      this.specificPhysicianOrders = value === 'yes'
      if (value === 'no') {
        this.basicForm.patchValue({
          specific_physician_rders_text: ''
        })
      }
    })
    this.basicForm.get('surgery_performed')?.valueChanges.subscribe(value => {
      this.showSurgeryPperformed = value === 'yes'
      if (value === 'no') {
        this.basicForm.patchValue({
          surgery_performed_date_of_surgery: null,
          surgery_performed_type_of_surgery: null
        })
      }
    })

    this.basicForm.get('new_injury')?.valueChanges.subscribe(value => {
      this.showNewInjury = value
      if (value === false) {
        this.basicForm.patchValue({
          new_injury_text: null
        })
      }
    });

    this.basicForm.get('prior_hospitalization')?.valueChanges.subscribe(value => {
      this.showHospitalizationDates = value === 'yes';
      if (value === 'no') {
        this.basicForm.patchValue({
          from_date: null,
          to_date: null
        })
      }
    });
  }

  // Treatment Side checkbox array handling
  onTreatmentSideChange(value: string, isChecked: boolean): void {
    let currentValues: string[] = this.basicForm.get('treatment_side')?.value || [];

    if (isChecked) {
      // If N/A is checked, uncheck Left and Right
      if (value === 'na') {
        currentValues = currentValues.filter(v => v !== 'left' && v !== 'right');
      }
      // If Left or Right is checked, uncheck N/A
      if (value === 'left' || value === 'right') {
        currentValues = currentValues.filter(v => v !== 'na');
      }
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

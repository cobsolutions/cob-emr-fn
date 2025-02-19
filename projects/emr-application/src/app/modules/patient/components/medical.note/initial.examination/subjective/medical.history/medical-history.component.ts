import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  medicalHistoryForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  medicalHistoryOptions = [

    "Alzheimer's",
    'Cardiovascular Disease',
    'Cauda Equina Syndrome',
    'Cerebral Vascular Accident',
    'Current Infection',
    'Diabetes Mellitus Type 1',
    'Diabetes Mellitus Type 2',
    'Fibromyalgia',
    'Fracture Or Suspected Fracture',
    'High Blood Pressure',
    'Other (enter description below)',
    'History Of Cancer',
    "Huntington's",
    'Immunosuppression',
    'Lupus',
    'Muscular Dystrophy',
    'Obesity',
    'Osteoarthritis',
    "Parkinson's",
    'Rheumatoid Arthritis',
    'Traumatic Brain Injury'
  ];
  personalFactor = [
    "No Known Complicating Factors Affecting the Plan of Care",
    "Allergies",
    "Attitudes/Motivation",
    "Character",
    "Coping Style",
    "Education level",
    "Home Environment",
    "Lifestyle",
    "Litigation",
    "Other (enter description below)",
    "Mechanism of injury/ Illness",
    "Multiple Treatment Areas",
    "Patient age",
    "Previous Therapy",
    "Psycho-Social",
    "Rehab Potential",
    "Social background",
    "Surgical History",
    "Time since onset of injury/illness",

  ]
  currentMedications = [
    "Prescription",
    "Over The Counter",
    "Herbals",
    "Vitamin/Mineral/Dietary Supplements",
    "Other",
    "Not currently taking any medications"
  ]
  leftMedicalHistoryOptions: string[] = [];
  rightMedicalHistoryOptions: string[] = [];

  lefPersonalFactorOptions: string[] = [];
  rightPersonalFactorOptions: string[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.medicalHistoryForm = this.fb.group({
      'history_similars_symptoms': new FormControl(null, [Validators.required]),
      'general_health': new FormControl(null, [Validators.required]),
      "occupation_social_history": new FormControl(null, [Validators.required]),
      "home_health_care": new FormControl(null, [Validators.required]),
      "history_of_falls": new FormControl(null, [Validators.required]),
      "medical_history": this.fb.array([]),
      "testing_imaging": new FormControl(null, [Validators.required]),
      "personal_factors": this.fb.array([]),
      "medical_history_review": new FormControl(null, [Validators.required]),
      "mental_status_cognitive_function": new FormControl(null, [Validators.required]),
      "unexplained_weight_loss": new FormControl(null, [Validators.required]),
      "current_medications": this.fb.array([]),
      "patient_goals": new FormControl(null, [Validators.required]),
    });
    this.splitMedicalHistoryIntoColumns();
    this.splitPersonalFactorIntoColumns();
    this.formReady.emit(this.medicalHistoryForm);
  }
  private splitMedicalHistoryIntoColumns() {
    const midIndex = Math.ceil(this.medicalHistoryOptions.length / 2);
    this.leftMedicalHistoryOptions = this.medicalHistoryOptions.slice(0, midIndex);
    this.rightMedicalHistoryOptions = this.medicalHistoryOptions.slice(midIndex);
  }

  private splitPersonalFactorIntoColumns() {
    const midIndex = Math.ceil(this.personalFactor.length / 2);
    this.lefPersonalFactorOptions = this.medicalHistoryOptions.slice(0, midIndex);
    this.rightPersonalFactorOptions = this.medicalHistoryOptions.slice(midIndex);
  }
}

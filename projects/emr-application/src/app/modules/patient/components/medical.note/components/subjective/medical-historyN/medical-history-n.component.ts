import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'subjective-medical-history-n',
  templateUrl: './medical-history-n.component.html',
  styleUrls: ['./medical-history-n.component.css']
})
export class MedicalHistoryNComponent implements OnInit {
  medicalHistoryForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }
  years: number[] = [];
  showPreviousHistoryOfSimilarSymptoms: boolean = false
  showPreviousEpisodesOfSameComplaints: boolean = false
  showPreviousTreatmentsForSimilarSymptoms: boolean = false
  showOccupationSocialHistory: boolean = false
  showOccupationSocialHistorySocialHistory: boolean = false
  showOccupationSocialHistoryOccupationAndWorkStatus: boolean = false;
  showOccupationSocialHistoryHomeLayout: boolean = false;
  showOccupationSocialHistoryDurableMedicalEquipment: boolean = false;
  showOccupationSocialHistoryPatientTobaccoUser: boolean = false;
  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.populateYears()
    this.formReady.emit(this.medicalHistoryForm);
  }
  initForm() {
    this.medicalHistoryForm = this.fb.group({
      previous_history_of_similar_symptoms: ['no'],
      previous_episodes_of_same_complaints: ['no'],
      previous_episodes_of_same_complaints_range: [''],
      previous_episodes_of_same_complaints_year_first_episode: [''],
      previous_treatments_for_similar_symptoms: ['no'],
      previous_history_of_similar_symptoms_text: [''],
      previous_treatments_for_similar_symptoms_text: [''],

      general_health: [''],
      occupation_social_history: ['no'],
      occupation_social_history_social_history: ['no'],
      occupation_social_history_occupation_and_work_status: ['no'],
      occupation_social_history_home_layout: ['no'],
      occupation_social_history_durable_medical_equipment: ['no'],
      occupation_social_history_patient_tobacco_user: ['no'],
      home_health_care: ['no'],
      history_of_falls: ['na'],
      mental_status_cognitive_function_appears_impaired: ['no'],
      unexplained_weight_loss: ['na'],
    })
  }
  setupValueChangeListeners() {
    this.medicalHistoryForm.get('previous_history_of_similar_symptoms')?.valueChanges.subscribe(value => {
      this.showPreviousHistoryOfSimilarSymptoms = value === 'yes'
    })

    this.medicalHistoryForm.get('previous_episodes_of_same_complaints')?.valueChanges.subscribe(value => {
      this.showPreviousEpisodesOfSameComplaints = value === 'yes'
    })
    this.medicalHistoryForm.get('previous_treatments_for_similar_symptoms')?.valueChanges.subscribe(value => {
      this.showPreviousTreatmentsForSimilarSymptoms = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistory = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history_social_history')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistorySocialHistory = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history_occupation_and_work_status')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistoryOccupationAndWorkStatus = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history_home_layout')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistoryHomeLayout = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history_durable_medical_equipment')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistoryDurableMedicalEquipment = value === 'yes'
    })
    this.medicalHistoryForm.get('occupation_social_history_patient_tobacco_user')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistoryPatientTobaccoUser = value === 'yes'
    })
  }
  private populateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear + 1; // next year
    const endYear = 1970;

    for (let year = startYear; year >= endYear; year--) {
      this.years.push(year);
    }
  }

}

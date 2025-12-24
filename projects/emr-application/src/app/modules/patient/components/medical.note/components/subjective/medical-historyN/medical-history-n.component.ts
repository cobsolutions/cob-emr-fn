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
  showOccupationSocialHistoryPatientTobaccoUserOtherForm: boolean = false;

  socialHistoryOptions = [
    { value: 'lives_at_assisted_living_facility', label: 'Lives at Assisted Living Facility' },
    { value: 'lives_with_family', label: 'Lives with Family' },
    { value: 'lives_with_caregiver', label: 'Lives with Caregiver' },
    { value: 'married', label: 'Married' },
    { value: 'single', label: 'Single' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];
  homeLayoutOptions = [
    { value: '1_story', label: '1-story' },
    { value: '2_story', label: '2-story' },
    { value: 'condo_apt', label: 'Condo/Apt' },
    { value: 'stairs_steps', label: 'Stairs/Steps' },
    { value: 'shower_stall', label: 'Shower Stall' },
    { value: 'combo_bathtub_shower', label: 'Combo Bathtub Shower' },
    { value: 'w_c_accessible', label: 'W/C Accessible' }
  ]
  durableMedicalEquipmentOptions = [
    { value: 'none', label: 'None' },
    { value: 'tub_bench', label: 'Tub Bench' },
    { value: 'shower_chair', label: 'Shower Chair' },
    { value: 'grab_bars', label: 'Grab Bars' },
    { value: 'bedside_commode', label: 'Bedside Commode' },
    { value: 'raised_toilet_seat', label: 'Raised Toilet Seat' },
    { value: 'standard_walker', label: 'Standard Walker' },
    { value: 'rolling_walker', label: 'Rolling Walker' },
    { value: 'hemi_walker', label: 'Hemi-walker' },
    { value: 'quad_cane', label: 'Quad Cane' },
    { value: 'straight_cane', label: 'Straight Cane' },
    { value: 'wheelchair', label: 'Wheelchair' }
  ]

  workStatusOptions = [
    { value: 'working', label: 'Working' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'disabled', label: 'Disabled' },
    { value: 'retired', label: 'Retired' },
    { value: 'unemployed', label: 'Unemployed' }
  ];

  dutyLevelOptions = [
    { value: 'sedentary', label: 'Sedentary' },
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'heavy', label: 'Heavy' },
    { value: 'very_heavy', label: 'Very Heavy' }
  ];
  tobaccoCessationOptions = [
    { value: 'recommendation_made', label: 'Recommendation made to stop using tobacco products', formControlName: 'tobacco_cessation_recommendation_made' },
    { value: 'advice_support_provided', label: 'Advice and support provided for tobacco use cessation', formControlName: 'tobacco_cessation advice_support_provided' },
    { value: 'continued_support', label: 'Continued support for tobacco use cessation will be provided on all or most follow up visits', formControlName: 'tobacco_cessation_continued_support' }
  ];
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
      occupation_social_history_list: [],
      occupation_social_history_text: [],
      occupation_social_history_social_history: ['no'],
      occupation_social_history_occupation_and_work_status: ['no'],
      occupation_social_history_occupation_and_work_name_of_occupation: [''],
      occupation_social_history_occupation_and_work_status_status: [''],
      occupation_social_history_occupation_and_work_status_duty_level: [''],
      occupation_social_history_occupation_and_work_status_sescription: [''],
      occupation_social_history_occupation_and_work_status_out_of_work_since: [''],
      occupation_social_history_occupation_and_work_status_return_to_work_date: [''],



      occupation_social_history_home_layout: ['no'],
      occupation_social_history_home_layout_list: [''],
      occupation_social_history_home_layout_text: [''],

      occupation_social_history_durable_medical_equipment: ['no'],
      occupation_social_history_durable_medical_equipment_list: ['no'],
      occupation_social_history_durable_medical_equipment_text: [''],

      occupation_social_history_patient_tobacco_user: ['no'],
      occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco: ['no'],
      occupation_social_history_patient_tobacco_user_other_form_text: [''],
      tobacco_cessation_recommendation_made: [false],
      tobacco_cessation_advice_support_provided: [false],
      tobacco_cessation_continued_support: [false],

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
    this.medicalHistoryForm.get('occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco')?.valueChanges.subscribe(value => {
      this.showOccupationSocialHistoryPatientTobaccoUserOtherForm = value === 'yes'
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

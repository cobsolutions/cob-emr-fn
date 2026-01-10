import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CheckboxOption } from '../common/list-checkbox-with-child/list-checkbox-with-child.component';

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
  showHomeHealthCare: boolean = false
  showHistoryOfFallsYES: boolean = false;
  showHistoryOfFallsNO: boolean = false;
  showHistoryOfFallsdocument: boolean = false;
  showMentalStatusCognitiveFunctionAppearsImpaired: boolean = false;
  medicalHistoryOptions: CheckboxOption[] = [
    { label: 'No Known Significant PMH To Affect Treatment', value: 'no_known_significant_pmh_to_affect_treatment', childType: 'text', childPlaceholder: 'Enter details' },
    { label: "Alzheimer's", value: 'alzheimers', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Cardiovascular Disease', value: 'cardiovascular_disease', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Cauda Equina Syndrome', value: 'cauda_equina_syndrome', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Cerebral Vascular Accident', value: 'cerebral_vascular_accident', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Current Infection', value: 'current_infection', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Diabetes Mellitus Type 1', value: 'diabetes_mellitus_type_1', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Diabetes Mellitus Type 2', value: 'diabetes_mellitus_type_2', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Fibromyalgia', value: 'fibromyalgia', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Fracture Or Suspected Fracture', value: 'fracture_or_suspected_fracture', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'High Blood Pressure', value: 'high_blood_pressure', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'History Of Cancer', value: 'history_of_cancer', childType: 'text', childPlaceholder: 'Enter details' },
    { label: "Huntington's", value: 'huntingtons', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Immunosuppression', value: 'immunosuppression', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Lupus', value: 'lupus', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Muscular Dystrophy', value: 'muscular_dystrophy', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Other (enter description below)', value: 'other_enter_description_below', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Obesity', value: 'obesity', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Osteoarthritis', value: 'osteoarthritis', childType: 'text', childPlaceholder: 'Enter details' },
    { label: "Parkinson's", value: 'parkinsons', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Rheumatoid Arthritis', value: 'rheumatoid_arthritis', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Traumatic Brain Injury', value: 'traumatic_brain_injury', childType: 'text', childPlaceholder: 'Enter details' }
  ];
  currentMedicationsOptions: CheckboxOption[] = [
    { label: 'Prescription', value: 'prescription', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Over The Counter', value: 'over_the_counter', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Herbals', value: 'herbals', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Vitamin/Mineral/Dietary Supplements', value: 'vitamin_mineral_dietary_supplements', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Other', value: 'other', childType: 'text', childPlaceholder: 'Enter details' },
    { label: 'Not currently taking any medications', value: 'not_currently_taking_any_medications', childType: 'text', childPlaceholder: 'Enter details' }
  ]
  complicatingPersonalFactorsOptions: CheckboxOption[] = [
    { label: 'No Known Complicating Factors Affecting the Plan of Care', value: 'no_known_complicating_factors_affecting_the_plan_of_care', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Allergies', value: 'allergies', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Attitudes/Motivation', value: 'attitudes_motivation', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Character', value: 'character', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Coping Style', value: 'coping_style', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Education level', value: 'education_level', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Home Environment', value: 'home_environment', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Lifestyle', value: 'lifestyle', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Litigation', value: 'litigation', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Other (enter description below)', value: 'other_enter_description_below', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Mechanism of injury/ Illness', value: 'mechanism_of_injury_illness', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Multiple Treatment Areas', value: 'multiple_treatment_areas', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Patient age', value: 'patient_age', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Previous Therapy', value: 'previous_therapy', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Psycho-Social', value: 'psycho_social', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Rehab Potential', value: 'rehab_potential', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Social background', value: 'social_background', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Surgical History', value: 'surgical_history', childType: 'textarea', childPlaceholder: 'Enter details' },
    { label: 'Time since onset of injury/illness', value: 'time_since_onset_of_injury_illness', childType: 'textarea', childPlaceholder: 'Enter details' }
  ]
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
    { value: 'advice_support_provided', label: 'Advice and support provided for tobacco use cessation', formControlName: 'tobacco_cessation_advice_support_provided' },
    { value: 'continued_support', label: 'Continued support for tobacco use cessation will be provided on all or most follow up visits', formControlName: 'tobacco_cessation_continued_support' }
  ];

  riskAssessmentOptions = [
    { value: 'medications_contributing_factor', label: 'Documentation on whether medications are a contributing factor or not to falls', formControlName: 'risk_assessment_medications_contributing_factor' },
    { value: 'home_fall_hazards', label: 'Home fall hazards', formControlName: 'risk_assessment_home_fall_hazards' },
    { value: 'postural_blood_pressure', label: 'Postural blood pressure', formControlName: 'risk_assessment_postural_blood_pressure' },
    { value: 'vision', label: 'Vision', formControlName: 'risk_assessment_vision' }
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
      occupation_social_history_home_layout_list: [],
      occupation_social_history_home_layout_text: [''],

      occupation_social_history_durable_medical_equipment: ['no'],
      occupation_social_history_durable_medical_equipment_list: [],
      occupation_social_history_durable_medical_equipment_text: [''],

      occupation_social_history_patient_tobacco_user: ['no'],
      occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco: ['no'],
      occupation_social_history_patient_tobacco_user_other_form_text: [''],
      tobacco_cessation_recommendation_made: [false],
      tobacco_cessation_advice_support_provided: [false],
      tobacco_cessation_continued_support: [false],

      home_health_care: ['no'],
      home_health_care_text: [''],
      history_of_falls: ['na'],
      history_of_falls_document: ['no'],
      history_of_falls_document_text: [''],
      risk_assessment_medications_contributing_factor: [false],
      risk_assessment_home_fall_hazards: [false],
      risk_assessment_postural_blood_pressure: [false],
      risk_assessment_vision: [false],
      medical_history_review: [''],
      mental_status_cognitive_function_appears_impaired: ['no'],
      mental_status_cognitive_function_appears_impaired_text: [''],
      unexplained_weight_loss: ['na'],
      diagnostic_testing_Imaging: [''],
      patient_goals: []
    })
  }
  setupValueChangeListeners() {
    this.medicalHistoryForm.get('previous_history_of_similar_symptoms')?.valueChanges.subscribe(value => {
      this.showPreviousHistoryOfSimilarSymptoms = value === 'yes'
      if (this.showPreviousHistoryOfSimilarSymptoms === null
        || !this.showPreviousHistoryOfSimilarSymptoms) {
        this.medicalHistoryForm.patchValue({
          previous_episodes_of_same_complaints: null,
          previous_treatments_for_similar_symptoms: null,
          previous_history_of_similar_symptoms_text: null
        })
      }
    })

    this.medicalHistoryForm.get('previous_episodes_of_same_complaints')?.valueChanges.subscribe(value => {
      this.showPreviousEpisodesOfSameComplaints = value === 'yes'
      if (this.showPreviousEpisodesOfSameComplaints === null
        || !this.showPreviousEpisodesOfSameComplaints)
        this.medicalHistoryForm.patchValue({
          previous_episodes_of_same_complaints_range: null,
          previous_episodes_of_same_complaints_year_first_episode: null
        })
    })
    this.medicalHistoryForm.get('previous_treatments_for_similar_symptoms')?.valueChanges.subscribe(value => {
      this.showPreviousTreatmentsForSimilarSymptoms = value === 'yes'
      if (this.showPreviousTreatmentsForSimilarSymptoms === null
        || !this.showPreviousTreatmentsForSimilarSymptoms)
        this.medicalHistoryForm.patchValue({
          previous_treatments_for_similar_symptoms_text: null
        })
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
    this.medicalHistoryForm.get('home_health_care')?.valueChanges.subscribe(value => {
      this.showHomeHealthCare = value === 'yes'
    })
    this.medicalHistoryForm.get('history_of_falls')?.valueChanges.subscribe(value => {
      this.showHistoryOfFallsYES = value === 'yes';
      this.showHistoryOfFallsNO = value === 'no';
    })
    this.medicalHistoryForm.get('history_of_falls_document')?.valueChanges.subscribe(value => {
      this.showHistoryOfFallsdocument = value === 'yes';
    })
    this.medicalHistoryForm.get('mental_status_cognitive_function_appears_impaired')?.valueChanges.subscribe(value => {
      this.showMentalStatusCognitiveFunctionAppearsImpaired = value === 'yes';
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

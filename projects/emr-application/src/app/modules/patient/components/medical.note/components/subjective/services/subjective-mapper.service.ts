import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basic } from '../models/Basic';
import { CurrentFunction } from '../models/CurrentFunction';
import { MedicalHistory } from '../models/medical.history/medical.history';
import { MedicalHistoryDisease } from '../models/medical.history/medical.history.disease';
import { PersonalComplication } from '../models/medical.history/personal.complication';
import { CurrentMedication } from '../models/medical.history/current.medication';
import { PreviousHistorySymptoms } from '../models/medical.history/previous.history.symptoms';
import { OccupationSocialHistory } from '../models/medical.history/occupation.social.history';
import { HistoryFall } from '../models/medical.history/history.falls';
import { Pain } from '../models/Pain';
import { Subjective } from '../models/Subjective';
import { CurrentFunctionMapperService } from './current.function.mapper.service';
import { PriorFunctionMapperService } from './prior-function-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectiveMapperService {

  constructor(private priorFunctionMapper: PriorFunctionMapperService,
    private currentFunctionMapper: CurrentFunctionMapperService) { }

  /**
   * Converts camelCase to snake_case
   */
  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * Converts snake_case to camelCase
   */
  private toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /**
   * Converts kebab-case and snake_case mixed format to camelCase
   * Example: prior-level-function_self-care_hygiene -> priorLevelFunctionSelfCareHygiene
   */
  private toMixedCamelCase(str: string): string {
    return str.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /**
   * Converts camelCase to kebab-snake mixed format
   * Example: priorLevelFunctionSelfCareHygiene -> prior-level-function_self-care_hygiene
   */
  private toMixedKebabSnakeCase(str: string): string {
    // Split on capital letters and convert to lowercase
    const parts = str.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1).split('-');

    // Group parts based on context to determine _ vs - separators
    // Pattern: prior-level-function_self-care_hygiene
    // Main groups: [prior, level, function] _ [self, care] _ [hygiene]
    const result: string[] = [];
    let currentGroup: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // Check if this is a major section boundary (function, care, mobility, etc.)
      const isMajorBoundary = (
        part === 'function' ||
        part === 'limitations' ||
        part === 'functional' ||
        part === 'current' ||
        part === 'prior' ||
        part === 'level' ||
        part === 'care' ||
        part === 'mobility' ||
        part === 'walking' ||
        part === 'moving' ||
        part === 'changing' ||
        part === 'maintaining' ||
        part === 'carrying' ||
        part === 'handling' ||
        part === 'comment' ||
        part === 'hygiene' ||
        part === 'sleep' ||
        part === 'iadls' ||
        part === 'household' ||
        part === 'chores' ||
        part === 'drive' ||
        part === 'community' ||
        part === 'volunteering' ||
        part === 'caregiving' ||
        part === 'around' ||
        part === 'device' ||
        part === 'different' ||
        part === 'locations' ||
        part === 'negotiate' ||
        part === 'obstacles' ||
        part === 'body' ||
        part === 'position' ||
        part === 'transfers' ||
        part === 'objects' ||
        part === 'hand' ||
        part === 'arm' ||
        part === 'use' ||
        part === 'fine' ||
        part === 'lower' ||
        part === 'extremities' ||
        part === 'integration' ||
        part === 'work' ||
        part === 'vocation' ||
        part === 'recreation' ||
        part === 'other' ||
        part === 'text' ||
        part === 'assistive' ||
        part === 'lymphedema' ||
        part === 'wound' ||
        part === 'healing' ||
        part === 'pelvic' ||
        part === 'health'
      );

      currentGroup.push(part);

      // Join with hyphen within group, use underscore at major boundaries
      if (i === parts.length - 1) {
        // Last part
        result.push(currentGroup.join('-'));
      } else if (isMajorBoundary && i < parts.length - 1) {
        // Major boundary, start new group
        result.push(currentGroup.join('-'));
        currentGroup = [];
      }
    }

    return result.join('_');
  }

  /**
   * Converts object keys from camelCase to snake_case
   */
  private convertObjectToSnakeCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectToSnakeCase(item));
    }

    const converted: any = {};
    Object.keys(obj).forEach(key => {
      const snakeKey = this.toSnakeCase(key);
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[snakeKey] = this.convertObjectToSnakeCase(value);
      } else if (Array.isArray(value)) {
        converted[snakeKey] = value.map(item =>
          typeof item === 'object' ? this.convertObjectToSnakeCase(item) : item
        );
      } else {
        converted[snakeKey] = value;
      }
    });
    return converted;
  }

  /**
   * Converts object keys from snake_case to camelCase
   */
  private convertObjectToCamelCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectToCamelCase(item));
    }

    const converted: any = {};
    Object.keys(obj).forEach(key => {
      const camelKey = this.toCamelCase(key);
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[camelKey] = this.convertObjectToCamelCase(value);
      } else if (Array.isArray(value)) {
        converted[camelKey] = value.map(item =>
          typeof item === 'object' ? this.convertObjectToCamelCase(item) : item
        );
      } else {
        converted[camelKey] = value;
      }
    });
    return converted;
  }

  /**
   * Converts object keys from mixed kebab-snake format to camelCase
   * Example: prior-level-function_self-care_hygiene -> priorLevelFunctionSelfCareHygiene
   */
  private convertObjectFromMixedToCamelCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectFromMixedToCamelCase(item));
    }

    const converted: any = {};
    Object.keys(obj).forEach(key => {
      const camelKey = this.toMixedCamelCase(key);
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[camelKey] = this.convertObjectFromMixedToCamelCase(value);
      } else if (Array.isArray(value)) {
        converted[camelKey] = value.map(item =>
          typeof item === 'object' ? this.convertObjectFromMixedToCamelCase(item) : item
        );
      } else {
        converted[camelKey] = value;
      }
    });
    return converted;
  }

  /**
   * Converts object keys from camelCase to mixed kebab-snake format
   * Example: priorLevelFunctionSelfCareHygiene -> prior-level-function_self-care_hygiene
   */
  private convertObjectToMixedKebabSnakeCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectToMixedKebabSnakeCase(item));
    }

    const converted: any = {};
    Object.keys(obj).forEach(key => {
      const mixedKey = this.toMixedKebabSnakeCase(key);
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        converted[mixedKey] = this.convertObjectToMixedKebabSnakeCase(value);
      } else if (Array.isArray(value)) {
        converted[mixedKey] = value.map(item =>
          typeof item === 'object' ? this.convertObjectToMixedKebabSnakeCase(item) : item
        );
      } else {
        converted[mixedKey] = value;
      }
    });
    return converted;
  }
  /**
  * Converts form to Subjective model for backend
  */
  toModel(formGroup: FormGroup): Subjective {
    if (!formGroup) {
      return {};
    }

    const subjective: Subjective = {};

    // Map basic section
    const basicGroup = formGroup.get('basic') as FormGroup;
    if (basicGroup) {
      subjective.basic = this.mapBasicToModel(basicGroup.getRawValue());
    }

    // Map pain section
    const painGroup = formGroup.get('pain') as FormGroup;
    if (painGroup) {
      subjective.pain = this.mapPainToModel(painGroup.getRawValue());
    }

    // Map priorFunction section
    const priorFunctionGroup = formGroup.get('priorFunction') as FormGroup;
    if (priorFunctionGroup) {
      subjective.priorFunction = this.priorFunctionMapper.toModel(priorFunctionGroup);
    }

    // Map currentFunction section
    const currentFunctionGroup = formGroup.get('currentFunction') as FormGroup;
    if (currentFunctionGroup) {

      subjective.currentFunction = this.currentFunctionMapper.toModel(currentFunctionGroup)
    }

    // Map medicalHistory section
    const medicalHistoryGroup = formGroup.get('medicalHistory') as FormGroup;
    if (medicalHistoryGroup) {
      subjective.medicalHistory = this.mapMedicalHistoryToModel(medicalHistoryGroup);
    }

    return subjective;
  }

  /**
     * Converts DTO from backend to form value object for patching
     */
  fromDto(dto: Subjective, formGroup?: FormGroup): any {
    if (!dto) {
      return {};
    }

    const formValue: any = {};

    // Map basic section
    if (dto.basic) {
      formValue.basic = this.mapBasicFromDto(dto.basic);
    }

    // Map pain section
    if (dto.pain) {
      formValue.pain = this.mapPainFromDto(dto.pain);
    }

    // Map priorFunction section
    if (dto.priorFunction) {
      const priorFunctionGroup = formGroup?.get('priorFunction') as FormGroup;
      formValue.priorFunction = this.priorFunctionMapper.fromDto(dto.priorFunction, priorFunctionGroup);
    }

    // Map currentFunction section
    if (dto.currentFunction) {
      const currentFunctionGroup = formGroup?.get('currentFunction') as FormGroup;
      this.currentFunctionMapper.fromDto(dto.currentFunction,currentFunctionGroup)
      formValue.currentFunction = this.mapCurrentFunctionFromDto(dto.currentFunction);
    }

    // Map medicalHistory section
    if (dto.medicalHistory) {
      formValue.medicalHistory = this.mapMedicalHistoryFromDto(dto.medicalHistory);
    }

    return formValue;
  }

  /**
   * Maps basic section from form (snake_case) to DTO (camelCase)
   */
  private mapBasicToModel(basic: any): Basic {
    const mapped: Basic = {
      dosDate: basic.dos_date,
      time: basic.time,
      timeIn: basic.time ? basic.time_in : undefined,
      timeOut: basic.time ? basic.time_out : undefined,
      numberOfVisit: basic.number_of_visit,
      icdtenDiagnosis: basic.icdten_diagnosis,
      treatmentDiagnosis: basic.treatment_diagnosis,
      treatmentSide: Array.isArray(basic.treatment_side) ? basic.treatment_side : [],
      specificPhysicianRders: basic.specific_physician_rders,
      specificPhysicianRdersText: basic.specific_physician_rders ? basic.specific_physician_rders_text : undefined,
      injuryOnsetDate: basic.injury_onset_date,
      chronic: basic.chronic,
      Insidious: basic.insidious,
      newInjury: basic.new_injury,
      newInjuryText: basic.new_injury ? basic.new_injury_text : undefined,
      surgeryPerformed: basic.surgery_performed,
      surgeryPerformedDateOfSurgery: basic.surgery_performed ? basic.surgery_performed_date_of_surgery : undefined,
      surgeryPerformedTypeOfSurgery: basic.surgery_performed ? basic.surgery_performed_type_of_surgery : undefined,
      priorHospitalization: basic.prior_hospitalization,
      fromDate: basic.prior_hospitalization ? basic.from_date : undefined,
      toDate: basic.prior_hospitalization ? basic.to_date : undefined,
      pelvicSpeechProfile: basic.pelvic_speech_profile,
      historyOfPresentCondition_MechanismOfInjury: basic.history_of_present_condition_mechanism_of_injury,
      primaryConcernChiefComplaint: basic.primary_concern_chief_complaint
    };

    return mapped;
  }

  /**
   * Maps basic section from DTO (camelCase) to form (snake_case)
   */
  private mapBasicFromDto(basic: any): any {
    const mapped: any = {
      dos_date: basic.dosDate,
      time: !!(basic.timeIn || basic.timeOut),
      time_in: basic.timeIn,
      time_out: basic.timeOut,
      number_of_visit: basic.numberOfVisit,
      icdten_diagnosis: basic.icdtenDiagnosis,
      treatment_diagnosis: basic.treatmentDiagnosis,
      treatment_side: Array.isArray(basic.treatmentSide) ? basic.treatmentSide : [],
      specific_physician_rders: !!basic.specificPhysicianRdersText || basic.specificPhysicianRders,
      specific_physician_rders_text: basic.specificPhysicianRdersText,
      injury_onset_date: basic.injuryOnsetDate,
      chronic: basic.chronic,
      insidious: basic.Insidious,
      new_injury: !!basic.newInjuryText || basic.newInjury,
      new_injury_text: basic.newInjuryText,
      surgery_performed: !!(basic.surgeryPerformedDateOfSurgery || basic.surgeryPerformedTypeOfSurgery) || basic.surgeryPerformed,
      surgery_performed_date_of_surgery: basic.surgeryPerformedDateOfSurgery,
      surgery_performed_type_of_surgery: basic.surgeryPerformedTypeOfSurgery,
      prior_hospitalization: !!(basic.fromDate || basic.toDate) || basic.priorHospitalization,
      from_date: basic.fromDate,
      to_date: basic.toDate,
      pelvic_speech_profile: basic.pelvicSpeechProfile,
      history_of_present_condition_mechanism_of_injury: basic.historyOfPresentCondition_MechanismOfInjury,
      primary_concern_chief_complaint: basic.primaryConcernChiefComplaint
    };

    return mapped;
  }

  /**
   * Maps pain section from form (snake_case) to DTO (camelCase)
   */
  private mapPainToModel(pain: any): Pain {
    const mapped: Pain = {
      painScale: pain.pain_scale,
      painEvaluations: pain.pain_evaluations,
      aggravatingFactors: pain.aggravating_factors,
      restrictionsPainAlleviators: pain.restrictions_pain_alleviators,
      restrictionsPainAlleviatorsText: pain.restrictions_pain_alleviators ? pain.restrictions_pain_alleviators_text : undefined
    };

    return mapped;
  }

  /**
   * Maps pain section from DTO (camelCase) to form (snake_case)
   */
  private mapPainFromDto(pain: any): any {
    const mapped: any = {
      pain_scale: pain.painScale,
      pain_evaluations: pain.painEvaluations,
      aggravating_factors: pain.aggravatingFactors,
      restrictions_pain_alleviators: !!pain.restrictionsPainAlleviatorsText || pain.restrictionsPainAlleviators,
      restrictions_pain_alleviators_text: pain.restrictionsPainAlleviatorsText
    };

    return mapped;
  }

  /**
   * Maps currentFunction section from DTO (camelCase) to form (mixed kebab-snake format)
   */
  private mapCurrentFunctionFromDto(currentFunction: any): any {
    // Set boolean flags based on presence of text fields
    if (currentFunction.currentFunctionalLimitationsFunctionOtherText) {
      currentFunction.currentFunctionalLimitationsOther = true;
    }

    if (currentFunction.currentFunctionalLimitationsFunctionOtherLymphedemaText) {
      currentFunction.currentFunctionalLimitationsFunctionOtherLymphedema = true;
    }

    if (currentFunction.currentFunctionalLimitationsFunctionOtherWoundHealingText) {
      currentFunction.currentFunctionalLimitationsFunctionOtherWoundHealing = true;
    }

    if (currentFunction.currentFunctionalLimitationsFunctionOtherPelvicHealthText) {
      currentFunction.currentFunctionalLimitationsFunctionOtherPelvicHealth = true;
    }

    // Convert all keys to mixed kebab-snake format
    // Example: currentFunctionalLimitationsSelfCareHygiene -> current-functional-limitations_self-care_hygiene
    const mapped = this.convertObjectToMixedKebabSnakeCase(currentFunction);

    return mapped;
  }

  /**
   * Maps medicalHistory section from form (snake_case) to DTO (camelCase)
   */
  private mapMedicalHistoryToModel(formGroup: FormGroup): MedicalHistory {
    const medicalHistory: MedicalHistory = {};

    // previousHistoryOfSimilarSymptoms
    const isPreviousHistoryOfSimilarSymptoms = formGroup.get('previous_history_of_similar_symptoms')?.value;
    medicalHistory.isPreviousHistoryOfSimilarSymptoms = isPreviousHistoryOfSimilarSymptoms;

    if (isPreviousHistoryOfSimilarSymptoms) {
      const previousHistorySymptoms: PreviousHistorySymptoms = {};

      // previousEpisodesOfSameComplaints
      previousHistorySymptoms.isEpisode = formGroup.get('previous_episodes_of_same_complaints')?.value;
      // previousEpisodesOfSameComplaintsRange
      previousHistorySymptoms.episodeAgerRange = formGroup.get('previous_episodes_of_same_complaints_range')?.value;
      // previousEpisodesOfSameComplaintsYearFirstEpisode
      previousHistorySymptoms.episodeYear = formGroup.get('previous_episodes_of_same_complaints_year_first_episode')?.value;
      // previousTreatmentsForSimilarSymptoms
      previousHistorySymptoms.isSimilarSymptoms = formGroup.get('previous_treatments_for_similar_symptoms')?.value;
      // previousHistoryOfSimilarSymptomsText
      previousHistorySymptoms.similarSymptomsTxt = formGroup.get('previous_history_of_similar_symptoms_text')?.value;
      // previousTreatmentsForSimilarSymptomsText
      previousHistorySymptoms.description = formGroup.get('previous_treatments_for_similar_symptoms_text')?.value;

      medicalHistory.previousHistorySymptoms = previousHistorySymptoms;
    }

    // occupationSocialHistory
    const isOccupationSocialHistory = formGroup.get('occupation_social_history')?.value;
    medicalHistory.isOccupationSocialHistory = isOccupationSocialHistory;

    if (isOccupationSocialHistory) {
      const occupationSocialHistory: OccupationSocialHistory = {};

      // occupationSocialHistorySocialHistory
      occupationSocialHistory.isSocialHistory = formGroup.get('occupation_social_history_social_history')?.value;
      // occupationSocialHistoryOccupationAndWorkStatus
      occupationSocialHistory.isWorkStatus = formGroup.get('occupation_social_history_occupation_and_work_status')?.value;
      // occupationSocialHistoryHomeLayout
      occupationSocialHistory.isHomeLayout = formGroup.get('occupation_social_history_home_layout')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentList
      occupationSocialHistory.isMedicalEquipment = formGroup.get('occupation_social_history_durable_medical_equipment')?.value;
      // occupationSocialHistoryPatientTobaccoUser
      occupationSocialHistory.isTobaccoUser = formGroup.get('occupation_social_history_patient_tobacco_user')?.value;

      // occupationSocialHistoryList
      occupationSocialHistory.socialHistoryList = formGroup.get('occupation_social_history_list')?.value;
      // occupationSocialHistoryText
      occupationSocialHistory.socialHistoryListDescription = formGroup.get('occupation_social_history_text')?.value;
      // occupationSocialHistoryOccupationAndWorkNameOfOccupation
      occupationSocialHistory.occupationName = formGroup.get('occupation_social_history_occupation_and_work_name_of_occupation')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusStatus
      occupationSocialHistory.occupationStatus = formGroup.get('occupation_social_history_occupation_and_work_status_status')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusDutyLevel
      occupationSocialHistory.occupationDutyLevel = formGroup.get('occupation_social_history_occupation_and_work_status_duty_level')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusSescription
      occupationSocialHistory.occupationDescription = formGroup.get('occupation_social_history_occupation_and_work_status_sescription')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusOutOfWorkSince
      occupationSocialHistory.occupationOutOfWorkSince = formGroup.get('occupation_social_history_occupation_and_work_status_out_of_work_since')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusReturnToWorkDate
      occupationSocialHistory.occupationReturnToWorkDate = formGroup.get('occupation_social_history_occupation_and_work_status_return_to_work_date')?.value;
      // occupationSocialHistoryHomeLayoutText
      occupationSocialHistory.homeLayoutDescription = formGroup.get('occupation_social_history_home_layout_text')?.value;
      // occupationSocialHistoryHomeLayoutList
      occupationSocialHistory.homeLayoutList = formGroup.get('occupation_social_history_home_layout_list')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentList
      occupationSocialHistory.MedicalEquipmentsList = formGroup.get('occupation_social_history_durable_medical_equipment_list')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentText
      occupationSocialHistory.MedicalEquipmentsListDescription = formGroup.get('occupation_social_history_durable_medical_equipment_text')?.value;

      // occupationSocialHistoryPatientTobaccoUserCigarettesOrAndOtherFormsTobacco
      occupationSocialHistory.isPatientUseOtherFormsOfTobacco = formGroup.get('occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco')?.value;
      // tobaccoCessationRecommendationMade, tobaccoCessationAdviceSupportProvided, tobaccoCessationContinuedSupport
      occupationSocialHistory.patientSmokerAdvices = [
        formGroup.get('tobacco_cessation_recommendation_made')?.value,
        formGroup.get('tobacco_cessation_advice_support_provided')?.value,
        formGroup.get('tobacco_cessation_continued_support')?.value
      ];
      // occupationSocialHistoryPatientTobaccoUserOtherFormText
      occupationSocialHistory.patientSmokerAdvicesDescription = formGroup.get('occupation_social_history_patient_tobacco_user_other_form_text')?.value;

      medicalHistory.occupationSocialHistory = occupationSocialHistory;
    }

    // homeHealthCare
    medicalHistory.isHomeHealthCare = formGroup.get('home_health_care')?.value;
    // homeHealthCareText
    if (medicalHistory.isHomeHealthCare) {
      medicalHistory.homeHealthCareDescription = formGroup.get('home_health_care_text')?.value;
    }

    // historyOfFalls
    const isHistoryOfFalls = formGroup.get('history_of_falls')?.value;
    medicalHistory.isHistoryOfFalls = isHistoryOfFalls;

    if (isHistoryOfFalls) {
      const historyFall: HistoryFall = {};

      // historyOfFallsDocument
      historyFall.isFallsDocumented = formGroup.get('history_of_falls_document')?.value;
      // historyOfFallsDocumentText
      historyFall.isFallsDocumentedDescription = formGroup.get('history_of_falls_document_text')?.value;
      // riskAssessmentMedicationsContributingFactor, riskAssessmentHomeFallHazards, riskAssessmentPosturalBloodPressure, riskAssessmentVision
      historyFall.riskAssessment = [
        formGroup.get('risk_assessment_medications_contributing_factor')?.value,
        formGroup.get('risk_assessment_home_fall_hazards')?.value,
        formGroup.get('risk_assessment_postural_blood_pressure')?.value,
        formGroup.get('risk_assessment_vision')?.value
      ];

      medicalHistory.historyFall = historyFall;
    }

    // Map medical history diseases
    // Prefix: "medicalHistory", Suffix: "Checkbox"
    const medicalHistoryDiseaseList: MedicalHistoryDisease[] = [];
    const medicalHistoryFields = [
      'Alzheimers',
      'CardiovascularDisease',
      'CaudaEquinaSyndrome',
      'CerebralVascularAccident',
      'CurrentInfection',
      'DiabetesMellitusType_1',
      'DiabetesMellitusType_2',
      'Fibromyalgia',
      'FractureOrSuspectedFracture',
      'HighBloodPressure',
      'HistoryOfCancer',
      'Huntingtons',
      'Immunosuppression',
      'Lupus',
      'MuscularDystrophy',
      'OtherEnterDescriptionBelow',
      'Obesity',
      'Osteoarthritis',
      'Parkinsons',
      'RheumatoidArthritis',
      'TraumaticBrainInjury'
    ];

    medicalHistoryFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `medical_history_${snakeCaseField}_checkbox`;
      const textKey = `medical_history_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        medicalHistoryDiseaseList.push({
          diseaseName: field,
          diseaseDescription: formGroup.get(textKey)?.value
        });
      }
    });

    if (medicalHistoryDiseaseList.length > 0) {
      medicalHistory.medicalHistoryDisease = medicalHistoryDiseaseList;
    }

    // Map personal complications
    // Prefix: "complicatingpersonalFactors", Suffix: "Checkbox"
    const personalComplicationList: PersonalComplication[] = [];
    const personalComplicationFields = [
      'Allergies',
      'AttitudesMotivation',
      'Character',
      'CopingStyle',
      'EducationLevel',
      'HomeEnvironment',
      'Lifestyle',
      'Litigation',
      'OtherEnterDescriptionBelow',
      'MechanismOfInjuryIllness',
      'MultipleTreatmentAreas',
      'PatientAge',
      'PreviousTherapy',
      'PsychoSocial',
      'RehabPotential',
      'SocialBackground',
      'SurgicalHistory',
      'TimeSinceOnsetOfInjuryIllness'
    ];

    personalComplicationFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `complicatingpersonal_factors_${snakeCaseField}_checkbox`;
      const textKey = `complicatingpersonal_factors_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        personalComplicationList.push({
          complicationName: field,
          complicationDescription: formGroup.get(textKey)?.value
        });
      }
    });

    if (personalComplicationList.length > 0) {
      medicalHistory.personalComplication = personalComplicationList;
    }

    // Map current medications
    // Prefix: "currentMedications", Suffix: "Checkbox"
    const currentMedicationList: CurrentMedication[] = [];
    const currentMedicationFields = [
      'Prescription',
      'OverTheCounter',
      'Herbals',
      'VitaminMineralDietarySupplements',
      'Other',
      'NotCurrentlyTakingAnyMedications'
    ];

    currentMedicationFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `current_medications_${snakeCaseField}_checkbox`;
      const textKey = `current_medications_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        currentMedicationList.push({
          medicationName: field,
          medicationDescription: formGroup.get(textKey)?.value
        });
      }
    });

    if (currentMedicationList.length > 0) {
      medicalHistory.currentMedication = currentMedicationList;
    }

    // generalHealth
    medicalHistory.generalHealth = formGroup.get('general_health')?.value;
    // diagnosticTesting_Imaging
    medicalHistory.diagnosticTest = formGroup.get('diagnostic_testing_imaging')?.value;
    // patientGoals
    medicalHistory.patientGoals = formGroup.get('patient_goals')?.value;

    // medicalHistoryReview
    medicalHistory.medicalHistoryReview = formGroup.get('medical_history_review')?.value;
    // mentalStatusCognitiveFunctionAppearsImpaired
    medicalHistory.isMentalStatus = formGroup.get('mental_status_cognitive_function_appears_impaired')?.value;
    // mentalStatusCognitiveFunctionAppearsImpairedText
    if (medicalHistory.isMentalStatus) {
      medicalHistory.mentalStatusDescription = formGroup.get('mental_status_cognitive_function_appears_impaired_text')?.value;
    }
    // unexplainedWeightLoss
    medicalHistory.weightLoss = formGroup.get('unexplained_weight_loss')?.value;

    return medicalHistory;
  }

  /**
   * Maps medicalHistory section from DTO (camelCase) to form (snake_case)
   */
  private mapMedicalHistoryFromDto(medicalHistory: any): any {
    const mapped = { ...medicalHistory };

    // Set boolean flags based on presence of related fields
    const conditionalChecks: Array<{ checkbox: string; fields: string[] }> = [
      { checkbox: 'previousHistoryOfSimilarSymptoms', fields: ['previousHistoryOfSimilarSymptomsText'] },
      { checkbox: 'previousTreatmentsForSimilarSymptoms', fields: ['previousTreatmentsForSimilarSymptomsText'] },
      { checkbox: 'occupationSocialHistory', fields: ['occupationSocialHistoryList', 'occupationSocialHistoryText'] },
      {
        checkbox: 'occupationSocialHistoryOccupationAndWorkStatus',
        fields: [
          'occupationSocialHistoryOccupationAndWorkNameOfOccupation',
          'occupationSocialHistoryOccupationAndWorkStatusStatus',
          'occupationSocialHistoryOccupationAndWorkStatusDutyLevel',
          'occupationSocialHistoryOccupationAndWorkStatusSescription',
          'occupationSocialHistoryOccupationAndWorkStatusOutOfWorkSince',
          'occupationSocialHistoryOccupationAndWorkStatusReturnToWorkDate'
        ]
      },
      { checkbox: 'occupationSocialHistoryHomeLayout', fields: ['occupationSocialHistoryHomeLayoutList', 'occupationSocialHistoryHomeLayoutText'] },
      { checkbox: 'occupationSocialHistoryDurableMedicalEquipment', fields: ['occupationSocialHistoryDurableMedicalEquipmentList', 'occupationSocialHistoryDurableMedicalEquipmentText'] },
      { checkbox: 'occupationSocialHistoryPatientTobaccoUser', fields: ['occupationSocialHistoryPatientTobaccoUserCigarettesOrAndOtherFormsTobacco', 'occupationSocialHistoryPatientTobaccoUserOtherFormText'] },
      { checkbox: 'homeHealthCare', fields: ['homeHealthCareText'] },
      { checkbox: 'historyOfFallsDocument', fields: ['historyOfFallsDocumentText'] },
      { checkbox: 'mentalStatusCognitiveFunctionAppearsImpaired', fields: ['mentalStatusCognitiveFunctionAppearsImpairedText'] }
    ];

    conditionalChecks.forEach(({ checkbox, fields }) => {
      if (fields.some(field => mapped[field])) {
        mapped[checkbox] = true;
      }
    });

    // Handle checkbox-text pairs
    const checkboxTextPairs = [
      'medicalHistoryNoKnownSignificantPmhToAffectTreatment',
      'medicalHistoryAlzheimers',
      'medicalHistoryCardiovascularDisease',
      'medicalHistoryCaudaEquinaSyndrome',
      'medicalHistoryCerebralVascularAccident',
      'medicalHistoryCurrentInfection',
      'medicalHistoryDiabetesMellitusType_1',
      'medicalHistoryDiabetesMellitusType_2',
      'medicalHistoryFibromyalgia',
      'medicalHistoryFractureOrSuspectedFracture',
      'medicalHistoryHighBloodPressure',
      'medicalHistoryHistoryOfCancer',
      'medicalHistoryHuntingtons',
      'medicalHistoryImmunosuppression',
      'medicalHistoryLupus',
      'medicalHistoryMuscularDystrophy',
      'medicalHistoryOtherEnterDescriptionBelow',
      'medicalHistoryObesity',
      'medicalHistoryOsteoarthritis',
      'medicalHistoryParkinsons',
      'medicalHistoryRheumatoidArthritis',
      'medicalHistoryTraumaticBrainInjury',
      'complicatingpersonalFactorsNoKnownComplicatingFactorsAffectingThePlanOfCare',
      'complicatingpersonalFactorsAllergies',
      'complicatingpersonalFactorsAttitudesMotivation',
      'complicatingpersonalFactorsCharacter',
      'complicatingpersonalFactorsCopingStyle',
      'complicatingpersonalFactorsEducationLevel',
      'complicatingpersonalFactorsHomeEnvironment',
      'complicatingpersonalFactorsLifestyle',
      'complicatingpersonalFactorsLitigation',
      'complicatingpersonalFactorsOtherEnterDescriptionBelow',
      'complicatingpersonalFactorsMechanismOfInjuryIllness',
      'complicatingpersonalFactorsMultipleTreatmentAreas',
      'complicatingpersonalFactorsPatientAge',
      'complicatingpersonalFactorsPreviousTherapy',
      'complicatingpersonalFactorsPsychoSocial',
      'complicatingpersonalFactorsRehabPotential',
      'complicatingpersonalFactorsSocialBackground',
      'complicatingpersonalFactorsSurgicalHistory',
      'complicatingpersonalFactorsTimeSinceOnsetOfInjuryIllness',
      'currentMedicationsPrescription',
      'currentMedicationsOverTheCounter',
      'currentMedicationsHerbals',
      'currentMedicationsVitaminMineralDietarySupplements',
      'currentMedicationsOther',
      'currentMedicationsNotCurrentlyTakingAnyMedications'
    ];

    checkboxTextPairs.forEach(base => {
      const checkboxKey = `${base}Checkbox`;
      const textKey = `${base}Text`;
      if (mapped[textKey]) {
        mapped[checkboxKey] = true;
      }
    });

    // Convert all keys to snake_case for form
    return this.convertObjectToSnakeCase(mapped);
  }
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subjective } from '../models/Subjective';
import { Basic } from '../models/Basic';
import { Pain } from '../models/Pain';
import { PriorFunction } from '../models/PriorFunction';
import { CurrentFunction } from '../models/CurrentFunction';
import { MedicalHistory } from '../models/MedicalHistory';

@Injectable({
  providedIn: 'root'
})
export class SubjectiveMapperService {

  constructor() { }

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
      subjective.priorFunction = this.mapPriorFunctionToModel(priorFunctionGroup);
    }

    // Map currentFunction section
    const currentFunctionGroup = formGroup.get('currentFunction') as FormGroup;
    if (currentFunctionGroup) {
      subjective.currentFunction = this.mapCurrentFunctionToModel(currentFunctionGroup.getRawValue());
    }

    // Map medicalHistory section
    const medicalHistoryGroup = formGroup.get('medicalHistory') as FormGroup;
    if (medicalHistoryGroup) {
      subjective.medicalHistory = this.mapMedicalHistoryToModel(medicalHistoryGroup.getRawValue());
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
      formValue.priorFunction = this.mapPriorFunctionFromDto(dto.priorFunction, priorFunctionGroup);
    }

    // Map currentFunction section
    if (dto.currentFunction) {
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
   * Maps priorFunction section from form to DTO
   * @param formGroup - The priorFunction FormGroup containing all form controls
   */
  private mapPriorFunctionToModel(formGroup: FormGroup): PriorFunction {
    console.log('mapPriorFunctionToModel')
    const mapped: PriorFunction = {};

    // Helper to get value from form control
    const getValue = (controlName: string) => {
      const value = formGroup.get(controlName)?.value;
      // Return the value as-is, including false
      return value;
    };

    // ========== SELF CARE ==========

    // Self Care - Hygiene
    const hygieneFlag = getValue('prior-level-function_self-care_hygiene');
    if (hygieneFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.hygieneFlag = hygieneFlag;
    }

    // Hygiene - Grooming
    const groomingFlag = getValue('prior-level-function_self-care_hygiene_grooming');
    if (groomingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.groomingFlag = groomingFlag;
    }

    const washingBodyParts = getValue('prior-level-function_self-care_hygiene_grooming_washing_body_parts');
    if (washingBodyParts !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.washingBodyParts = washingBodyParts;
    }

    const washingWholeBody = getValue('prior-level-function_self-care_hygiene_grooming_washing_whole_body');
    if (washingWholeBody !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.washingWholeBody = washingWholeBody;
    }

    const dryingOneself = getValue('prior-level-function_self-care_hygiene_grooming_drying_oneself');
    if (dryingOneself !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.dryingOneself = dryingOneself;
    }

    const caringForSkin = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_skin');
    if (caringForSkin !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForSkin = caringForSkin;
    }

    const caringForTeeth = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_teeth');
    if (caringForTeeth !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForTeeth = caringForTeeth;
    }

    const caringForHair = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_hair');
    if (caringForHair !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForHair = caringForHair;
    }

    const caringForNails = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_nails');
    if (caringForNails !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForNailsToeFinger = caringForNails;
    }

    // Hygiene - Looking After Health
    const lookingAfterHealthFlag = getValue('prior-level-function_self-care_hygiene_looking_after_health');
    if (lookingAfterHealthFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealthFlag = lookingAfterHealthFlag;
    }

    const balancedDiet = getValue('prior-level-function_self-care_hygiene_looking_after_health_balanced_diet');
    if (balancedDiet !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.maintainingBalancedDiet = balancedDiet;
    }

    const keepingWarm = getValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_warm');
    if (keepingWarm !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.keepingWarm = keepingWarm;
    }

    const keepingCool = getValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_cool');
    if (keepingCool !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.keepingCool = keepingCool;
    }

    const immunizations = getValue('prior-level-function_self-care_hygiene_looking_after_health_immunizations');
    if (immunizations !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.gettingImmunizations = immunizations;
    }

    const physicalExams = getValue('prior-level-function_self-care_hygiene_looking_after_health_physical_exams');
    if (physicalExams !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.gettingRegularPhysicalExaminations = physicalExams;
    }

    // Hygiene - Dressing
    const dressingFlag = getValue('prior-level-function_self-care_hygiene_dressing');
    if (dressingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.dressingFlag = dressingFlag;
    }

    const puttingOnClothes = getValue('prior-level-function_self-care_hygiene_dressing_putting_on_clothes');
    if (puttingOnClothes !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnClothes = puttingOnClothes;
    }

    const puttingOnFootwear = getValue('prior-level-function_self-care_hygiene_dressing_putting_on_footwear');
    if (puttingOnFootwear !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnFootwear = puttingOnFootwear;
    }

    const appropriateClothing = getValue('prior-level-function_self-care_hygiene_dressing_appropriate_clothing');
    if (appropriateClothing !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnAppropriateClothing = appropriateClothing;
    }

    const removingClothes = getValue('prior-level-function_self-care_hygiene_dressing_removing_clothes');
    if (removingClothes !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.removingClothes = removingClothes;
    }

    const removingFootwear = getValue('prior-level-function_self-care_hygiene_dressing_removing_footwear');
    if (removingFootwear !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.removingFootwear = removingFootwear;
    }

    // Hygiene - Bathing
    const bathingFlag = getValue('prior-level-function_self-care_hygiene_bathing');
    if (bathingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.bathingFlag = bathingFlag;
    }

    const showering = getValue('prior-level-function_self-care_hygiene_bathing_showering');
    if (showering !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.showering = showering;
    }

    const bathingTub = getValue('prior-level-function_self-care_hygiene_bathing_bathing_tub');
    if (bathingTub !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.bathing = bathingTub;
    }

    const bathingWashParts = getValue('prior-level-function_self-care_hygiene_bathing_bathing_wash_parts');
    if (bathingWashParts !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.washingBodyParts = bathingWashParts;
    }

    const bathingDrying = getValue('prior-level-function_self-care_hygiene_bathing_bathing_drying');
    if (bathingDrying !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.dryingOneself = bathingDrying;
    }

    // Hygiene - Toileting
    const toiletingFlag = getValue('prior-level-function_self-care_hygiene_toileting');
    if (toiletingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.toiletingFlag = toiletingFlag;
    }

    const urination = getValue('prior-level-function_self-care_hygiene_toileting_urination');
    if (urination !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingUrination = urination;
    }

    const defecation = getValue('prior-level-function_self-care_hygiene_toileting_defecation');
    if (defecation !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingDefecation = defecation;
    }

    const menstrualCare = getValue('prior-level-function_self-care_hygiene_toileting_menstrual_care');
    if (menstrualCare !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingMenstrualCare = menstrualCare;
    }

    // Self Care - Sleep Flag
    const sleepFlag = getValue('prior-level-function_self-care_sleep');
    if (sleepFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.sleepFlag = sleepFlag;
    }

    // Sleep - Disturbed Sleep (leaf field)
    const disturbedSleep = getValue('prior-level-function_self-care_sleep_disturbed_sleep');
    if (disturbedSleep !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.disturbedSleep = disturbedSleep;
    }

    // Sleep - Sleeping Postures Flag
    const sleepingPosturesFlag = getValue('prior-level-function_self-care_sleep_sleeping_postures');
    if (sleepingPosturesFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.sleepingPosturesFlag = sleepingPosturesFlag;
    }

    const sleepProne = getValue('prior-level-function_self-care_sleep_sleeping_postures_prone');
    if (sleepProne !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.prone = sleepProne;
    }

    const sleepSupine = getValue('prior-level-function_self-care_sleep_sleeping_postures_supine');
    if (sleepSupine !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.supine = sleepSupine;
    }

    const sleepSideRight = getValue('prior-level-function_self-care_sleep_sleeping_postures_side_right');
    if (sleepSideRight !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.sideR = sleepSideRight;
    }

    const sleepSideLeft = getValue('prior-level-function_self-care_sleep_sleeping_postures_side_left');
    if (sleepSideLeft !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.sideL = sleepSideLeft;
    }

    const sleepPillows = getValue('prior-level-function_self-care_sleep_pillows');
    if (sleepPillows !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.pillows = sleepPillows;
    }

    // Sleep - Surface Flag
    const surfaceFlag = getValue('prior-level-function_self-care_sleep_surface');
    if (surfaceFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.surfaceFlag = surfaceFlag;
    }

    const sleepSurfaceFirm = getValue('prior-level-function_self-care_sleep_surface_firm');
    if (sleepSurfaceFirm !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.firm = sleepSurfaceFirm;
    }

    const sleepSurfaceSoft = getValue('prior-level-function_self-care_sleep_surface_soft');
    if (sleepSurfaceSoft !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.soft = sleepSurfaceSoft;
    }

    const sleepSurfaceSag = getValue('prior-level-function_self-care_sleep_surface_sag');
    if (sleepSurfaceSag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.sag = sleepSurfaceSag;
    }

    // Self Care - IADLs
    const iADLsFlag = getValue('prior-level-function_self-care_iadls');
    if (iADLsFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.iADLsFlag = iADLsFlag;
    }

    const iADLsTelephone = getValue('prior-level-function_self-care_iadls_use_telephone');
    if (iADLsTelephone !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.abilityToUseTelephone = iADLsTelephone;
    }

    const iADLsShopping = getValue('prior-level-function_self-care_iadls_shopping');
    if (iADLsShopping !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.shopping = iADLsShopping;
    }

    const iADLsFoodPrep = getValue('prior-level-function_self-care_iadls_food_prep');
    if (iADLsFoodPrep !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.foodPreparation = iADLsFoodPrep;
    }

    const iADLsHousekeeping = getValue('prior-level-function_self-care_iadls_housekeeping');
    if (iADLsHousekeeping !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.housekeeping = iADLsHousekeeping;
    }

    const iADLsLaundry = getValue('prior-level-function_self-care_iadls_laundry_iadl');
    if (iADLsLaundry !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.laundry = iADLsLaundry;
    }

    const iADLsTransportation = getValue('prior-level-function_self-care_iadls_transportation');
    if (iADLsTransportation !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.modeOfTransportation = iADLsTransportation;
    }

    const iADLsMedications = getValue('prior-level-function_self-care_iadls_medications');
    if (iADLsMedications !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.responsibilityForOwnMedications = iADLsMedications;
    }

    const iADLsFinances = getValue('prior-level-function_self-care_iadls_finances');
    if (iADLsFinances !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iADLs) mapped.selfCare.iADLs = {} as any;
      mapped.selfCare.iADLs.abilityToHandleFinances = iADLsFinances;
    }

    // Self Care - Household Chores
    const householdChoresFlag = getValue('prior-level-function_self-care_household_chores');
    if (householdChoresFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.householdChoresFlag = householdChoresFlag;
    }

    const householdChoresCook = getValue('prior-level-function_self-care_household_chores_cook_meal');
    if (householdChoresCook !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.householdChores) mapped.selfCare.householdChores = {} as any;
      mapped.selfCare.householdChores.cookAMeal = householdChoresCook;
    }

    const householdChoresLaundry = getValue('prior-level-function_self-care_household_chores_laundry_chore');
    if (householdChoresLaundry !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.householdChores) mapped.selfCare.householdChores = {} as any;
      mapped.selfCare.householdChores.laundry = householdChoresLaundry;
    }

    // Self Care - Drive Community
    const driveCommunity = getValue('prior-level-function_self-care_drive_community');
    if (driveCommunity !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.driveCommunityDistance = driveCommunity;
    }

    // Self Care - Volunteering
    const volunteering = getValue('prior-level-function_self-care_volunteering');
    if (volunteering !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.volunteering = volunteering;
    }

    // Self Care - Caregiving
    const caregiving = getValue('prior-level-function_self-care_caregiving');
    if (caregiving !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.caregiving = caregiving;
    }

    // Continue in next part due to length...
    this.mapMobilityWalkingMovingAround(formGroup, mapped, getValue);
    this.mapChangingMaintainingBodyPosition(formGroup, mapped, getValue);
    this.mapCarryingMovingHandlingObjects(formGroup, mapped, getValue);
    this.mapPriorFunctionComments(formGroup, mapped, getValue);

    return mapped;
  }

  private mapMobilityWalkingMovingAround(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== MOBILITY WALKING MOVING AROUND ==========

    // IADLs
    const mobilityIADLsTelephone = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_use_telephone');
    if (mobilityIADLsTelephone !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.abilityToUseTelephone = mobilityIADLsTelephone;
    }

    const mobilityIADLsShopping = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_shopping');
    if (mobilityIADLsShopping !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.shopping = mobilityIADLsShopping;
    }

    const mobilityIADLsFoodPrep = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_food_prep');
    if (mobilityIADLsFoodPrep !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.foodPreparation = mobilityIADLsFoodPrep;
    }

    const mobilityIADLsHousekeeping = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_housekeeping');
    if (mobilityIADLsHousekeeping !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.housekeeping = mobilityIADLsHousekeeping;
    }

    const mobilityIADLsLaundry = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_laundry');
    if (mobilityIADLsLaundry !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.laundry = mobilityIADLsLaundry;
    }

    const mobilityIADLsTransportation = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_transportation');
    if (mobilityIADLsTransportation !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.modeOfTransportation = mobilityIADLsTransportation;
    }

    const mobilityIADLsMedications = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_medications');
    if (mobilityIADLsMedications !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.responsibilityForOwnMedications = mobilityIADLsMedications;
    }

    const mobilityIADLsFinances = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_finances');
    if (mobilityIADLsFinances !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
      mapped.mobilityWalkingMovingAround.iADLs.abilityToHandleFinances = mobilityIADLsFinances;
    }

    // Assistive Device
    const assistiveDevice = getValue('prior-level-function_mobility-walking-moving-around_assistive_device');
    if (assistiveDevice !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      mapped.mobilityWalkingMovingAround.useOfAnAssistiveDevice = assistiveDevice;
    }

    // Walking
    const walkingForward = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_forward');
    if (walkingForward !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.forward = walkingForward;
    }

    const walkingBackward = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_backward');
    if (walkingBackward !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.backward = walkingBackward;
    }

    const walkingSideways = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_sideways');
    if (walkingSideways !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.sideways = walkingSideways;
    }

    const walkingStrolling = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_strolling');
    if (walkingStrolling !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.strolling = walkingStrolling;
    }

    const walkingSurfaces = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_surfaces');
    if (walkingSurfaces !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.walkingOnDifferentSurfaces = walkingSurfaces;
    }

    const walkingObstacles = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_obstacles');
    if (walkingObstacles !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
      mapped.mobilityWalkingMovingAround.walking.walkingAroundObstacles = walkingObstacles;
    }

    // Moving Around
    const climbing = getValue('prior-level-function_mobility-walking-moving-around_moving_around_climbing');
    if (climbing !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.climbing = climbing;
    }

    const running = getValue('prior-level-function_mobility-walking-moving-around_moving_around_running');
    if (running !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.running = running;
    }

    const jogging = getValue('prior-level-function_mobility-walking-moving-around_moving_around_jogging');
    if (jogging !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.jogging = jogging;
    }

    const skipping = getValue('prior-level-function_mobility-walking-moving-around_moving_around_skipping');
    if (skipping !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.skipping = skipping;
    }

    const jumping = getValue('prior-level-function_mobility-walking-moving-around_moving_around_jumping');
    if (jumping !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.jumping = jumping;
    }

    const swimming = getValue('prior-level-function_mobility-walking-moving-around_moving_around_swimming');
    if (swimming !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
      mapped.mobilityWalkingMovingAround.movingAround.swimming = swimming;
    }

    // Moving Around In Different Locations
    const betweenRoomsStairs = getValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_stairs');
    if (betweenRoomsStairs !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms.stairs = betweenRoomsStairs;
    }

    const betweenRoomsInHome = getValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_in_home');
    if (betweenRoomsInHome !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms.inHome = betweenRoomsInHome;
    }

    const downStreetCommunity = getValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street_community_distances');
    if (downStreetCommunity !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet.communityDistances = downStreetCommunity;
    }

    const withinBuilding = getValue('prior-level-function_mobility-walking-moving-around_different_locations_within_building');
    if (withinBuilding !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingWithinABuilding = withinBuilding;
    }

    const equipmentWalker = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_walker');
    if (equipmentWalker !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.walker = equipmentWalker;
    }

    const equipmentWheelchair = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_wheelchair');
    if (equipmentWheelchair !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.wheelchair = equipmentWheelchair;
    }

    const equipmentSkates = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skates');
    if (equipmentSkates !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.skates = equipmentSkates;
    }

    const equipmentSkis = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skis');
    if (equipmentSkis !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.skis = equipmentSkis;
    }

    const transportOnOffBus = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_on_off_bus');
    if (transportOnOffBus !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.onOffBus = transportOnOffBus;
    }

    const transportSubway = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_subway');
    if (transportSubway !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.subway = transportSubway;
    }

    const transportPublic = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_public_transport');
    if (transportPublic !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
      if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
      mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.publicTransportation = transportPublic;
    }

    // Negotiate Obstacles
    const crowdedStreets = getValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets');
    if (crowdedStreets !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.negotiateObstacles) mapped.mobilityWalkingMovingAround.negotiateObstacles = {} as any;
      mapped.mobilityWalkingMovingAround.negotiateObstacles.bumpedInCrowdedStreets = crowdedStreets;
    }

    const terrain = getValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain');
    if (terrain !== undefined) {
      if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
      if (!mapped.mobilityWalkingMovingAround.negotiateObstacles) mapped.mobilityWalkingMovingAround.negotiateObstacles = {} as any;
      mapped.mobilityWalkingMovingAround.negotiateObstacles.terrain = terrain;
    }
  }

  private mapChangingMaintainingBodyPosition(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== CHANGING MAINTAINING BODY POSITION ==========

    // Maintaining A Body Position
    const remainingSeated = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated');
    if (remainingSeated !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.remainingSeated = remainingSeated;
    }

    const remainingStanding = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing');
    if (remainingStanding !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.remainingStanding = remainingStanding;
    }

    const squatting = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_squatting');
    if (squatting !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.squatting = squatting;
    }

    const kneeling = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling');
    if (kneeling !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.kneeling = kneeling;
    }

    const sitting = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_sitting');
    if (sitting !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.sitting = sitting;
    }

    const standing = getValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_standing');
    if (standing !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
      mapped.changingMaintainingBodyPosition.maintainingABodyPosition.standing = standing;
    }

    // Transfers
    const bedToChair = getValue('prior-level-function_changing-maintaining-body-position_transfers_bed_to_chair');
    if (bedToChair !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.transfers) mapped.changingMaintainingBodyPosition.transfers = {} as any;
      mapped.changingMaintainingBodyPosition.transfers.movingFromBedToChair = bedToChair;
    }

    const slidingBench = getValue('prior-level-function_changing-maintaining-body-position_transfers_sliding_bench');
    if (slidingBench !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.transfers) mapped.changingMaintainingBodyPosition.transfers = {} as any;
      mapped.changingMaintainingBodyPosition.transfers.slidingAlongABench = slidingBench;
    }

    // Body Position IADLs
    const bodyPositionTelephone = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone');
    if (bodyPositionTelephone !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.abilityToUseTelephone = bodyPositionTelephone;
    }

    const bodyPositionShopping = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping');
    if (bodyPositionShopping !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.shopping = bodyPositionShopping;
    }

    const bodyPositionFoodPrep = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep');
    if (bodyPositionFoodPrep !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.foodPreparation = bodyPositionFoodPrep;
    }

    const bodyPositionHousekeeping = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping');
    if (bodyPositionHousekeeping !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.housekeeping = bodyPositionHousekeeping;
    }

    const bodyPositionLaundry = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry');
    if (bodyPositionLaundry !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.laundry = bodyPositionLaundry;
    }

    const bodyPositionTransportation = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation');
    if (bodyPositionTransportation !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.modeOfTransportation = bodyPositionTransportation;
    }

    const bodyPositionMedications = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications');
    if (bodyPositionMedications !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.responsibilityForOwnMedications = bodyPositionMedications;
    }

    const bodyPositionFinances = getValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances');
    if (bodyPositionFinances !== undefined) {
      if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
      if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
      mapped.changingMaintainingBodyPosition.iADLs.abilityToHandleFinances = bodyPositionFinances;
    }
  }

  private mapCarryingMovingHandlingObjects(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== CARRYING MOVING HANDLING OBJECTS ==========

    // Carrying IADLs
    const carryingTelephone = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone');
    if (carryingTelephone !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.abilityToUseTelephone = carryingTelephone;
    }

    const carryingShopping = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping');
    if (carryingShopping !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.shopping = carryingShopping;
    }

    const carryingFoodPrep = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep');
    if (carryingFoodPrep !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.foodPreparation = carryingFoodPrep;
    }

    const carryingHousekeeping = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping');
    if (carryingHousekeeping !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.housekeeping = carryingHousekeeping;
    }

    const carryingLaundry = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry');
    if (carryingLaundry !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.laundry = carryingLaundry;
    }

    const carryingTransportation = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation');
    if (carryingTransportation !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.modeOfTransportation = carryingTransportation;
    }

    const carryingMedications = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications');
    if (carryingMedications !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.responsibilityForOwnMedications = carryingMedications;
    }

    const carryingFinances = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances');
    if (carryingFinances !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
      mapped.carryingMovingHandlingObjects.iADLs.abilityToHandleFinances = carryingFinances;
    }

    // Hand Arm Use
    const pullingObjects = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects');
    if (pullingObjects !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.pullingObjects = pullingObjects;
    }

    const pushingObjects = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects');
    if (pushingObjects !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.pushingObjects = pushingObjects;
    }

    const reaching = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_reaching');
    if (reaching !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.reaching = reaching;
    }

    const turningHandsArms = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms');
    if (turningHandsArms !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.turningHandsOrArms = turningHandsArms;
    }

    const twistingHandsArms = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms');
    if (twistingHandsArms !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.twistingHandsOrArms = twistingHandsArms;
    }

    const throwing = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_throwing');
    if (throwing !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.throwing = throwing;
    }

    const catching = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_catching');
    if (catching !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
      mapped.carryingMovingHandlingObjects.handArmUse.catching = catching;
    }

    // Fine Hand Use
    const pickingUp = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up');
    if (pickingUp !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
      mapped.carryingMovingHandlingObjects.fineHandUse.pickingUp = pickingUp;
    }

    const grasping = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_grasping');
    if (grasping !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
      mapped.carryingMovingHandlingObjects.fineHandUse.grasping = grasping;
    }

    const manipulating = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating');
    if (manipulating !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
      mapped.carryingMovingHandlingObjects.fineHandUse.manipulating = manipulating;
    }

    const releasing = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_releasing');
    if (releasing !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
      mapped.carryingMovingHandlingObjects.fineHandUse.releasing = releasing;
    }

    // Moving Objects With Lower Extremities
    const kicking = getValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_kicking');
    if (kicking !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
      mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.kicking = kicking;
    }

    const pushingLowerExtremities = getValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities');
    if (pushingLowerExtremities !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
      mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.pushingWithLowerExtremities = pushingLowerExtremities;
    }

    // Community Integration
    const communityIntegration = getValue('prior-level-function_carrying-moving-handling-objects_community_integration');
    if (communityIntegration !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      mapped.carryingMovingHandlingObjects.communityIntegrationAccess = communityIntegration;
    }

    // Work Vocation
    const workVocation = getValue('prior-level-function_carrying-moving-handling-objects_work_vocation');
    if (workVocation !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      mapped.carryingMovingHandlingObjects.workVocationOccupation = workVocation;
    }

    // Recreation
    const recreationSports = getValue('prior-level-function_carrying-moving-handling-objects_recreation_sports');
    if (recreationSports !== undefined) {
      if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
      if (!mapped.carryingMovingHandlingObjects.recreation) mapped.carryingMovingHandlingObjects.recreation = {} as any;
      mapped.carryingMovingHandlingObjects.recreation.sports = recreationSports;
    }
  }

  private mapPriorFunctionComments(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== COMMENTS ==========

    const priorLevelFunctionOther = getValue('priorLevelFunctionOther');
    if (priorLevelFunctionOther !== undefined) {
      mapped.priorLevelFunctionOther = priorLevelFunctionOther;
    }

    const priorLevelFunctionOtherText = getValue('priorLevelFunctionOtherText');
    if (priorLevelFunctionOtherText !== undefined && priorLevelFunctionOtherText !== '') {
      mapped.priorLevelFunctionOtherText = priorLevelFunctionOtherText;
    }

    const priorLevelFunctionSelfCareComment = getValue('priorLevelFunctionSelfCareComment');
    if (priorLevelFunctionSelfCareComment !== undefined && priorLevelFunctionSelfCareComment !== '') {
      mapped.priorLevelFunctionSelfCareComment = priorLevelFunctionSelfCareComment;
    }

    const priorLevelFunctionMobilityComment = getValue('priorLevelFunctionMobilityWalkingMovingAroundComment');
    if (priorLevelFunctionMobilityComment !== undefined && priorLevelFunctionMobilityComment !== '') {
      mapped.priorLevelFunctionMobilityWalkingMovingAroundComment = priorLevelFunctionMobilityComment;
    }

    const priorLevelFunctionChangingComment = getValue('priorLevelFunctionChangingMaintainingBodyPositionComment');
    if (priorLevelFunctionChangingComment !== undefined && priorLevelFunctionChangingComment !== '') {
      mapped.priorLevelFunctionChangingMaintainingBodyPositionComment = priorLevelFunctionChangingComment;
    }

    const priorLevelFunctionCarryingComment = getValue('priorLevelFunctionCarryingMovingHandlingObjectsComment');
    if (priorLevelFunctionCarryingComment !== undefined && priorLevelFunctionCarryingComment !== '') {
      mapped.priorLevelFunctionCarryingMovingHandlingObjectsComment = priorLevelFunctionCarryingComment;
    }
  }

  /**
   * Maps priorFunction section from DTO to form values
   * @param priorFunction - The PriorFunction DTO from backend
   * @param formGroup - Optional FormGroup to set values directly
   * @returns Object that can be used with formGroup.patchValue()
   */
  private mapPriorFunctionFromDto(priorFunction: PriorFunction, formGroup?: FormGroup): any {
    if (!priorFunction) return {};

    const formValue: any = {};

    // Helper to set value in both formValue object and optionally in formGroup
    const setValue = (controlName: string, value: any) => {
      if (value !== undefined && value !== null) {
        formValue[controlName] = value;
        if (formGroup) {
          formGroup.get(controlName)?.setValue(value);
        }
      }
    };

    // ========== SELF CARE ==========
    if (priorFunction.selfCare) {
      const selfCare = priorFunction.selfCare;

      // Hygiene Flag
      setValue('prior-level-function_self-care_hygiene', selfCare.hygieneFlag);

      if (selfCare.hygiene) {
        const hygiene = selfCare.hygiene;

        // Grooming
        setValue('prior-level-function_self-care_hygiene_grooming', hygiene.groomingFlag);
        if (hygiene.grooming) {
          setValue('prior-level-function_self-care_hygiene_grooming_washing_body_parts', hygiene.grooming.washingBodyParts);
          setValue('prior-level-function_self-care_hygiene_grooming_washing_whole_body', hygiene.grooming.washingWholeBody);
          setValue('prior-level-function_self-care_hygiene_grooming_drying_oneself', hygiene.grooming.dryingOneself);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_skin', hygiene.grooming.caringForSkin);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_teeth', hygiene.grooming.caringForTeeth);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_hair', hygiene.grooming.caringForHair);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_nails', hygiene.grooming.caringForNailsToeFinger);
        }

        // Looking After Health
        setValue('prior-level-function_self-care_hygiene_looking_after_health', hygiene.lookingAfterHealthFlag);
        if (hygiene.lookingAfterHealth) {
          setValue('prior-level-function_self-care_hygiene_looking_after_health_balanced_diet', hygiene.lookingAfterHealth.maintainingBalancedDiet);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_warm', hygiene.lookingAfterHealth.keepingWarm);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_cool', hygiene.lookingAfterHealth.keepingCool);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_immunizations', hygiene.lookingAfterHealth.gettingImmunizations);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_physical_exams', hygiene.lookingAfterHealth.gettingRegularPhysicalExaminations);
        }

        // Dressing
        setValue('prior-level-function_self-care_hygiene_dressing', hygiene.dressingFlag);
        if (hygiene.dressing) {
          setValue('prior-level-function_self-care_hygiene_dressing_putting_on_clothes', hygiene.dressing.puttingOnClothes);
          setValue('prior-level-function_self-care_hygiene_dressing_putting_on_footwear', hygiene.dressing.puttingOnFootwear);
          setValue('prior-level-function_self-care_hygiene_dressing_appropriate_clothing', hygiene.dressing.puttingOnAppropriateClothing);
          setValue('prior-level-function_self-care_hygiene_dressing_removing_clothes', hygiene.dressing.removingClothes);
          setValue('prior-level-function_self-care_hygiene_dressing_removing_footwear', hygiene.dressing.removingFootwear);
        }

        // Bathing
        setValue('prior-level-function_self-care_hygiene_bathing', hygiene.bathingFlag);
        if (hygiene.bathing) {
          setValue('prior-level-function_self-care_hygiene_bathing_showering', hygiene.bathing.showering);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_tub', hygiene.bathing.bathing);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_wash_parts', hygiene.bathing.washingBodyParts);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_drying', hygiene.bathing.dryingOneself);
        }

        // Toileting
        setValue('prior-level-function_self-care_hygiene_toileting', hygiene.toiletingFlag);
        if (hygiene.toileting) {
          setValue('prior-level-function_self-care_hygiene_toileting_urination', hygiene.toileting.regulatingUrination);
          setValue('prior-level-function_self-care_hygiene_toileting_defecation', hygiene.toileting.regulatingDefecation);
          setValue('prior-level-function_self-care_hygiene_toileting_menstrual_care', hygiene.toileting.regulatingMenstrualCare);
        }
      }

      // Sleep
      setValue('prior-level-function_self-care_sleep', selfCare.sleepFlag);
      if (selfCare.sleep) {
        // Map sleep children
        setValue('prior-level-function_self-care_sleep_disturbed_sleep', selfCare.sleep.disturbedSleep);
        setValue('prior-level-function_self-care_sleep_sleeping_postures', selfCare.sleep.sleepingPosturesFlag);
        if (selfCare.sleep.sleepingPostures) {
          setValue('prior-level-function_self-care_sleep_sleeping_postures_prone', selfCare.sleep.sleepingPostures.prone);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_supine', selfCare.sleep.sleepingPostures.supine);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_side_right', selfCare.sleep.sleepingPostures.sideR);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_side_left', selfCare.sleep.sleepingPostures.sideL);
        }
        setValue('prior-level-function_self-care_sleep_pillows', selfCare.sleep.pillows);
        setValue('prior-level-function_self-care_sleep_surface', selfCare.sleep.surfaceFlag);
        if (selfCare.sleep.surface) {
          setValue('prior-level-function_self-care_sleep_surface_firm', selfCare.sleep.surface.firm);
          setValue('prior-level-function_self-care_sleep_surface_soft', selfCare.sleep.surface.soft);
          setValue('prior-level-function_self-care_sleep_surface_sag', selfCare.sleep.surface.sag);
        }
      }

      // IADLs
      setValue('prior-level-function_self-care_iadls', selfCare.iADLsFlag);
      if (selfCare.iADLs) {
        setValue('prior-level-function_self-care_iadls_use_telephone', selfCare.iADLs.abilityToUseTelephone);
        setValue('prior-level-function_self-care_iadls_shopping', selfCare.iADLs.shopping);
        setValue('prior-level-function_self-care_iadls_food_prep', selfCare.iADLs.foodPreparation);
        setValue('prior-level-function_self-care_iadls_housekeeping', selfCare.iADLs.housekeeping);
        setValue('prior-level-function_self-care_iadls_laundry_iadl', selfCare.iADLs.laundry);
        setValue('prior-level-function_self-care_iadls_transportation', selfCare.iADLs.modeOfTransportation);
        setValue('prior-level-function_self-care_iadls_medications', selfCare.iADLs.responsibilityForOwnMedications);
        setValue('prior-level-function_self-care_iadls_finances', selfCare.iADLs.abilityToHandleFinances);
      }

      // Household Chores
      setValue('prior-level-function_self-care_household_chores', selfCare.householdChoresFlag);
      if (selfCare.householdChores) {
        setValue('prior-level-function_self-care_household_chores_cook_meal', selfCare.householdChores.cookAMeal);
        setValue('prior-level-function_self-care_household_chores_laundry_chore', selfCare.householdChores.laundry);
      }

      // Other Self Care fields
      setValue('prior-level-function_self-care_drive_community', selfCare.driveCommunityDistance);
      setValue('prior-level-function_self-care_volunteering', selfCare.volunteering);
      setValue('prior-level-function_self-care_caregiving', selfCare.caregiving);
    }

    // Continue with other sections
    this.mapMobilityFromDto(priorFunction, setValue);
    this.mapChangingBodyPositionFromDto(priorFunction, setValue);
    this.mapCarryingObjectsFromDto(priorFunction, setValue);
    this.mapCommentsFromDto(priorFunction, setValue);

    return formValue;
  }

  private mapMobilityFromDto(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    if (!priorFunction.mobilityWalkingMovingAround) return;

    const mobility = priorFunction.mobilityWalkingMovingAround;

    // IADLs
    if (mobility.iADLs) {
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_use_telephone', mobility.iADLs.abilityToUseTelephone);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_shopping', mobility.iADLs.shopping);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_food_prep', mobility.iADLs.foodPreparation);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_housekeeping', mobility.iADLs.housekeeping);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_laundry', mobility.iADLs.laundry);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_transportation', mobility.iADLs.modeOfTransportation);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_medications', mobility.iADLs.responsibilityForOwnMedications);
      setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_finances', mobility.iADLs.abilityToHandleFinances);
    }

    // Assistive Device
    setValue('prior-level-function_mobility-walking-moving-around_assistive_device', mobility.useOfAnAssistiveDevice);

    // Walking
    if (mobility.walking) {
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_forward', mobility.walking.forward);
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_backward', mobility.walking.backward);
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_sideways', mobility.walking.sideways);
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_strolling', mobility.walking.strolling);
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_surfaces', mobility.walking.walkingOnDifferentSurfaces);
      setValue('prior-level-function_mobility-walking-moving-around_walking_walking_obstacles', mobility.walking.walkingAroundObstacles);
    }

    // Moving Around
    if (mobility.movingAround) {
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_climbing', mobility.movingAround.climbing);
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_running', mobility.movingAround.running);
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_jogging', mobility.movingAround.jogging);
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_skipping', mobility.movingAround.skipping);
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_jumping', mobility.movingAround.jumping);
      setValue('prior-level-function_mobility-walking-moving-around_moving_around_swimming', mobility.movingAround.swimming);
    }

    // Moving Around In Different Locations
    if (mobility.movingAroundInDifferentLocations) {
      const locations = mobility.movingAroundInDifferentLocations;

      if (locations.walkingBetweenRooms) {
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_stairs', locations.walkingBetweenRooms.stairs);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_in_home', locations.walkingBetweenRooms.inHome);
      }

      if (locations.walkingDownTheStreet) {
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street_community_distances', locations.walkingDownTheStreet.communityDistances);
      }

      setValue('prior-level-function_mobility-walking-moving-around_different_locations_within_building', locations.walkingWithinABuilding);

      if (locations.movingAroundUsingEquipment) {
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_walker', locations.movingAroundUsingEquipment.walker);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_wheelchair', locations.movingAroundUsingEquipment.wheelchair);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skates', locations.movingAroundUsingEquipment.skates);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skis', locations.movingAroundUsingEquipment.skis);
      }

      if (locations.movingAroundUsingTransportation) {
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_on_off_bus', locations.movingAroundUsingTransportation.onOffBus);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_subway', locations.movingAroundUsingTransportation.subway);
        setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_public_transport', locations.movingAroundUsingTransportation.publicTransportation);
      }
    }

    // Negotiate Obstacles
    if (mobility.negotiateObstacles) {
      setValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets', mobility.negotiateObstacles.bumpedInCrowdedStreets);
      setValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain', mobility.negotiateObstacles.terrain);
    }
  }

  private mapChangingBodyPositionFromDto(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    if (!priorFunction.changingMaintainingBodyPosition) return;

    const changing = priorFunction.changingMaintainingBodyPosition;

    // Maintaining A Body Position
    if (changing.maintainingABodyPosition) {
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated', changing.maintainingABodyPosition.remainingSeated);
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing', changing.maintainingABodyPosition.remainingStanding);
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_squatting', changing.maintainingABodyPosition.squatting);
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling', changing.maintainingABodyPosition.kneeling);
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_sitting', changing.maintainingABodyPosition.sitting);
      setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_standing', changing.maintainingABodyPosition.standing);
    }

    // Transfers
    if (changing.transfers) {
      setValue('prior-level-function_changing-maintaining-body-position_transfers_bed_to_chair', changing.transfers.movingFromBedToChair);
      setValue('prior-level-function_changing-maintaining-body-position_transfers_sliding_bench', changing.transfers.slidingAlongABench);
    }

    // IADLs
    if (changing.iADLs) {
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone', changing.iADLs.abilityToUseTelephone);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping', changing.iADLs.shopping);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep', changing.iADLs.foodPreparation);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping', changing.iADLs.housekeeping);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry', changing.iADLs.laundry);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation', changing.iADLs.modeOfTransportation);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications', changing.iADLs.responsibilityForOwnMedications);
      setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances', changing.iADLs.abilityToHandleFinances);
    }
  }

  private mapCarryingObjectsFromDto(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    if (!priorFunction.carryingMovingHandlingObjects) return;

    const carrying = priorFunction.carryingMovingHandlingObjects;

    // IADLs
    if (carrying.iADLs) {
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone', carrying.iADLs.abilityToUseTelephone);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping', carrying.iADLs.shopping);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep', carrying.iADLs.foodPreparation);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping', carrying.iADLs.housekeeping);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry', carrying.iADLs.laundry);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation', carrying.iADLs.modeOfTransportation);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications', carrying.iADLs.responsibilityForOwnMedications);
      setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances', carrying.iADLs.abilityToHandleFinances);
    }

    // Hand Arm Use
    if (carrying.handArmUse) {
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects', carrying.handArmUse.pullingObjects);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects', carrying.handArmUse.pushingObjects);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_reaching', carrying.handArmUse.reaching);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms', carrying.handArmUse.turningHandsOrArms);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms', carrying.handArmUse.twistingHandsOrArms);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_throwing', carrying.handArmUse.throwing);
      setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_catching', carrying.handArmUse.catching);
    }

    // Fine Hand Use
    if (carrying.fineHandUse) {
      setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up', carrying.fineHandUse.pickingUp);
      setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_grasping', carrying.fineHandUse.grasping);
      setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating', carrying.fineHandUse.manipulating);
      setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_releasing', carrying.fineHandUse.releasing);
    }

    // Moving Objects With Lower Extremities
    if (carrying.movingObjectsWithLowerExtremities) {
      setValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_kicking', carrying.movingObjectsWithLowerExtremities.kicking);
      setValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities', carrying.movingObjectsWithLowerExtremities.pushingWithLowerExtremities);
    }

    // Community Integration
    setValue('prior-level-function_carrying-moving-handling-objects_community_integration', carrying.communityIntegrationAccess);

    // Work Vocation
    setValue('prior-level-function_carrying-moving-handling-objects_work_vocation', carrying.workVocationOccupation);

    // Recreation
    if (carrying.recreation) {
      setValue('prior-level-function_carrying-moving-handling-objects_recreation_sports', carrying.recreation.sports);
    }
  }

  private mapCommentsFromDto(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    setValue('priorLevelFunctionOther', priorFunction.priorLevelFunctionOther);
    setValue('priorLevelFunctionOtherText', priorFunction.priorLevelFunctionOtherText);
    setValue('priorLevelFunctionSelfCareComment', priorFunction.priorLevelFunctionSelfCareComment);
    setValue('priorLevelFunctionMobilityWalkingMovingAroundComment', priorFunction.priorLevelFunctionMobilityWalkingMovingAroundComment);
    setValue('priorLevelFunctionChangingMaintainingBodyPositionComment', priorFunction.priorLevelFunctionChangingMaintainingBodyPositionComment);
    setValue('priorLevelFunctionCarryingMovingHandlingObjectsComment', priorFunction.priorLevelFunctionCarryingMovingHandlingObjectsComment);
  }

  /**
   * Maps currentFunction section from form (mixed kebab-snake format) to DTO (camelCase)
   */
  private mapCurrentFunctionToModel(currentFunction: any): CurrentFunction {
    // Convert from mixed kebab-snake format to camelCase
    // Example: current-functional-limitations_self-care_hygiene -> currentFunctionalLimitationsSelfCareHygiene
    const camelCased = this.convertObjectFromMixedToCamelCase(currentFunction);
    const mapped: CurrentFunction = { ...camelCased };

    // Handle conditional fields
    if (!mapped.currentFunctionalLimitationsOther) {
      mapped.currentFunctionalLimitationsFunctionOtherText = undefined;
    }

    if (!mapped.currentFunctionalLimitationsFunctionOtherLymphedema) {
      mapped.currentFunctionalLimitationsFunctionOtherLymphedemaText = undefined;
    }

    if (!mapped.currentFunctionalLimitationsFunctionOtherWoundHealing) {
      mapped.currentFunctionalLimitationsFunctionOtherWoundHealingText = undefined;
    }

    if (!mapped.currentFunctionalLimitationsFunctionOtherPelvicHealth) {
      mapped.currentFunctionalLimitationsFunctionOtherPelvicHealthText = undefined;
    }

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
  private mapMedicalHistoryToModel(medicalHistory: any): MedicalHistory {
    // Convert from snake_case to camelCase
    const camelCased = this.convertObjectToCamelCase(medicalHistory);
    const updated: MedicalHistory = { ...camelCased };

    // Handle conditional fields
    const conditionalFields: Array<{ checkbox: string; fields: string[] }> = [
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

    conditionalFields.forEach(({ checkbox, fields }) => {
      if (!updated[checkbox as keyof MedicalHistory]) {
        fields.forEach(field => {
          (updated as any)[field] = undefined;
        });
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
      if (!updated[checkboxKey as keyof MedicalHistory]) {
        (updated as any)[textKey] = undefined;
      }
    });

    return updated;
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

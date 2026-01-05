import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basic } from '../models/Basic';
import { CurrentFunction } from '../models/CurrentFunction';
import { MedicalHistory } from '../models/medical.history/medical.history';
import { Pain } from '../models/Pain';
import { Subjective } from '../models/Subjective';
import { CurrentFunctionMapperService } from './current.function.mapper.service';
import { PriorFunctionMapperService } from './prior-function-mapper.service';
import { MedicalHistoryMapperService } from './medical.history/medical-history-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectiveMapperService {

  constructor(private priorFunctionMapper: PriorFunctionMapperService,
    private currentFunctionMapper: CurrentFunctionMapperService,
    private medicalHistoryMapper: MedicalHistoryMapperService) { }

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
      subjective.medicalHistory = this.medicalHistoryMapper.toModel(medicalHistoryGroup);
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
      this.currentFunctionMapper.fromDto(dto.currentFunction, currentFunctionGroup)
      formValue.currentFunction = this.mapCurrentFunctionFromDto(dto.currentFunction);
    }

    // Map medicalHistory section
    if (dto.medicalHistory) {
      formValue.medicalHistory = this.medicalHistoryMapper.fromDto(dto.medicalHistory);
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
      timeIn: basic.time !== 'no' ? basic.time_in : undefined,
      timeOut: basic.time !== 'no' ? basic.time_out : undefined,
      numberOfVisit: basic.number_of_visit,
      icdtenDiagnosis: basic.icdten_diagnosis,
      treatmentDiagnosis: basic.treatment_diagnosis,
      treatmentSide: Array.isArray(basic.treatment_side) ? basic.treatment_side : [],
      specificPhysicianRders: basic.specific_physician_rders,
      specificPhysicianRdersText: basic.specific_physician_rders ? basic.specific_physician_rders_text : undefined,
      injuryOnsetDate: basic.injury_onset_date,
      chronic: basic.chronic,
      insidious: basic.insidious,
      newInjury: basic.new_injury,
      newInjuryText: basic.new_injury ? basic.new_injury_text : undefined,
      surgeryPerformed: basic.surgery_performed,
      surgeryPerformedDateOfSurgery: basic.surgery_performed ? basic.surgery_performed_date_of_surgery : undefined,
      surgeryPerformedTypeOfSurgery: basic.surgery_performed ? basic.surgery_performed_type_of_surgery : undefined,
      priorHospitalization: basic.prior_hospitalization,
      fromDate: basic.prior_hospitalization ? basic.from_date : undefined,
      toDate: basic.prior_hospitalization ? basic.to_date : undefined,
      pelvicSpeechProfile: basic.pelvic_speech_profile,
      historyOfPresentCondition_MechanismOfInjury: basic.history_of_present_condition_Mechanism_of_injury,
      primaryConcernChiefComplaint: basic.primary_concern_chief_complaint
    };
    return mapped;
  }

  /**
   * Maps basic section from DTO (camelCase) to form (snake_case)
   */
  private mapBasicFromDto(basic: any): any {
    console.log('basic.chronic ', basic.chronic)
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
      insidious: basic.insidious,
      new_injury: !!basic.newInjuryText || basic.newInjury,
      new_injury_text: basic.newInjuryText,
      surgery_performed: !!(basic.surgeryPerformedDateOfSurgery || basic.surgeryPerformedTypeOfSurgery) || basic.surgeryPerformed,
      surgery_performed_date_of_surgery: basic.surgeryPerformedDateOfSurgery,
      surgery_performed_type_of_surgery: basic.surgeryPerformedTypeOfSurgery,
      prior_hospitalization: !!(basic.fromDate || basic.toDate) || basic.priorHospitalization,
      from_date: basic.fromDate,
      to_date: basic.toDate,
      pelvic_speech_profile: basic.pelvicSpeechProfile,
      history_of_present_condition_Mechanism_of_injury: basic.historyOfPresentCondition_MechanismOfInjury,
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

}

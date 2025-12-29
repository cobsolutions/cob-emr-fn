import { Injectable } from '@angular/core';
import { AssessmentModel } from '../model/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentMapperService {

  constructor() { }
  toModel(formValue: any): AssessmentModel {
    return {
      assessmentDiagnosis: formValue.assessment_diagnosis,
      patientClinicalPresentation: formValue.patient_clinical_presentation,
      rehabPotential: formValue.rehab_potential,
      contraindicationsTotherapy: formValue.contraindications_to_therapy === 'yes' || formValue.contraindications_to_therapy === true,
      consentToCare: formValue.consent_to_care,
      problems: formValue.problems || [],
      goals: formValue.goals?.map((goal: any) => ({
        description: goal.description,
        term: goal.term,
        period: goal.period,
        met: goal.met,
        customPeriod: goal.customPeriod,
        customMet: goal.customMet
      })) || []
    };
  }

  fromDto(dto: AssessmentModel): any {
    return {
      assessment_diagnosis: dto.assessmentDiagnosis || '',
      patient_clinical_presentation: dto.patientClinicalPresentation || '',
      rehab_potential: dto.rehabPotential || '',
      contraindications_to_therapy: dto.contraindicationsTotherapy ? 'yes' : 'no',
      consent_to_care: dto.consentToCare || '',
      problems: dto.problems || [],
      goals: dto.goals?.map(goal => ({
        description: goal.description || '',
        term: goal.term || 'Short Term',
        period: goal.period || '1 Visit',
        met: goal.met || 'N/A',
        customPeriod: goal.customPeriod || '',
        customMet: goal.customMet || ''
      })) || []
    };
  }
}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssessmentModel } from '../model/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentMapperService {

  constructor() { }
  toModel(formValue: FormGroup): AssessmentModel {
    return {
      assessmentDiagnosis: formValue.get('assessment_diagnosis').value,
      patientClinicalPresentation: formValue.get('patient_clinical_presentation').value,
      rehabPotential: formValue.get('rehab_potential').value,
      contraindicationsTotherapy: formValue.get('contraindications_to_therapy').value === 'yes' || formValue.get('contraindications_to_therapy').value === true,
      consentToCare: formValue.get('consent_to_care').value,
      problems: formValue.get('problems').value || [],
      goals: formValue.get('goals').value?.map((goal: any) => ({
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

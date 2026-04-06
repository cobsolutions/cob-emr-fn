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
      assessmentDiagnosis: formValue.get('assessment_diagnosis')?.value,
      patientClinicalPresentation: formValue.get('patient_clinical_presentation')?.value,
      rehabPotential: formValue.get('rehab_potential')?.value,
      contraindicationsTotherapy: formValue.get('contraindications_to_therapy')?.value === 'yes' || formValue.get('contraindications_to_therapy')?.value === true,
      contraindicationsToTherapyConsent: formValue.get('contraindications_to_therapy_consent')?.value ?? false,
      consentToCare: formValue.get('consent_to_care')?.value,
      patientComplianceHep: formValue.get('patient_compliance_hep')?.value,
      patientConsultationMaintainOrResume: formValue.get('patient_consultation_maintain_or_resume')?.value,
      patientConsultationMaintainOrResumeTxt: formValue.get('patient_consultation_maintain_or_resume_txt')?.value,
      patientConsultationAgainstBedRest: formValue.get('patient_consultation_against_bed_rest')?.value,
      patientConsultationAgainstBedRestTxt: formValue.get('patient_consultation_against_bed_rest_txt')?.value,
      problems: formValue.get('problems')?.value || [],
      parentPatientEducation: formValue.get('parent_patient_education')?.value,
      goals: formValue.get('goals')?.value?.map((goal: any) => ({
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
    console.log('dto.patientConsultationMaintainOrResume', dto.patientConsultationMaintainOrResume)
    return {
      assessment_diagnosis: dto.assessmentDiagnosis || '',
      patient_clinical_presentation: dto.patientClinicalPresentation || '',
      rehab_potential: dto.rehabPotential || '',
      contraindications_to_therapy: dto.contraindicationsTotherapy ? 'yes' : 'no',
      contraindications_to_therapy_consent: dto.contraindicationsToTherapyConsent ?? false,
      consent_to_care: dto.consentToCare || '',
      patient_compliance_hep: dto.patientComplianceHep ?? false,
      patient_consultation_maintain_or_resume: dto.patientConsultationMaintainOrResume ?? false,
      patient_consultation_maintain_or_resume_txt: dto.patientConsultationMaintainOrResumeTxt || null,
      patient_consultation_against_bed_rest: dto.patientConsultationAgainstBedRest ?? false,
      patient_consultation_against_bed_rest_txt: dto.patientConsultationAgainstBedRestTxt || null,
      parent_patient_education: dto.parentPatientEducation,
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

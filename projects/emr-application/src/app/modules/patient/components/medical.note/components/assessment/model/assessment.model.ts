import { AssessmentGoals } from "./assessment.goals"

export interface AssessmentModel{
    assessmentDiagnosis?: string,
    patientClinicalPresentation?:string,
    rehabPotential?:string,
    contraindicationsTotherapy?:boolean,
    consentToCare?:string
    problems?:string[]
    goals?:AssessmentGoals[]

}
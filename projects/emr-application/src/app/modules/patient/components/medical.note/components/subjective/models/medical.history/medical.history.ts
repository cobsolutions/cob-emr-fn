import { CurrentMedication } from "./current.medication";
import { HistoryFall } from "./history.falls";
import { MedicalHistoryDisease } from "./medical.history.disease";
import { OccupationSocialHistory } from "./occupation.social.history";
import { PersonalComplication } from "./personal.complication";
import { PreviousHistorySymptoms } from "./previous.history.symptoms";

export interface MedicalHistory {
    isPreviousHistoryOfSimilarSymptoms?: number,
    previousHistorySymptoms?: PreviousHistorySymptoms,
    
    isOccupationSocialHistory?:boolean
    occupationSocialHistory?:OccupationSocialHistory,
    
    isHomeHealthCare?:boolean,
    homeHealthCareDescription?:string,

    isHistoryOfFalls?:boolean
    historyFall?:HistoryFall

    medicalHistoryDisease?:MedicalHistoryDisease
    personalComplication?:PersonalComplication
    currentMedication?:CurrentMedication

    generalHealth?: string,

    diagnosticTest?: string,

    patientGoals?: string,

    medicalHistoryReview?: string

    isMentalStatus?: boolean

    mentalStatusDescription?: string

    weightLoss?: boolean

    

    

}
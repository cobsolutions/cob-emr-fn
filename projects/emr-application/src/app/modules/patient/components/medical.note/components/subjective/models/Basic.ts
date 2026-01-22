import { IcdtenDiagnosi } from "./IcdtenDiagnosi";
import { TreatmentDiagnosi } from "./TreatmentDiagnosi";

export interface Basic {
    dosDate?: string;
    time?: boolean;
    timeIn?: string;
    timeOut?: string;
    numberOfVisit?: number;
    icdtenDiagnosis?: IcdtenDiagnosi[];
    treatmentDiagnosis?: TreatmentDiagnosi[];
    treatmentSide?: string[];
    specificPhysicianRders?: boolean;
    specificPhysicianRdersText?: string;
    injuryOnsetDate?: string;
    chronic?: boolean;
    insidious?: boolean;
    newInjury?: boolean;
    newInjuryText?: string;
    surgeryPerformed?: boolean;
    surgeryPerformedDateOfSurgery?: string;
    surgeryPerformedTypeOfSurgery?: string;
    priorHospitalization?: boolean;
    fromDate?: string;
    toDate?: string;
    pelvicSpeechProfile?: string;
    historyOfPresentCondition_MechanismOfInjury?: string;
    primaryConcernChiefComplaint?: string;
    currentComplaintsGains?: string;
}

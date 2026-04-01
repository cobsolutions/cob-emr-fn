import { ProviderInfo } from "../../../security/model/provider-info";
import { QuickDischargeRequest } from "./quick.discharge.request";

export interface MedicalNoteRequest {
    id?: number,
    patientId?:number
    patientCaseId?: string;
    noteType?: string
    createdBy?: string
    noteDate?: number
    subjective?: any
    objective?: any
    assessment?: any
    planOfCare?: any
    billing?: any
    dailyNotePlan?: {
        instruction?: string;
        description?: string;
    }
    dischargePlan?: {
        reason?: string;
        discharge?: string;
        physicianSignature?: boolean;
    }
    dateOfService?:number
    quickDischargeRequest?: QuickDischargeRequest
    finalizedBy?: ProviderInfo
    isForwarded?: boolean
    coSigner?: string
}
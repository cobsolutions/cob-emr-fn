import { PatientRequest } from "./patient.request"

export interface CreateNodeRequest{
    patient?:PatientRequest
    patientCaseId?:string
    noteType:string,
    encounterDate:Date
    providerId:string
}
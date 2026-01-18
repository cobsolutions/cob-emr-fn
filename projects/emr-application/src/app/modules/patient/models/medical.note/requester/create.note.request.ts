import { PatientRequest } from "./patient.request"

export interface CreateNodeRequest{
    patient?:PatientRequest
    noteType:string,
    encounterDate:Date
    providerId:string    
}
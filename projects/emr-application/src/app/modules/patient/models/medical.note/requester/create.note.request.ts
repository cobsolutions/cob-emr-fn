import { IcdtenDiagnosi } from "../../../components/medical.note/components/subjective/models"
import { CaseDiagnosis } from "../../case/case.diagnosis"
import { PatientRequest } from "./patient.request"

export interface CreateNodeRequest{
    patient?:PatientRequest
    patientCaseId?:string
    noteType:string,
    encounterDate:Date
    providerId:string
    caseDiagnosis?:IcdtenDiagnosi[]
}
export interface CreateNodeRequest{
    patientId:number,
    caseId:number,
    providerId:string,
    noteType:string,
    encounterDate:Date
}
export interface PatientRecordRequest {
    patientId: number
    caseId: number
    clinicId?: number;
    loggedIn?:string
}
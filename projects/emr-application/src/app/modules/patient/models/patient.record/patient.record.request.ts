export interface PatientRecordRequest {
    patientId: number
    caseId: string
    clinicId?: number;
    loggedIn?:string
}
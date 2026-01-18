export interface PatientRequest{
    firstName:string,
    middleName:string,
    lastName:string,
    patientId:string,
    dateOfBirth:Date,
    patientCaseId?:string
}
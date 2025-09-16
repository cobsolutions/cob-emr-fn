export interface PatientCaseAuthorization {
    id?: number;
    authName: string;
    effectiveStart: number; // milliseconds (epoch)
    effectiveEnd: number;   // milliseconds (epoch)
    authType: string;
    authNumber: number;
    insuranceName: string;
    insuranceId: number;
}
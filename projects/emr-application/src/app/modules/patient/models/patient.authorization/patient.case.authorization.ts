export interface PatientCaseAuthorization {
    id?: number;
    effectiveStart: number;   // stored as milliseconds
    effectiveEnd: number;     // stored as milliseconds
    insuranceName: string;
    insuranceId: string;
}
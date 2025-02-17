import { Clinic } from "../../patient/models/clinic";

export interface PatientChartAccessibilityModelResponse{
    patientChartAccessibility?:string,
    promptedClinics?:Clinic[]
}
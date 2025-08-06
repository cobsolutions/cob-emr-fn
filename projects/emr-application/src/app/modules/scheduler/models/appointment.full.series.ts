import { PatientCase } from "../../patient/models/case/patient.case";
import { Clinic } from "../../patient/models/clinic";
import { AppointmentType } from "./appointment.type";

export interface AppointmentFullSeries {
    patientName?: string;
    patientClinics?: Clinic[]
    patientCases?: PatientCase[]
    patientCase?: PatientCase
    startTime?: number;
    endTime?: number;
    appointmentType?: AppointmentType,
    therapy?: string
    clinic?: Clinic
    note?: string
}
import { PatientCase } from "../../patient/models/case/patient.case";
import { Patient } from "../../patient/models/patient";
import { Appointment } from "./appointment";

export interface FullAppointment extends Appointment{
    patient?:Patient,
    patientCase?:PatientCase;
}
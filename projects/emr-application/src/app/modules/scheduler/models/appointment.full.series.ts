import { PatientCase } from "../../patient/models/case/patient.case";
import { Clinic } from "../../patient/models/clinic";
import { AppointmentType } from "./appointment.type";

export interface AppointmentFullSeries{
    patientName?:string;
    patientCases?:PatientCase[]
    selectedCase?:PatientCase
    startTime?:number;
    endTime?:number;
    appointmentType?:AppointmentType,
    therapy?:string
    clinic?:Clinic
}
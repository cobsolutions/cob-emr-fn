import { Clinic } from "../../patient/models/clinic";
import { AppointmentType } from "./appointment.type";
export interface AppointmentBlockSeries {
    title?: string,
    startTime?: number,
    endTime?: number,
    clinic?: Clinic,
    appointmentType?: AppointmentType,
    note?: string
}
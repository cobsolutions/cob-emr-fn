import { Clinic } from '../../patient/models/clinic';
import { AppointmentCancelNoShowReason } from './appointment.cancel.no.show.reason';
import { AppointmentDate } from './appointment.date';
import { AppointementStatus } from './appointment.status';
import { AppointmnetRepeat } from './repeat/appointment.repeat';

export class Appointment {
    id: number;
    clinicId: number;
    isAllUsers: boolean;
    patientId: number;
    calendarId: number
    patientCaseId: number;
    therapyUUID: string = null;
    appointmentDate: AppointmentDate = {}
    startDate: number;
    endDate: number
    title: string;
    note: string;
    appointmentTypeId?: number
    appointmentType: string | null = null;
    appointmentTypeColor: string | null = null;
    appointmentFontTypeColor: string | null = null;
    appointmentStatus: string;
    statusHistory: AppointementStatus[]
    appointmentRepeat: AppointmnetRepeat;
    appointmentCancelNoShowReason: AppointmentCancelNoShowReason
    appointmentRepetitionType?: string = "Single"
    clinicModel: Clinic;
    appointmentStructure?:string
    seriesId?:number
   
}
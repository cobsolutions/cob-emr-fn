import { PatientCase } from '../../patient/models/case/patient.case';
import { Clinic } from '../../patient/models/clinic';
import { Patient } from '../../patient/models/patient';
import { AppointmentCancelNoShowReason } from './appointment.cancel.no.show.reason';
import { AppointmentDate } from './appointment.date';
import { AppointementStatus } from './appointment.status';
import { AppointmnetRepeat } from './repeat/appointment.repeat';

export class Appointment {
    id: number;
    clinicId: number;
    isAllUsers: boolean;
    patient: Patient;
    patientId: number;
    calendarId: number
    patientCase: PatientCase = null;
    patientCaseId: number;
    therapyUUID: string = null;
    appointmentDate: AppointmentDate = {}
    startDate: number;
    endDate: number
    title: string;
    note: string;
    repeatId: number;
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
    public constructTitle() {
        this.title = this.patient.fullName + ':' + this.patientCase.title
            + (this.note !== null ? "<br/>" + this.note : "")
    }
}
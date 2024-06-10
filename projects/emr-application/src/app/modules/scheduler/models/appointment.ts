import { PatientCase } from '../../patient/models/case/patient.case';
import { Patient } from '../../patient/models/patient';
import { AppointmentCancelNoShowReason } from './appointment.cancel.no.show.reason';
import { AppointmentDate } from './appointment.date';
import { AppointmentRepeat } from './appointment.repeat';
import { AppointementStatus } from './appointment.status';

export class Appointment {
    id: number;
    clinicId: number;
    isAllUsers: boolean;
    patient: Patient;
    patientId: number;
    patientCase: PatientCase = null;
    patientCaseId: number;
    therapyUUID: string = null;
    appointmentDate: AppointmentDate = {}
    startDate: number;
    endDate: number
    title: string;
    note: string;
    repeatId: number;
    appointmentType: string | null = null;
    appointmentTypeColor: string | null = null;
    appointmentRepetition: string | null = null;
    repeat: AppointmentRepeat;
    appointmentStatus: string;
    statusHistory: AppointementStatus[]
    appointmentCancelNoShowReason: AppointmentCancelNoShowReason
    public constructTitle() {
        this.title = this.patient.fullName + ':' + this.patientCase.title
    }
}
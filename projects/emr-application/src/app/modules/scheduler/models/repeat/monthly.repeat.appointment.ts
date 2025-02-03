import { days } from "../../components/appointment.repeat/util/monthly.day.repetition";

export interface MonthlyRepeatAppointment {
    every?: number
    startDate?: number
    endDate?: number
    days?: days[]
    _dateStart?: Date
    _dateEnd?: Date
}
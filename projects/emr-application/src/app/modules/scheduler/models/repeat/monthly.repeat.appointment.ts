import { days } from "../../components/appointment.repeat/util/monthly.day.repetition";

export interface MonthlyRepeatAppointment {
    every?: number
    start?: number
    end?: number
    dayInMonth?:number;
    days?:days[]
}
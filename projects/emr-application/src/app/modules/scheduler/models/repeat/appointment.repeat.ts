import { DailyRepeatAppointment } from "./daily.repeat.appointment";
import { MonthlyRepeatAppointment } from "./monthly.repeat.appointment";
import { WeeklyRepeatAppointment } from "./weekly.repeat.appointment";

export interface AppointmnetRepeat {
    type?: string
    daily?: DailyRepeatAppointment;
    weekly?: WeeklyRepeatAppointment;
    monthly?:MonthlyRepeatAppointment
}
import { DailyRepeatAppointment } from "./daily.repeat.appointment";
import { WeeklyRepeatAppointment } from "./weekly.repeat.appointment";

export interface AppointmnetRepeat {
    type?: string
    daily?: DailyRepeatAppointment;
    weekly?: WeeklyRepeatAppointment;
}
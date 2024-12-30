import { DAYS_OF_WEEK } from "calendar-utils";
import * as moment from "moment";
import { SchedulerSettings } from "../../../model/shceduler.date.settings";
export interface Settings {
    dayOfWeek?: DAYS_OF_WEEK;
    startOfDay?: number
    endOfDay?: number
}
export class FetchSchedulerSettings {
    static schedulerSetting: Settings = {};
    public static setup(schedulerDateSettings: SchedulerSettings) {
        this.setStartWeek(schedulerDateSettings.startWeek)
        this.setDayHours(schedulerDateSettings.startDay, schedulerDateSettings.endDay);
        console.log(JSON.stringify(this.schedulerSetting))
        return this.schedulerSetting;
    }
    private static setStartWeek(startWeek: string) {
        switch (startWeek) {
            case 'Monday':
                this.schedulerSetting.dayOfWeek = DAYS_OF_WEEK.MONDAY
                break;
            case 'sunday':
                this.schedulerSetting.dayOfWeek = DAYS_OF_WEEK.SUNDAY
                break;
        }
    }
    private static setDayHours(startDay?: string, endDay?: string) {
        const parseTime = (time: string): number => {
            const [hour, modifier] = time.toLowerCase().split(/(am|pm)/);
            let [hours, minutes] = hour.split(":").map(Number);

            // If no minutes are specified, default to 0
            if (isNaN(minutes)) minutes = 0;

            if (modifier === "pm" && hours < 12) hours += 12;
            if (modifier === "am" && hours === 12) hours = 0;

            return hours;
        };
        const startDayHour = parseTime(startDay);
        const endDayHour = parseTime(endDay);
        this.schedulerSetting.startOfDay = startDayHour;
        this.schedulerSetting.endOfDay = endDayHour;
    }
}
import { DAYS_OF_WEEK } from "calendar-utils";
import { SchedulerSettings } from "../../../model/shceduler.date.settings";
export interface Settings {
    dayOfWeek?: DAYS_OF_WEEK;
}
export class FetchSchedulerSettings {
    static schedulerSetting: Settings={};
    public static setup(schedulerDateSettings: SchedulerSettings) {
        this.setStartWeek(schedulerDateSettings.startWeek)
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
}
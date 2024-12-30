import { DAYS_OF_WEEK } from "calendar-utils";
import * as moment from "moment";
import { SchedulerSettings } from "../../../model/shceduler.date.settings";
export interface Settings {
    dayOfWeek?: DAYS_OF_WEEK;
    startOfDay?: number
    endOfDay?: number
    timeInterval?: number
    appointmentInterval?: number
}
export class FetchSchedulerSettings {
    static schedulerSetting: Settings = {};
    public static setup(schedulerDateSettings: SchedulerSettings) {
        this.setStartWeek(schedulerDateSettings.startWeek)
        this.setDayHours(schedulerDateSettings.startDay, schedulerDateSettings.endDay);
        this.setTimeInterval(schedulerDateSettings.timeInterval)
        this.setAppointmentDuration(schedulerDateSettings.appointmentDuration)
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
    private static setTimeInterval(timeInterval: string) {
        const minutesPattern = /(\d+)\s*minutes?/i;
        const hoursPattern = /(\d+)\s*Hour/i;

        let minutesValue: number | undefined;
        let hourSegments: number;

        // Check for minutes format
        if (minutesPattern.test(timeInterval)) {
            const match = timeInterval.match(minutesPattern);
            minutesValue = match ? parseInt(match[1], 10) : undefined;
        }

        // Check for hour format
        if (hoursPattern.test(timeInterval)) {
            const match = timeInterval.match(hoursPattern);
            const hourValue = match ? parseInt(match[1], 10) : undefined;

            if (hourValue !== undefined) {
                minutesValue = hourValue * 60; // Convert hours to minutes
            }
        }

        if (minutesValue !== undefined && minutesValue > 0) {
            hourSegments = 60 / minutesValue;
        } else {
            throw new Error("Invalid time interval format or value.");
        }
        this.schedulerSetting.timeInterval = hourSegments
    }
    private static setAppointmentDuration(duration: string){
        if (duration.endsWith('M')) {
            // If the duration ends with 'M', parse the number part as minutes
            this.schedulerSetting.appointmentInterval =  parseInt(duration.slice(0, -1), 10);
        } else if (duration.endsWith('H')) {
            // If the duration ends with 'H', convert the hours to minutes
            this.schedulerSetting.appointmentInterval=  parseInt(duration.slice(0, -1), 10) * 60;
        } else {
            throw new Error('Invalid duration format');
        }
    }
}
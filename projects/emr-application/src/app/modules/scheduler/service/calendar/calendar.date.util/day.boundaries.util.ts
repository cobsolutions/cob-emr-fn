import * as moment from "moment";

export class DayBoundaries {
    public static current(date: string | Date, startHour: number, endHour: number): { start: number; end: number } {
        const momentDate = moment(date);

        const start = momentDate.startOf('day').hours(startHour).minutes(0).seconds(0).milliseconds(0).valueOf();
        const end = momentDate.startOf('day').hours(endHour).minutes(59).seconds(59).milliseconds(999).valueOf();

        return { start, end };
    }
    public static previous(date: string | Date, startHour: number, endHour: number): { start: number; end: number } {
        const momentDate = moment(date).subtract(1, 'day'); // Move back one day

        const start = momentDate.startOf('day').hours(startHour).minutes(0).seconds(0).milliseconds(0).valueOf();
        const end = momentDate.startOf('day').hours(endHour).minutes(59).seconds(59).milliseconds(999).valueOf();

        return { start, end };
    }
    public static next(date: string | Date, startHour: number, endHour: number): { start: number; end: number } {
        const momentDate = moment(date).add(1, 'day'); // Move forward one day

        const start = momentDate.startOf('day').hours(startHour).minutes(0).seconds(0).milliseconds(0).valueOf();
        const end = momentDate.startOf('day').hours(endHour).minutes(59).seconds(59).milliseconds(999).valueOf();

        return { start, end };
    }

}
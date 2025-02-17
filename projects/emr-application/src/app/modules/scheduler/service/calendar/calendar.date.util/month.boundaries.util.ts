import * as moment from "moment";

export class MonthBoundaries {
    public static current(date: string | Date): { start: number; end: number } {
        var start = moment(date).startOf('month').unix() * 1000
        var end = moment(date).endOf('month').unix() * 1000;
        return { start, end };
    }
}
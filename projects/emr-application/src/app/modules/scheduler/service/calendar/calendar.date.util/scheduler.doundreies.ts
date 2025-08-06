import { Settings } from "../../../components/scheduler.view/util/fetch.scheduler.settings";
import { DateUnit } from "../events/events-calendar.service";
import { DayBoundaries } from "./day.boundaries.util";
import { MonthBoundaries } from "./month.boundaries.util";
import { WeekDateBoundaries } from "./week.date.boundaries.util";

export class BoundreiesScheduler {
    public static getBoundreies(unit: DateUnit, viewDate: string | Date, settings: Settings): any {
        var boundaries: any;
        switch (unit) {
            case 'week':
                boundaries = WeekDateBoundaries.current(viewDate, settings.dayOfWeek)
                break;
            case 'day':
                boundaries = DayBoundaries.current(viewDate, settings.startOfDay, settings.endOfDay);
                break;
            case 'month':
                boundaries = MonthBoundaries.current(viewDate);
                break;
        }
        return boundaries;
    }
}
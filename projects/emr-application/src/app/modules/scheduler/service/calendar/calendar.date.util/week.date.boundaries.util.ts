import * as moment from "moment";

export class WeekDateBoundaries {
    public static current(date: string | Date, _configStartOfWeek: number): { start: number; end: number } {
        moment.updateLocale('custom', {
            week: {
                dow: _configStartOfWeek,
            },
        });
        const momentDate = moment(date);
        const start = momentDate.startOf('week').valueOf()
        const end = momentDate.endOf('week').valueOf()
        return { start, end };
    }

    public static previous(date: string | Date, _configStartOfWeek: number): { start: number; end: number } {
        moment.updateLocale('custom', {
            week: {
                dow: _configStartOfWeek,
            },
        });
        const momentDate = moment(date).subtract(1, 'week');
        const start = momentDate.startOf('week').valueOf();
        const end = momentDate.endOf('week').valueOf();
        moment.updateLocale('custom', null);
        return { start, end };
    }

    public static next(date: string | Date, _configStartOfWeek: number): { start: number; end: number } {
        moment.updateLocale('custom', {
            week: {
                dow: _configStartOfWeek,
            },
        });
        const momentDate = moment(date).add(1, 'week');
        const start = momentDate.startOf('week').valueOf();
        const end = momentDate.endOf('week').valueOf();
        moment.updateLocale('custom', null);
        return { start, end };
    }
}
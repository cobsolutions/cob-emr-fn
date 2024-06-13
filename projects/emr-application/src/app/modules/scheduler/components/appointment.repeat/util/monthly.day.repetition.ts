import * as moment from "moment";

export interface days {
    dayName: string,
    dayNumber: number
}
export class MonthlyRepetitionbuilder {
    public static build(startDate: Date) {
        var dayMonth: days[] = [];
        var formmatedDayNumber = moment(startDate).format('DD');
        if (formmatedDayNumber === '01') {
            dayMonth.push({
                dayName: Number(formmatedDayNumber) + 'st day',
                dayNumber: 32
            })
        }
        else if (formmatedDayNumber === '02') {
            dayMonth.push({
                dayName: Number(formmatedDayNumber) + 'nd day',
                dayNumber: 33
            })
        }
        else if (formmatedDayNumber === '03') {
            dayMonth.push({
                dayName: Number(formmatedDayNumber) + 'rd day',
                dayNumber: 34
            })
        }
        else {
            dayMonth.push({
                dayName: Number(formmatedDayNumber) + 'th day',
                dayNumber: Number(formmatedDayNumber)
            })
        }
        var formmatedDayName = moment(startDate).format('ddd');
        if (formmatedDayName === 'Sun')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 1
            })
        if (formmatedDayName === 'Mon')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 2
            })
        if (formmatedDayName === 'Tue')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 3
            })
        if (formmatedDayName === 'Wed')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 4
            })
        if (formmatedDayName === 'Thu')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 5
            })
        if (formmatedDayName === 'Fri')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 6
            })
        if (formmatedDayName === 'Sat')
            dayMonth.push({
                dayName: moment(startDate).format('dddd'),
                dayNumber: 7
            })
        return dayMonth;
    }
}
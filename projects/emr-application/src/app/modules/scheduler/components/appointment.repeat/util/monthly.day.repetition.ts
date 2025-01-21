import * as moment from "moment";

export interface days {
    dayName: string,
    dayNumber: number,
    index?: number;
    day?: number;
}
export class MonthlyRepetitionbuilder {
    static dayNumber: number = 0;
    public static build(startDate: Date) {
        const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

        // Get the day number (0 for Sat, 1 for Sun, ..., 6 for Fri)
        this.dayNumber = startDate.getDay() + 1;

        // Get the exact day of the month
        const day = startDate.getDate();

        // Calculate the index of the day in the month
        const index = Math.ceil(day / 7);

        // Determine the ordinal day name (e.g., 1st, 2nd, 3rd, 20th)
        let ordinalDayName: string;
        if (day === 1) {
            ordinalDayName = "1st";
        } else if (day === 2) {
            ordinalDayName = "2nd";
        } else if (day === 3) {
            ordinalDayName = "3rd";
        } else {
            ordinalDayName = `${day}th`;
        }

        // Format for the "3rd Monday" style name
        const ordinalIndex = ["1st", "2nd", "3rd", "4th", "5th"];
        const weekOrdinal = ordinalIndex[index - 1] || `${index}th`; // Safeguard against invalid index
        const formattedDayName = `${weekOrdinal} ${daysOfWeek[this.dayNumber]}`;

        return [
            {
                dayName: ordinalDayName,
                dayNumber: this.dayNumber,
                index: index,
                day: day, // Exact day for the first item
            },
            {
                dayName: formattedDayName,
                dayNumber: this.dayNumber,
                index: index,
                day: -1, // -1 for the second item
            },
        ];
    }
}
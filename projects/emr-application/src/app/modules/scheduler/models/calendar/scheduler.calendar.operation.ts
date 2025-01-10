import { CalendarEvent } from "calendar-utils";
import { CalendarEvents } from "./calendars";


export class SchedulerCalendarEvents implements CalendarEvents {
    events: Record<number, CalendarEvent[]> = {};

    get(id: number): CalendarEvent<any>[] {
        return this.events[id];
    }
    push(id: number, value: CalendarEvent[]): void {
        if (this.events[id] !== undefined)
            this.events[id] = value;
        else {
            this.removeById(id);
            this.events[id] = value;
        }
    }
    removeById(id: number): boolean {
        if (id in this.events) {
            delete this.events[id];
            return true;
        }
        return false;
    }
    display(): void {
        console.log(this.events);
    }

}
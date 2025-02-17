import { CalendarEvent } from "calendar-utils";

export type CalendarEvents = {
    events: Record<number, CalendarEvent[]>;
    push(id: number, value: CalendarEvent[]): void;
    get(id: number): CalendarEvent[]
    getAll(): CalendarEvent[]
    removeById(id: number): boolean;
    display(): void;
};
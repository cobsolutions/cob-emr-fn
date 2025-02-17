import { CalendarEvent } from "calendar-utils";
import { Appointment } from "./appointment";

export interface RenderEventsContainer {
    addedRenderEvents: CalendarEvent[],
    deletedRenderEvents: CalendarEvent[]
    
}
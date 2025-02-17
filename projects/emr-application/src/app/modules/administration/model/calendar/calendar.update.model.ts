import { Calendar } from "./calendar";

export interface CalendarsUpdateModel {
    markAsPublic?: Calendar[],
    markAsNotPublic?: Calendar[],
    markAsAttached?: Calendar[],
    markAsUnAttached?: Calendar[],
    clinicId?: number
    uuid?: string;
}
import { Calendar } from "./calendar";

export interface CalendarsUpdateModel{
    markAsAttached?:Calendar[],
    markAsUnAttached?:Calendar[],
    clinicId?:number
    uuid?:string;
}
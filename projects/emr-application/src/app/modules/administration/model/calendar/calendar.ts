import { CalendarEvent } from "calendar-utils";

export interface Calendar{
    id?:number,
    name?:string,
    isPublic?:boolean,
    createdBy?:string
    attached?:boolean
    clinicId?:number
    events?: CalendarEvent[];
    selected?:boolean
}
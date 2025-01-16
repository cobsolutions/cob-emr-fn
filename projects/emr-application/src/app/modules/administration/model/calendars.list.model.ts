import { Calendar } from "./calendar/calendar";

export interface CalendarsListModel{

     name?:string
    createdBy?:string
    userCalendarAttachmentId?:number
    calendarId?:number
    clinicId?:number
    isAttach?:boolean;
    isPublic?:boolean;
}
import { CalendarAccessibilityAttributesModel } from "./calendar.accessibility.attributes.model";
import { CalendarAttachmentAttributesModel } from "./calendar.attachment.attributes.model";

export interface CalendarUpdateAttributeModel{
    calendarAttachmentAttributes?:CalendarAttachmentAttributesModel[]
    calendarAccessibilityAttributes?:CalendarAccessibilityAttributesModel[]
    uuid?:string
}
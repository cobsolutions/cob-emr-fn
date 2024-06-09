import { CalendarEvent } from "calendar-utils";
import { Subject } from "rxjs";
export enum AppointmentAction {
    ADD_APPOINTMENT = 'add',
    EDIT_APPOINTMENT = 'edit'
}
export class RefreshSchedulerEvents {
    public static refresh(events: CalendarEvent[], event: CalendarEvent, action: AppointmentAction) {
        switch (action) {
            case AppointmentAction.ADD_APPOINTMENT:
                this.updateEvents(events, event)
                break;
            case AppointmentAction.EDIT_APPOINTMENT:
                this.removeEvent(events, event)
                this.updateEvents(events, event)
                break;

        }
    }

    private static updateEvents(events: CalendarEvent[], event: CalendarEvent) {
        events.push(event);
    }
    private static removeEvent(events: CalendarEvent[], event: CalendarEvent) {
        var removedIndex: number;
        for (var i = 0; i < events.length; i++) {
            if (events[i].id === event.id) {
                removedIndex = i;
                break;
            }
        }
        events.splice(removedIndex, 1);
    }
}
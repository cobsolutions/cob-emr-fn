import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { Settings } from '../../../components/scheduler.view/util/fetch.scheduler.settings';
import { AppointmentEventConverterService } from '../../appointment-event-converter.service';
import { AppointmentService } from '../../appointment.service';
import { DayBoundaries } from '../calendar.date.util/day.boundaries.util';
import { MonthBoundaries } from '../calendar.date.util/month.boundaries.util';
import { BoundreiesScheduler } from '../calendar.date.util/scheduler.doundreies';
import { WeekDateBoundaries } from '../calendar.date.util/week.date.boundaries.util';

export type DateUnit = 'month' | 'week' | 'day';
type DateNavigation = 'previous' | 'current' | 'next';
@Injectable({
  providedIn: 'root'
})
export class EventsCalendarService {
  schedulerSettings: Settings;
  constructor(private appointmentEventConverterService: AppointmentEventConverterService,
    private appointmentService: AppointmentService) {
  }

  public get(calendar_id: number, clinic_id: number, viewDate: string | Date, unit: DateUnit, statuses?: string[]): Observable<CalendarEvent[]> {
    var boundaries: any = BoundreiesScheduler.getBoundreies(unit, viewDate, this.schedulerSettings)
    return this._callGetAppointmentService(calendar_id, clinic_id, boundaries, statuses)
  }
  private _callGetAppointmentService(calendar_id: number, clinic_id: number, boundaries: any, statuses: string[]) {
    return this.appointmentService.retrieveAppointments(boundaries.start, boundaries.end, clinic_id, calendar_id, statuses).pipe(
      map((response: any) => {
        var appointments: any = response.records;
        var events: CalendarEvent[] = []
        for (var i = 0; i < appointments.length; i++) {
          events.push(this.appointmentEventConverterService.convertToEvent(appointments[i]));
        }
        return events;
      })
    )
  }  
}

import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { Settings } from '../../../components/scheduler.view/util/fetch.scheduler.settings';
import { AppointmentEventConverterService } from '../../appointment-event-converter.service';
import { AppointmentService } from '../../appointment.service';
import { DayBoundaries } from '../calendar.date.util/day.boundaries.util';
import { MonthBoundaries } from '../calendar.date.util/month.boundaries.util';
import { WeekDateBoundaries } from '../calendar.date.util/week.date.boundaries.util';

type DateUnit = 'month' | 'week' | 'day';
type DateNavigation = 'previous' | 'current' | 'next';
@Injectable({
  providedIn: 'root'
})
export class EventsCalendarService {
  schedulerSettings: Settings;
  constructor(private appointmentEventConverterService: AppointmentEventConverterService,
    private appointmentService: AppointmentService) {
  }

  public get(calendar_id: number, clinic_id: number, viewDate: string | Date, unit: DateUnit, navigation?: DateNavigation): Observable<CalendarEvent[]> {
    var boundaries: any = this.getBoundreies(unit, navigation, viewDate, this.schedulerSettings)
    return this._callGetAppointmentService(calendar_id, clinic_id, boundaries)
  }
  private _callGetAppointmentService(calendar_id: number, clinic_id: number, boundaries: any) {
    return this.appointmentService.retrieveAppointments(boundaries.start, boundaries.end, clinic_id, calendar_id).pipe(
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
  private getBoundreies(unit: DateUnit, navigation: DateNavigation, viewDate: string | Date, settings: Settings): any {
    var boundaries: any;
    if (navigation === undefined || navigation === 'current')
      switch (unit) {
        case 'week':
          boundaries = WeekDateBoundaries.current(viewDate, settings.dayOfWeek)
          break;
        case 'day':
          boundaries = DayBoundaries.current(viewDate, settings.startOfDay, settings.endOfDay);
          break;
        case 'month':
          boundaries = MonthBoundaries.current(viewDate);
          break;
      }
    if (navigation === 'previous')
      switch (unit) {
        case 'week':
          boundaries = WeekDateBoundaries.previous(viewDate, settings.dayOfWeek)
          break;
        case 'day':
          boundaries = DayBoundaries.previous(viewDate, settings.startOfDay, settings.endOfDay);
          break;
      }
    if (navigation === 'next')
      switch (unit) {
        case 'week':
          boundaries = WeekDateBoundaries.next(viewDate, settings.dayOfWeek)
          break;
        case 'day':
          boundaries = DayBoundaries.next(viewDate, settings.startOfDay, settings.endOfDay);
          break;
      }
    return boundaries;
  }
}

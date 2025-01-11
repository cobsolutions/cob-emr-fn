import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  CalendarEvent, CalendarEventTimesChangedEvent,
  CalendarUtils,
  CalendarView
} from 'angular-calendar';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';

import { ActivatedRoute } from "@angular/router";
import { WeekDay } from "calendar-utils";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { filter, map, Observable, Subject, switchMap } from 'rxjs';
import { Calendar } from "../../../administration/model/calendar/calendar";
import { LoggedInService } from "../../../security/service/loggedIn/logged-in.service";
import { CalendarEvents } from "../../models/calendar/calendars";
import { SchedulerCalendarEvents } from "../../models/calendar/scheduler.calendar.operation";
import { AppointmentAction, RefreshSchedulerEvents } from "../../refresh.scheduler.event";
import { AppointmentActionsService } from "../../service/actions/appointment-actions.service";
import { AppointmentEventConverterService } from "../../service/appointment-event-converter.service";
import { AppointmentService } from "../../service/appointment.service";
import { CalendarServiceService } from "../../service/calendar/calendar-service.service";
import { EventsCalendarService } from "../../service/calendar/events/events-calendar.service";
import { SchedulerConfigurationService } from "../../service/scheduler-configuration.service";
import { AppointmentAddComponent } from "../appointment.add/appointment-add.component";
import { FetchSchedulerSettings, Settings } from "./util/fetch.scheduler.settings";

@Component({
  selector: 'app-view-schduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./view-schduler.component.css'],
  templateUrl: './view-schduler.component.html',
})
export class ViewSchdulerComponent implements OnInit {
  events: CalendarEvents = new SchedulerCalendarEvents();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  calendars$!: Observable<Calendar[]>;
  selectedCalendars: any[] = [];
  days: WeekDay[];
  view: CalendarView = CalendarView.Week;
  monthEvents: CalendarEvent[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  cancelNoShow: string;
  activeDayIsOpen: boolean = false;
  isSchedulerSetting: boolean = false;
  schedulerSettings: Observable<Settings>;
  schedulerSettingsa: Settings
  selectedClinic: number;
  isLoading: boolean = true;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private schedulerConfigurationService: SchedulerConfigurationService,
    private appointmentActionsService: AppointmentActionsService,
    private dialog: MatDialog,
    private loggedInService: LoggedInService,
    private calendarServiceService: CalendarServiceService,
    protected utils: CalendarUtils,
    private eventsCalendarService: EventsCalendarService
  ) { }
  ngOnInit(): void {
    this.getSelectedClinic();
    this.getCalendars()
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: undefined,
      excluded: undefined,
      weekendDays: undefined,
    });
  }

  dayClicked(segment: any) {
    if (this.selectedCalendars.length === 0)
      return
    this.viewDate = segment.date.date;
    this.AddAppointment(segment.date.calendar);
  }
  weekClicked(date: Date, calendar: any): void {
    this.viewDate = date;
    this.AddAppointment(calendar);
  }
  monthClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.checkOpenEvent(date, events);
    this.AddAppointment(null, 'month');
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent, calendarId: number): void {
    var selectedCalendar: any = this.selectedCalendars.find(calendar => calendar.id === calendarId);
    selectedCalendar.events = selectedCalendar.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.appointmentService.retrieveAppointment(Number(event.id)).pipe(
      map(appintment => {
        appintment.startDate = moment(newStart).unix() * 1000;
        appintment.endDate = moment(newEnd).unix() * 1000;
        return appintment;
      }),
      switchMap(appointmet => this.appointmentService.createAppointment(appointmet))
    ).subscribe(() => {
      this.toastr.success('Appointment  updated Successfully');
    })
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.appointmentActionsService.selectAppointmentActions(this.dialog, event).subscribe(result => {
      if (result === null)
        return;
      if (result.action)
        switch (result.action) {
          case 'edit':
            this.appointmentActionsService.editAppointment(this.dialog, result.event, this.schedulerSettingsa).subscribe(result => {
              if (result.action === 'updated') {
                RefreshSchedulerEvents.refresh(this.events.get(event.meta.calendar_id), result.event, AppointmentAction.EDIT_APPOINTMENT);
                this.refresh.next();
                this.toastr.success('Appointment updated Successfully');
              }
            });
            break;
          case 'status':
            this.appointmentActionsService.appointmentStatus(this.dialog, result.event).subscribe(result => {
              if (result.action === 'status-updated') {
                // RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                this.refresh.next();
                this.toastr.success('Appointment updated Successfully');
              }
              if (result.action === 'status-cancled')
                this.appointmentActionsService.appointmnetStatusCancel(this.dialog, result.event).subscribe(result => {
                  // RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                  this.refresh.next();
                  this.toastr.success('Appointment updated Successfully');
                })
              if (result.action === 'status-noshow')
                this.appointmentActionsService.appointmnetStatusNoShow(this.dialog, result.event).subscribe(result => {
                  if (result.action !== 'cancel') {
                    // RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                    this.refresh.next();
                    this.toastr.success('Appointment updated Successfully');
                  }
                })
            });
            break;
        }
    });
  }
  private checkOpenEvent(date: Date, events: CalendarEvent[]) {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  private AddAppointment(calendar: any, module?: string) {
    var calendarId: number = calendar !== null ? calendar.id : null;
    this.appointmentActionsService.addAppointment(this.dialog, this.viewDate, calendarId, this.schedulerSettingsa).subscribe(result => {
      if (result.action !== 'cancel') {
        if (module === 'month') {
          RefreshSchedulerEvents.refresh(this.events.get(calendar.id), result.event, AppointmentAction.ADD_APPOINTMENT);
          this.refresh.next();
        }
        if (module !== 'month') {
          RefreshSchedulerEvents.refresh(this.events.get(calendar.id), result.event, AppointmentAction.ADD_APPOINTMENT);
          this.refresh.next();
        }
        this.toastr.success('Appointment created Successfully');
      }
    })
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    // this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
    this.selectedCalendars.forEach(calendars => {
      this.eventsCalendarService.get(calendars.id, this.selectedClinic, this.viewDate, this.view).subscribe(events => {
        this.events.push(calendars.id, events)
        this.events.display();
        this.refresh.next();
      })
    })
  }

  clickNavigate() {
    this.selectedCalendars.forEach(calendars => {
      this.eventsCalendarService.get(calendars.id, this.selectedClinic, this.viewDate, this.view).subscribe(events => {
        this.events.push(calendars.id, events)
        this.refresh.next();
      })
    })
  }
  getCalendars() {
    this.calendars$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap((clinicId: any) => { return this.calendarServiceService.getAttachedCalendars(clinicId) })
    )
  }

  onCalendarChange(event: any, calendar: any): void {
    if (event.target.checked) {
      this.eventsCalendarService.get(calendar.id, this.selectedClinic, this.viewDate, this.view).subscribe(events => {
        this.events.push(calendar.id, events)
        this.selectedCalendars.push(calendar);
        this.refresh.next();
      })
    } else {
      this.selectedCalendars = this.selectedCalendars.filter(
        (item) => item.id !== calendar.id
      );
      this.events.removeById(calendar.id)
      this.refresh.next();
    }
  }
  isSelected(calendar: any): boolean {
    return this.selectedCalendars.some((item) => item.id === calendar.id);
  }
  private getSelectedClinic() {
    this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null)
    )
      .subscribe(clinicId => {
        this.selectedClinic = clinicId;
        this.schedulerConfigurationService.findSettings(clinicId)
          .subscribe(schedulerSetting => {
            this.isLoading = false
            this.schedulerSettingsa = FetchSchedulerSettings.setup(schedulerSetting)
            this.eventsCalendarService.schedulerSettings = this.schedulerSettingsa;
          })
      })
  }
}

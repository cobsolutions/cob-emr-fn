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

import { WeekDay } from "calendar-utils";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { filter, map, Observable, Subject, switchMap } from 'rxjs';
import { Calendar } from "../../../administration/model/calendar/calendar";
import { LoggedInService } from "../../../security/service/loggedIn/logged-in.service";
import { SchedulerConfiguration } from "../../models/configuration";
import { AppointmentAction, RefreshSchedulerEvents } from "../../refresh.scheduler.event";
import { AppointmentActionsService } from "../../service/actions/appointment-actions.service";
import { AppointmentEventConverterService } from "../../service/appointment-event-converter.service";
import { AppointmentService } from "../../service/appointment.service";
import { CalendarServiceService } from "../../service/calendar/calendar-service.service";
import { SchedulerConfigurationService } from "../../service/scheduler-configuration.service";
import { AppointmentAddComponent } from "../appointment.add/appointment-add.component";

@Component({
  selector: 'app-view-schduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./view-schduler.component.css'],
  templateUrl: './view-schduler.component.html',
})
export class ViewSchdulerComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  calendars$!: Observable<Calendar[]>;

  resources = [
    { id: 1, name: 'Bay Ridge' },
    { id: 2, name: 'Mahmoud Shalaby' },
    { id: 3, name: 'Shrif ahmed' },
    { id: 4, name: 'Moamen Hassanen' },
    { id: 5, name: 'Sakshi Mahajan' },
  ];
  selectedCalendars: any[] = [];
  days: WeekDay[];
  view: CalendarView = CalendarView.Week;
  schedulerConfiguration$!: Observable<SchedulerConfiguration>;
  events: CalendarEvent[] = [];

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  refresh = new Subject<void>();

  cancelNoShow: string;
  activeDayIsOpen: boolean = false;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private schedulerConfigurationService: SchedulerConfigurationService,
    private appointmentEventConverterService: AppointmentEventConverterService,
    private appointmentActionsService: AppointmentActionsService,
    private dialog: MatDialog,
    private loggedInService: LoggedInService,
    private calendarServiceService: CalendarServiceService,
    protected utils: CalendarUtils,
  ) { }

  ngOnInit(): void {
    this.getSchedulerConfiguration()
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
    this.AddAppointment(null);
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
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
      this.toastr.success('Appointment Dates updated Successfully');
    })
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.appointmentActionsService.selectAppointmentActions(this.dialog, event).subscribe(result => {
      if (result.action)
        switch (result.action) {
          case 'edit':
            this.appointmentActionsService.editAppointment(this.dialog, result.event).subscribe(result => {
              if (result.action === 'updated') {
                RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                this.refresh.next();
                this.toastr.success('Appointment updated Successfully');
              }
            });
            break;
          case 'status':
            this.appointmentActionsService.appointmentStatus(this.dialog, result.event).subscribe(result => {
              if (result.action === 'status-updated') {
                RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                this.refresh.next();
                this.toastr.success('Appointment updated Successfully');
              }
              if (result.action === 'status-cancled')
                this.appointmentActionsService.appointmnetStatusCancel(this.dialog, result.event).subscribe(result => {
                  RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
                  this.refresh.next();
                  this.toastr.success('Appointment updated Successfully');
                })
              if (result.action === 'status-noshow')
                this.appointmentActionsService.appointmnetStatusNoShow(this.dialog, result.event).subscribe(result => {
                  if (result.action !== 'cancel') {
                    RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.EDIT_APPOINTMENT);
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
  private AddAppointment(calendar: any) {
    this.appointmentActionsService.addAppointment(this.dialog, this.viewDate, calendar.id).subscribe(result => {
      if (result.action !== 'cancel') {
        RefreshSchedulerEvents.refresh(calendar.events, result.event, AppointmentAction.ADD_APPOINTMENT);
        this.refresh.next();
        this.toastr.success('Appointment created Successfully');
      }
    })
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.getAppointments();
    this.activeDayIsOpen = false;
  }
  getCalendars() {
    this.calendars$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap((clinicId: any) => { return this.calendarServiceService.getAttachedCalendars(clinicId) })
    )
  }
  private getCalendarAppointments(calendarId: number): Observable<any> {
    var startOfMonth = moment(this.viewDate).startOf('month').unix() * 1000
    var endOfMonth = moment(this.viewDate).endOf('month').unix() * 1000;
    return this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.appointmentService.retrieveAppointments(startOfMonth, endOfMonth, clinicId, calendarId)),
      map((response: any) => response.records)
    )
  }
  private getAppointments() {
    var startOfMonth = moment(this.viewDate).startOf('month').unix() * 1000
    var endOfMonth = moment(this.viewDate).endOf('month').unix() * 1000;
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.appointmentService.retrieveAppointments(startOfMonth, endOfMonth, clinicId, null)),
      map((response: any) => response.records)
    ).subscribe((appointments: any[]) => {
      this.events = [];
      for (var i = 0; i < appointments.length; i++) {
        var varevent: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointments[i])
        this.events.push(varevent);
      }
      this.refresh.next()
    })
  }
  getSchedulerConfiguration() {
    this.schedulerConfiguration$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.schedulerConfigurationService.retrieveCliniSchedulerConfigurationById(clinicId)),
      map((configuration: SchedulerConfiguration) => {
        configuration.startHour = moment(configuration.startHour).hour();
        configuration.endHour = moment(configuration.endHour).hour();
        return configuration;
      })
    )
  }
  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }
  onCheckboxChange(event: any, calendar: any): void {
    if (event.target.checked) {
      this.getCalendarAppointments(calendar.id)
        .subscribe((appointments: any[]) => {
          calendar.events = [];
          for (var i = 0; i < appointments.length; i++) {
            var varevent: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointments[i])
            calendar.events.push(varevent);
          }
          this.selectedCalendars.push(calendar);
          this.refresh.next()
        })
    } else {
      this.selectedCalendars = this.selectedCalendars.filter(
        (item) => item.id !== calendar.id
      );
    }
  }
  isSelected(calendar: any): boolean {
    return this.selectedCalendars.some((item) => item.id === calendar.id);
  }
}

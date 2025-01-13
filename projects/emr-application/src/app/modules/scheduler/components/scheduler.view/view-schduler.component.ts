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
import { filter, forkJoin, map, Observable, skip, Subject, switchMap, take, tap } from 'rxjs';
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
import { AppointmentAddComponent } from "../appointment.add/appointment-add.component";
import { FetchSchedulerSettings, Settings } from "./util/fetch.scheduler.settings";
import { SchedulerConfigurationService } from "../../service/scheduler-configuration.service";

@Component({
  selector: 'app-view-schduler',
  styleUrls: ['./view-schduler.component.css'],
  templateUrl: './view-schduler.component.html',
})
export class ViewSchdulerComponent implements OnInit {
  events: CalendarEvents = new SchedulerCalendarEvents();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  calendars$!: Observable<Calendar[]>;
  calendars: Calendar[];
  selectedCalendars: any[] = [];
  days: WeekDay[];
  view: CalendarView = CalendarView.Week;
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
    private eventsCalendarService: EventsCalendarService,
    private appointmentEventConverterService: AppointmentEventConverterService
  ) { }
  ngOnInit(): void {
    // this.getSelectedClinic().subscribe(clinicId => {
    //   // this.isLoading = false
    //   // this.selectedClinic = clinicId;
    //   c
    // })
    this.getSelectedClinic().pipe(
      take(1),
    ).subscribe(clinicId => {
      this.selectedClinic = clinicId;
      const sources = [this.getCalendars(clinicId), this.getSchedulerSettings(clinicId)]
      forkJoin(sources)
        .subscribe(result => {
          // result[] : [0] calendars , [1] scheduler settings
          this.calendars = result[0];
          this.schedulerSettingsa = FetchSchedulerSettings.setup(result[1])
          this.eventsCalendarService.schedulerSettings = this.schedulerSettingsa;
          this.isLoading = false;
          this.initSelectedCalendar()
        });

    });
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
    this.appointmentService.retrieveAppointment(Number(event.id)).pipe(
      map(appintment => {
        appintment.startDate = moment(newStart).unix() * 1000;
        appintment.endDate = moment(newEnd).unix() * 1000;
        return appintment;
      }),
      switchMap(appointmet => this.appointmentService.createAppointment(appointmet))
    ).subscribe((createdAppointment: any) => {
      var newChangedEvent: CalendarEvent = this.appointmentEventConverterService.convertToEvent(createdAppointment[0])
      RefreshSchedulerEvents.refresh(this.events.get(event.meta.calendar_id), newChangedEvent, AppointmentAction.EDIT_APPOINTMENT);
      this.refresh.next();
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
                RefreshSchedulerEvents.refresh(this.events.get(event.meta.calendar_id), result.event, AppointmentAction.EDIT_APPOINTMENT);
                this.refresh.next();
                this.toastr.success('Appointment updated Successfully');
              }
              if (result.action === 'status-cancled')
                this.appointmentActionsService.appointmnetStatusCancel(this.dialog, result.event).subscribe(result => {
                  RefreshSchedulerEvents.refresh(this.events.get(event.meta.calendar_id), result.event, AppointmentAction.EDIT_APPOINTMENT);
                  this.refresh.next();
                  this.toastr.success('Appointment updated Successfully');
                })
              if (result.action === 'status-noshow')
                this.appointmentActionsService.appointmnetStatusNoShow(this.dialog, result.event).subscribe(result => {
                  if (result.action !== 'cancel') {
                    RefreshSchedulerEvents.refresh(this.events.get(event.meta.calendar_id), result.event, AppointmentAction.EDIT_APPOINTMENT);
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
  getCalendars(clinicId: any): Observable<any> {
    return this.calendarServiceService.getAttachedCalendars(clinicId)
  }
  getSchedulerSettings(clinicId: any): Observable<any> {
    return this.schedulerConfigurationService.findSettings(clinicId)
  }


  isSelected(calendar: any): boolean {
    return this.selectedCalendars.some((item) => item.id === calendar.id);
  }
  private getSelectedClinic() {
    return this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null)
    )
  }
  // onCalendarChange(event: any, calendar: any): void {
  //   if (event.target.checked) {
  //     this.eventsCalendarService.get(calendar.id, this.selectedClinic, this.viewDate, this.view).subscribe(events => {
  //       this.events.push(calendar.id, events)
  //       this.selectedCalendars.push(calendar);
  //       this.refresh.next();
  //     })
  //   } else {
  //     this.selectedCalendars = this.selectedCalendars.filter(
  //       (item) => item.id !== calendar.id
  //     );
  //     this.events.removeById(calendar.id)
  //     this.refresh.next();
  //   }
  // }
  onChangeCalendars(event: any) {

    this.synchronizeLists(event, this.selectedCalendars)
  }
  private pickCalender(calendarId: number): Calendar {
    return this.calendars.find(calendar => calendar.id === calendarId);
  }
  private synchronizeLists(MS: string[], SC: Calendar[]): void {
    // Create a Set from the ids in SC for quick lookup
    const scIds = new Set(SC.map((item) => item.id));

    // 1. Add missing ids from MS to SC
    MS.forEach((id) => {
      if (!scIds.has(Number(id))) {
        this.eventsCalendarService.get(Number(id), this.selectedClinic, this.viewDate, this.view).subscribe(events => {
          SC.push(this.pickCalender(Number(id))); // Add the missing id as a new Calendar object
          scIds.add(Number(id)); // Update the set to include the new id
          this.events.push(Number(id), events)
          this.refresh.next();
        })
      }
    });

    // 2. Remove ids in SC that are not in MS    
    for (let i = SC.length - 1; i >= 0; i--) {
      if (!MS.includes(SC[i].id.toString())) {
        this.events.removeById(SC[i].id)
        SC.splice(i, 1); // Remove the item from SC
        this.refresh.next();
      }
    }
  }
  private initSelectedCalendar() {
    this.calendars.forEach(calendar => {
      this.selectedCalendars.push(calendar)
      this.eventsCalendarService.get(Number(calendar.id), this.selectedClinic, this.viewDate, this.view).subscribe(events => {
        this.events.push(Number(calendar.id), events)
        this.refresh.next();
      })
    })
  }
}

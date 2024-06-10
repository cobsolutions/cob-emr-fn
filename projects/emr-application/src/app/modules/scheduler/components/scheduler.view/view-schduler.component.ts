import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  CalendarEvent, CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';

import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { filter, map, Observable, Subject, switchMap } from 'rxjs';
import { LoggedInService } from "../../../security/service/loggedIn/logged-in.service";
import { AppointmentType } from "../../models/appointment.type";
import { SchedulerConfiguration } from "../../models/configuration";
import { AppointmentAction, RefreshSchedulerEvents } from "../../refresh.scheduler.event";
import { AppointmentActionsService } from "../../service/actions/appointment-actions.service";
import { AppointmentEventConverterService } from "../../service/appointment-event-converter.service";
import { AppointmentService } from "../../service/appointment.service";
import { AppointmentTypeService } from "../../service/appointment.type/appointment-type.service";
import { SchedulerConfigurationService } from "../../service/scheduler-configuration.service";
import { AppointmentAddComponent } from "../appointment.add/appointment-add.component";

@Component({
  selector: 'app-view-schduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    `,
  ],
  templateUrl: './view-schduler.component.html',
})
export class ViewSchdulerComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  appointmentStatusVisibility = false;
  appointmentEditVisibility = false;
  appointmentDeleteVisibility = false
  appointmentCancelNoShowVisibility = false
  view: CalendarView = CalendarView.Month;
  schedulerConfiguration$!: Observable<SchedulerConfiguration>;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
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
    private appointmentTypeService: AppointmentTypeService) { }

  ngOnInit(): void {
    this.getSchedulerConfiguration()
    this.getAppointments();
  }

  toggleAppointmentStatus() {
    this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
  }
  toggleAppointmentCancelNoShow() {
    this.appointmentCancelNoShowVisibility = !this.appointmentCancelNoShowVisibility;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    this.appointmentActionsService.addAppointment(this.dialog, this.viewDate).subscribe(result => {
      if (result.action !== 'cancel') {
        RefreshSchedulerEvents.refresh(this.events, result.event, AppointmentAction.ADD_APPOINTMENT);
        this.refresh.next();
        this.toastr.success('Appointment created Successfully');
      }
    })
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
  getAppointments() {
    var startOfMonth = moment(this.viewDate).startOf('month').unix() * 1000
    var endOfMonth = moment(this.viewDate).endOf('month').unix() * 1000;
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.appointmentService.retrieveAppointments(startOfMonth, endOfMonth, clinicId)),
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
  getAppointmnetType(name: string) {
    return this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => this.appointmentTypeService.retrieveAppointmentTypeByName(name, clinicId))
    )

  }
  changeAppointmentStatusVisibility(event: any) {
    if (event === 'close')
      this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
    if (event === 'cancel' || event === 'noshow') {
      this.cancelNoShow = event;
      this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
      this.appointmentCancelNoShowVisibility = !this.appointmentCancelNoShowVisibility;
    }
  }
  getSchedulerConfiguration() {
    this.schedulerConfiguration$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.schedulerConfigurationService.retrieveCliniSchedulerConfigurationById(clinicId))
    )
  }
}

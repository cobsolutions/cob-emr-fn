import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';

import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { filter, map, Observable, Subject, switchMap } from 'rxjs';
import { ClinicEmittingService } from "../../../common/service/emitting/clinic-emitting.service";
import { LoggedInService } from "../../../security/service/loggedIn/logged-in.service";
import { Appointment } from "../../models/appointment";
import { SchedulerConfiguration } from "../../models/configuration";
import { AppointmentEmittingService } from "../../service/appointment-emitting.service";
import { AppointmentEventConverterService } from "../../service/appointment-event-converter.service";
import { AppointmentService } from "../../service/appointment.service";
import { SchedulerConfigurationService } from "../../service/scheduler-configuration.service";
import { AppointmentDateAdjustor } from "../../util/appointment.date.adjustor";
import { AppointmentAddComponent } from "../appointment.add/appointment-add.component";

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
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
  addAppointmentVisibility = false;
  appointmentActionsVisibility = false;
  appointmentStatusVisibility = false;
  appointmentEditVisibility = false;
  appointmentDeleteVisibility = false
  appointmentCancelNoShowVisibility = false
  isCreate: boolean;
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
    private appointmentEmittingService: AppointmentEmittingService,
    private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.getSchedulerConfiguration()
    this.getAppointments();
  }
  toggleAddAppointment() {
    this.addAppointmentVisibility = !this.addAppointmentVisibility;
  }
  toggleAppointmentActions() {
    this.appointmentActionsVisibility = !this.appointmentActionsVisibility;
  }
  toggleAppointmentStatus() {
    this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
  }
  toggleAppointmentCancelNoShow() {
    this.appointmentCancelNoShowVisibility = !this.appointmentCancelNoShowVisibility;
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];




  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    this.isCreate = true;
    this.addAppointmentVisibility = !this.addAppointmentVisibility;
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
    this.appointmentEmittingService.event$.next(event);
    this.appointmentActionsVisibility = !this.appointmentActionsVisibility
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
  save() {
    if (this.appointmentAddComponent.appontmentForm.valid) {
      this.appointmentAddComponent.submitted = false
      var appointment: Appointment = this.appointmentAddComponent.appointment
      AppointmentDateAdjustor.adjust(appointment);
      this.appointmentService.createAppointment(appointment)
        .subscribe((result) => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointment)
          this.events.push(event);
          this.refresh.next();
          this.addAppointmentVisibility = !this.addAppointmentVisibility;
          if (this.isCreate)
            this.toastr.success('Appointment created Successfully');
          else
            this.toastr.success('Appointment updated Successfully');
          this.getAppointments();
        })
    } else {
      this.appointmentAddComponent.submitted = true
    }
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
  changeAppointmentActionsVisibility(event: any) {
    if (event === 'status')
      this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
    if (event === 'edit') {
      this.addAppointmentVisibility = !this.addAppointmentVisibility;
      this.isCreate = false;
    }
    this.appointmentActionsVisibility = !this.appointmentActionsVisibility;
  }
  changeAppointmentStatusVisibility(event: any) {
    if (event === 'close')
      this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
    if (event === 'cancel' || event === 'noshow') {
      this.cancelNoShow = event;
      this.appointmentStatusVisibility = !this.appointmentStatusVisibility;
      this.appointmentCancelNoShowVisibility = !this.appointmentCancelNoShowVisibility;
    }
    this.appointmentActionsVisibility = false;
  }
  changeAppointmentCancelNoShowVisibility(event: any) {
    if (event === 'close')
      this.appointmentCancelNoShowVisibility = !this.appointmentCancelNoShowVisibility;
  }
  getSchedulerConfiguration() {
    this.schedulerConfiguration$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.schedulerConfigurationService.retrieveCliniSchedulerConfigurationById(clinicId))
    )
  }
}

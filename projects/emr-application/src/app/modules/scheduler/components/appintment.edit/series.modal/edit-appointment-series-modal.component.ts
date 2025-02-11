import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { RenderEventsContainer } from '../../../models/render.events.container';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { ConstructAppointmentService } from '../../../service/construct.appointment/construct-appointment.service';
import { BlockAppointmentComponent } from '../../appointment.add/block.appointment/block-appointment.component';
import { FullAppointmentComponent } from '../../appointment.add/full.appointment/full-appointment.component';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'edit-appointment-series-modal',
  templateUrl: './edit-appointment-series-modal.component.html',
  styleUrls: ['./edit-appointment-series-modal.component.css']
})
export class EditAppointmentSeriesModalComponent implements OnInit {
  @ViewChild('fullAppointment') fullAppointment: FullAppointmentComponent;
  @ViewChild('blockAppointment') blockAppointment: BlockAppointmentComponent;
  isLoading: boolean = true;
  seriesId: number
  appointmentStrucutreType: string
  appointment: Appointment
  constructor(@Inject(MAT_DIALOG_DATA) public data: { renderEventsContainer: RenderEventsContainer, event: CalendarEvent, action: string, schedulerSettings: Settings, start: number, end: number }
    , private dialogRef: MatDialogRef<EditAppointmentSeriesModalComponent>
    , private loggedInService: LoggedInService
    , private appointmentService: AppointmentService
    , private appointmentEventConverterService: AppointmentEventConverterService
    , private constructAppointmentService: ConstructAppointmentService) { }

  ngOnInit(): void {
    this.seriesId = this.data.event.meta.seriesId
    this.appointmentStrucutreType = this.data.event.meta.structure
  }
  public update() {
    this.pickAppointment()
    var addedEvents: CalendarEvent[] = []
    var deletedEvents: CalendarEvent[] = []
    this.constructAppointmentService.constructAppointmentDate(this.appointment)
    this.appointmentService.updateSeriesAppointment(this.appointment, this.data.start, this.data.end).subscribe((appintmentsContainer: any) => {
      if (appintmentsContainer.deletedRenderAppointment === null) {
        appintmentsContainer.addedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          addedEvents.push(event);
        })
      }
      else {
        appintmentsContainer.addedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          addedEvents.push(event);
        })
        appintmentsContainer.deletedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          deletedEvents.push(event);
        })
      }
      var renderEventsContainer: RenderEventsContainer = {
        addedRenderEvents: addedEvents,
        deletedRenderEvents: deletedEvents
      }
      this.data.action = 'updated'
      this.data.renderEventsContainer = renderEventsContainer;
      this.dialogRef.close(this.data);
    })
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  private pickAppointment() {
    if (this.data.event.meta.structure === 'Full')
      this.appointment = this.fullAppointment.returnAppointment();
    if (this.data.event.meta.structure === 'Block')
      this.appointment = this.blockAppointment.returnAppointment();
    this.appointment.appointmentStructure = this.data.event.meta.structure
  }
}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentBlockSeries } from '../../../models/appointment.block.series';
import { AppointmentFullSeries } from '../../../models/appointment.full.series';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';
import { BlockSeriesAppointmentComponent } from '../block.series.appointment/block-series-appointment.component';
import { FullSeriesAppointmentComponent } from '../full.series.appointment/full-series-appointment.component';

@Component({
  selector: 'edit-appointment-series-modal',
  templateUrl: './edit-appointment-series-modal.component.html',
  styleUrls: ['./edit-appointment-series-modal.component.css']
})
export class EditAppointmentSeriesModalComponent implements OnInit {
  @ViewChild('fullSeriesAppointmentComponent') fullSeriesAppointmentComponent: FullSeriesAppointmentComponent;
  @ViewChild('BlockSeriesAppointmentComponent') BlockSeriesAppointmentComponent: BlockSeriesAppointmentComponent;
  isLoading: boolean = true;
  seriesId: number
  appointmentStrucutreType: string
  appointmentFullSeries: AppointmentFullSeries
  appointmentBlockSeries: AppointmentBlockSeries
  constructor(@Inject(MAT_DIALOG_DATA) public data: { events: CalendarEvent[], event: CalendarEvent, action: string, schedulerSettings: Settings }
    , private dialogRef: MatDialogRef<EditAppointmentSeriesModalComponent>
    , private loggedInService: LoggedInService
    , private appointmentService: AppointmentService
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.seriesId = this.data.event.meta.seriesId
    this.appointmentStrucutreType = this.data.event.meta.structure
    this.renderAppointmentSeries();
  }
  public update() {
    this.pickAppointment()
    var events: CalendarEvent[] = []
    this.appointmentService.updateFullAppointmentSerires(this.appointmentFullSeries, this.seriesId).subscribe((ereatedAppointmnets: any) => {
      ereatedAppointmnets.forEach(appointmet => {
        var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
        events.push(event);
      })
      this.data.events = events;
      this.dialogRef.close(this.data);
    })
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  private renderAppointmentSeries() {
    this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => this.appointmentService.getAppointmentSerires(clinicId, this.seriesId, this.appointmentStrucutreType))
    ).subscribe(appointmentSeries => {
      switch (this.appointmentStrucutreType) {
        case 'Block':
          this.appointmentBlockSeries = appointmentSeries;
          this.appointmentFullSeries = undefined
          break;
        case 'Full':
          this.appointmentFullSeries = appointmentSeries
          this.appointmentBlockSeries = undefined
          break;
      }
      this.isLoading = false;
    })
  }
  private pickAppointment() {
    if (this.data.event.meta.structure === 'Full') {
      this.appointmentFullSeries = this.fullSeriesAppointmentComponent.appointmentFullSeries;
    }
    if (this.data.event.meta.structure === 'Block') {
      this.appointmentBlockSeries = this.BlockSeriesAppointmentComponent.appointmentBlockSeries;
    }
  }
}

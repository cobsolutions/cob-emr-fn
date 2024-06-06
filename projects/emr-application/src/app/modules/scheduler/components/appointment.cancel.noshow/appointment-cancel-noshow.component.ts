import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs';
import { CancelNoShowReasons } from '../../../common/models/scheduler/cancel.noshow';
import { Appointment } from '../../models/appointment';
import { AppointmentCancelNoShowReason } from '../../models/appointment.cancel.no.show.reason';
import { AppointmentEmittingService } from '../../service/appointment-emitting.service';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment-cancel-noshow',
  templateUrl: './appointment-cancel-noshow.component.html',
  styleUrls: ['./appointment-cancel-noshow.component.css']
})
export class AppointmentCancelNoshowComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>();
  @Input() type: string;
  cancelNoShowReasons = CancelNoShowReasons;
  resonDate: Date;
  appointment: Appointment
  appointmentCancelNoShowReason: AppointmentCancelNoShowReason = {};
  constructor(private appointmentEmittingService: AppointmentEmittingService
    , private appointmentService: AppointmentService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.appointmentEmittingService.selectedAppointment$.pipe(
      filter((appointmentId) => appointmentId !== null),
      switchMap((appointmentId) => this.appointmentService.retrieveAppointment(appointmentId))
    ).subscribe((result) => {
      this.appointment = result
    })
  }
  onResonSelectionChange(event: any) {
    this.appointmentCancelNoShowReason.reason = event.target.value;
  }
  updateStatus() {
    if (this.type === 'cancel') {
      this.appointmentCancelNoShowReason.reasonDate = moment(this.resonDate).unix() * 1000;
      this.updateAppointmentStatus('Cancel', this.appointmentCancelNoShowReason)
    } else {
      this.updateAppointmentStatus('NoShow', this.appointmentCancelNoShowReason)
    }
  }
  private updateAppointmentStatus(status: string, appointmentCancelNoShowReason: AppointmentCancelNoShowReason) {
    this.appointment.appointmentStatus = status;
    this.appointment.appointmentCancelNoShowReason = appointmentCancelNoShowReason;
    this.appointmentService.createAppointment(this.appointment)
      .subscribe(() => {
        this.toastr.success('Appointment Status updated to ' + status);
        this.changeVisibility.emit('close');
      })

  }
}

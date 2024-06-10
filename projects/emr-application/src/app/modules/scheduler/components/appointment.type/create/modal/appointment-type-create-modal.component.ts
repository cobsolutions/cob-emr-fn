import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { filter, switchMap, tap } from 'rxjs';
import { AppointmentTypeService } from '../../../../service/appointment.type/appointment-type.service';
import { AppointmentTypeCreateComponent } from '../appointment-type-create.component';

@Component({
  selector: 'app-appointment-type-create-modal',
  templateUrl: './appointment-type-create-modal.component.html',
  styleUrls: ['./appointment-type-create-modal.component.css']
})
export class AppointmentTypeCreateModalComponent implements OnInit {
  @ViewChild('createAppointmentTypeComponent') createAppointmentTypeComponent: AppointmentTypeCreateComponent;
  constructor(private appointmentTypeService: AppointmentTypeService
    , @Inject(MAT_DIALOG_DATA) public data: { action: string }
    , private dialogRef: MatDialogRef<AppointmentTypeCreateModalComponent>
    , private logineService: LoggedInService) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  create() {
    this.logineService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        this.createAppointmentTypeComponent.appointmentType.clinicId = clinicId
        return this.appointmentTypeService.create(this.createAppointmentTypeComponent.appointmentType)
      })
    ).subscribe(result => {
      this.data.action = 'created'
      this.dialogRef.close(this.data);
    })
  }
}

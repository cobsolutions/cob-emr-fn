import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarEvent } from 'calendar-utils';
import { combineLatest, forkJoin, map, Observable, switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientChartAccessibilityModelRequest } from '../../../model/patient.chart.accessibility.model.request';
import { PatientChartAccessibilityModelResponse } from '../../../model/patient.chart.accessibility.model.response';
import { PatientChartCheckerService } from '../../../service/patient.chart.checker/patient-chart-checker.service';
import { AppointmentEditModalComponent } from '../../appintment.edit/modal/appointment-edit-modal.component';

@Component({
  selector: 'app-appointment-action-modal',
  templateUrl: './appointment-action-modal.component.html',
  styleUrls: ['./appointment-action-modal.component.css']
})
export class AppointmentActionModalComponent implements OnInit {
  patientName: string
  patientId: number;
  pateintCase: string
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  appointmentType: string;
  appointmentStatus: any;
  patientChartAccessibilityModelResponse: Observable<PatientChartAccessibilityModelResponse>
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>
    , private loggedInService: LoggedInService
    , private patientChartCheckerService: PatientChartCheckerService
    , private router: Router) { }

  ngOnInit(): void {
    this.initAppointmentPatientInfo();
    this.checkPatientChartAccessibility();
  }
  public editAppointment() {
    this.data.action = 'edit'
    this.dialogRef.close(this.data);
  }
  public openAppointmentStatus() {
    this.data.action = 'status'
    this.dialogRef.close(this.data);
  }
  public close() {
    this.dialogRef.close(null);
  }
  private initAppointmentPatientInfo() {
    this.patientName = this.data.event.title.split(':')[0]
    this.pateintCase = this.data.event.title.split(':')[1]
    this.patientId = this.data.event.meta.patient_id;
    this.appointmentStartDate = this.data.event.start
    this.appointmentEndDate = this.data.event.end;
    this.appointmentStatus = this.data.event.meta.status
    this.appointmentType = this.data.event.meta.type
  }
  redirectToPatientChart() {
    this.router.navigate(['emr/patient/chart/patientId/' + this.patientId]);
    this.dialogRef.close(null);
  }
  redirectWithPrompting() {
    this.dialogRef.close(null);
  }
  private checkPatientChartAccessibility() {
    var sources: any = [
      this.loggedInService.selectedClinic$,
      this.loggedInService.load()
    ]
    this.patientChartAccessibilityModelResponse = combineLatest(sources).pipe(
      map(result => {
        {
          return {
            patientId: this.patientId,
            clinicId: result[0],
            allowedClinics: result[1].clinics.map(clinic => {
              return clinic.id
            })
          }
        }
      })
      , switchMap(model => {
        return this.patientChartCheckerService.check(model)
      }
      )
    )
  }
}

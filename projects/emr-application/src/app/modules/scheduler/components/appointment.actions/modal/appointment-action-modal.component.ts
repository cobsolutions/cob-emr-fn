import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarEvent } from 'calendar-utils';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Clinic } from '../../../../patient/models/clinic';
import { PaymentType } from '../../../../common/models/enums/payment.type';
import { Patient } from '../../../../patient/models/patient';
import { PatientCase } from '../../../../patient/models/case/patient.case';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientChartAccessibilityModelResponse } from '../../../model/patient.chart.accessibility.model.response';
import { AppointmentActionsService } from '../../../service/actions/appointment-actions.service';
import { AppointmentService } from '../../../service/appointment.service';
import { PatientChartCheckerService } from '../../../service/patient.chart.checker/patient-chart-checker.service';
import { AppointmentEditModalComponent } from '../../appintment.edit/modal/appointment-edit-modal.component';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

export interface PatientPayment {
  insuranceName: string | null;
  paymentType: PaymentType | null;
  payment: string | null;
}

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
  appointmentStructure: string;
  patientChartAccessibilityModelResponse: PatientChartAccessibilityModelResponse
  isAppointmetSeries: boolean;
  isDeleting: boolean = false;
  patientPayment: PatientPayment | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string, schedulerSettings: Observable<Settings> }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>
    , private loggedInService: LoggedInService
    , private patientChartCheckerService: PatientChartCheckerService
    , private router: Router
    , private dialog: MatDialog
    , private appointmentActionsService: AppointmentActionsService
    , private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.initAppointmentPatientInfo();
    if (this.data.event.meta.structure !== 'Block') {
      this.checkPatientChartAccessibility();
      this.loadPatientCaseInsurance();
    }
    if (this.data.event.id !== this.data.event.meta.seriesId)
      this.isAppointmetSeries = true
    else
      this.isAppointmetSeries = false
  }
  public editAppointment() {
    this.data.action = 'edit'
    this.dialogRef.close(this.data);
  }
  public openAppointmentStatus() {
    this.data.action = 'status'
    this.dialogRef.close(this.data);
  }
  public deleteAppointment() {
    this.isDeleting = true;
    const appointmentId = this.data.event.id;
    const clinicId = this.loggedInService.selectedClinic$.value;
    this.appointmentService.deleteAppointmentByClinic(appointmentId, clinicId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.data.action = 'delete';
        this.dialogRef.close(this.data);
      },
      error: () => {
        this.isDeleting = false;
      }
    });
  }
  public close() {
    this.dialogRef.close(null);
  }
  private initAppointmentPatientInfo() {
    const [patientName, patientCase] = this.data.event.title.split(':');
    const formattedPatientCase = patientCase !== undefined ? (patientCase.includes('<br/>')
      ? patientCase.split('<br/>')[0]
      : patientCase) : "";
    this.patientName = patientName
    this.pateintCase = formattedPatientCase
    this.patientId = this.data.event.meta.patient_id;
    this.appointmentStartDate = this.data.event.start
    this.appointmentEndDate = this.data.event.end;
    this.appointmentStatus = this.data.event.meta.status
    this.appointmentType = this.data.event.meta.type
    this.appointmentStructure = this.data.event.meta.structure
  }
  showAppointmentHistory() {
    this.data.action = 'history';
    this.dialogRef.close(this.data);
  }
  redirectToPatientChart() {
    this.router.navigate([]).then((result) => {
      window.open('emr/patient/chart/patientId/' + this.patientId, '_blank');
    });
    this.dialogRef.close(null);
  }
  redirectWithPrompting(clinics: Clinic[]) {
    this.dialogRef.close(null);
    this.appointmentActionsService.promptPatientClinics(this.dialog, clinics, this.patientId)
  }
  private checkPatientChartAccessibility() {
    this.loggedInService.selectedClinic$.pipe(
      map(clinicId => {
        return {
          patientId: this.patientId,
          clinicId: clinicId[0],
          allowedClinics: this.loggedInService.getLoggedUser().clinics.map(clinic => {
            return clinic.id
          })
        }
      }),
      switchMap((model: any) => {
        return this.patientChartCheckerService.check(model)
      })
    ).subscribe((result: any) => {
      this.patientChartAccessibilityModelResponse = result
    })
  }

  private loadPatientCaseInsurance() {
    const appointmentId = this.data.event.id as number;
    forkJoin({
      patientCase: this.appointmentService.findAppointmentPatientCase(appointmentId),
      patient: this.appointmentService.findAppointmentPatient(appointmentId)
    }).subscribe({
      next: ({ patientCase, patient }: { patientCase: PatientCase, patient: Patient }) => {
        const primaryInsuranceName = patientCase?.caseInsuranceInformation?.primaryInsurance?.insuranceCompanyName;
        if (primaryInsuranceName && patient?.patientInsuranceModels) {
          const matchedInsurance = patient.patientInsuranceModels.find(
            insurance => insurance.insuranceCompany?.name === primaryInsuranceName
          );
          if (matchedInsurance) {
            this.patientPayment = {
              insuranceName: primaryInsuranceName,
              paymentType: matchedInsurance.paymentType,
              payment: matchedInsurance.paymentValue
            };
          }
        }
      }
    });
  }
}

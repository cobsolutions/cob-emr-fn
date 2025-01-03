import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { filter, map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointments/appointment';
import { UpcomingAppointmentService } from '../../../services/appointment/upcoming-appointment.service';
import { PateintCaseService } from '../../../services/patient/cases/pateint-case.service';

@Component({
  selector: 'app-upcoming-appointment',
  templateUrl: './upcoming-appointment.component.html',
  styleUrls: ['./upcoming-appointment.component.css']
})
export class UpcomingAppointmentComponent extends ListTemplate implements OnInit {

  @Input() patientId: number;
  @Input() caseId: number = 0
  appointments$!: Observable<Appointment[]>;
  columns: (string | IColumn)[];
  selectedClinic: Observable<number>
  constructor(
    private upcomingAppointmentService: UpcomingAppointmentService
    , private pateintCaseService: PateintCaseService
    ,private loggedInService: LoggedInService
  ) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.getSelectedClinic();
    this.columns = this.constructColumns(['appointmentStatus', 'startDate', 'endDate']);
    this.getAllAppointments();
    this.pateintCaseService.selectedCase$.pipe(
      filter(clinicId => clinicId != null)
    ).subscribe((caseId) => {
      this.caseId = caseId;
      this.getUpcomingAppointments();
    })
  }

  private getUpcomingAppointments() {
    if (this.caseId == 0) {
      this.getAllAppointments();
    }
    if (this.caseId > 0) {
      this.getAppointmentsByCase();
    }
  }

  private getAllAppointments() {
    this.appointments$ = this.upcomingAppointmentService.findAllIncomingAppointments(this.apiParams$, this.patientId).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }

  private getAppointmentsByCase() {
    this.appointments$ = this.upcomingAppointmentService.findIncomingAppointmentsByCase(this.apiParams$, this.patientId, this.caseId).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }
  private getSelectedClinic() {
    this.selectedClinic = this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      map(id => { return Number(id) })
    )
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { PatientName } from 'projects/emr-application/src/app/util/name.util';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { Appointment } from '../../../../scheduler/models/appointment';

import { PatientCase } from '../../../models/case/patient.case';
import { PatientRecord } from '../../../models/patient.record/patient.record';
import { PatientRecordRequest } from '../../../models/patient.record/patient.record.request';
import { CancelNoShowService } from '../../../services/appointment/cancel-no-show.service';
import { PatientRecordService } from '../../../services/patient/record/patient-record.service';

@Component({
  selector: 'app-patient-chart-case',
  templateUrl: './patient-chart-case.component.html',
  styleUrls: ['./patient-chart-case.component.css']
})
export class PatientChartCaseComponent extends ListTemplate implements OnInit {
  treatingDoctor: string;
  referringDoctor: string;
  referringNPI: string;
  @Input() case: PatientCase;
  @Input() patientId: number;
  @Input() clinicId: number;
  appointments$!: Observable<Appointment[]>;
  patientRecords$!: Observable<PatientRecord[]>
  reasonVisibility = false;
  columns: (string | IColumn)[];
  tmp: Appointment;
  tmpReasonDate: Date
  patientRecordAction: string;
  patientRecord: boolean = true;
  constructor(private cancelNoShowService: CancelNoShowService, private patientRecordService: PatientRecordService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['record', 'date', 'actions'], true);
    this.gettreatingDoctorFullName();
    this.getReferringCaseData();
    this.getAppointments();
    this.ddd();
  }

  toggleReasonVisibility(data: any) {
    this.tmp = data;
    this.tmpReasonDate = moment.unix(this.tmp?.appointmentCancelNoShowReason?.reasonDate / 1000).toDate();
    this.reasonVisibility = !this.reasonVisibility;
  }
  gettreatingDoctorFullName() {
    var fName: string = this.case.treatingDoctor?.firstName === undefined ? '' : this.case.treatingDoctor?.firstName;
    var mName: string = this.case.treatingDoctor?.middleName === undefined ? '' : this.case.treatingDoctor?.middleName;
    var lName: string = this.case.treatingDoctor?.lastName === undefined ? '' : this.case.treatingDoctor?.lastName;
    this.treatingDoctor = PatientName.formatName(fName, mName, lName)
  }

  getReferringCaseData() {
    this.referringDoctor = this.case.referralCase.referringPartyName === null ? '' : this.case.referralCase.referringPartyName;
    this.referringNPI = this.case.referralCase.referringPartyNPI === null ? '' : this.case.referralCase.referringPartyNPI;

  }
  private ddd() {
    const patientRecordRequest: PatientRecordRequest = {
      patientId: this.patientId,
      caseId: this.case.id
    }
    this.patientRecords$ = this.patientRecordService.find(this.apiParams$, patientRecordRequest).pipe(
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
    )
  }
  getAppointments() {
    if (this.case.id !== null)
      this.appointments$ = this.cancelNoShowService.findCancelNoShowAppointments(this.apiParams$, this.patientId, this.case.id).pipe(
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
  executeAction(val: string) {
    this.patientRecord = false;
    this.patientRecordAction = val;
    console.log(val)
  }
  handleBackAction() {
    this.patientRecord = true;
  }
}

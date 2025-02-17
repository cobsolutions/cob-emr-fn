import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { PatientPaymentRecordResponse } from '../../../models/chart/patient.payment/patient.payment.record.response';
import { PatientPaymentService } from '../../../services/patient/payment/patient-payment.service';

@Component({
  selector: 'patient-payment',
  templateUrl: './patient-payment.component.html',
  styleUrls: ['./patient-payment.component.css']
})
export class PatientPaymentComponent extends ListTemplate implements OnInit {
  patientPaymentRecordResponse$!: Observable<PatientPaymentRecordResponse[]>;
  columns: (string | IColumn)[];
  @Input() patientId: number;
  @Input() caseId: number;
  constructor(private patientPaymentService: PatientPaymentService) { super(); }

  ngOnInit(): void {
    this.columns = this.constructColumns(['amount', 'reason', 'createdAt', 'Actions']);
    this.getPatientPayments();
  }

  private getPatientPayments() {
    this.patientPaymentRecordResponse$ = this.patientPaymentService.findPatientPayments(this.apiParams$, this.patientId , this.caseId).pipe(
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
}

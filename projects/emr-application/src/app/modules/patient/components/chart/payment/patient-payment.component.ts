import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PatientCasePaymentComponent } from './patient-case-payment.component';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { PatientPaymentService } from '../../../services/patient/payment/patient-payment.service';
import { PatientCasePayment, PatientCasePaymentResponse } from '../../../models/chart/patient.payment/patient-case-payment.request';

@Component({
  selector: 'patient-payment',
  templateUrl: './patient-payment.component.html',
  styleUrls: ['./patient-payment.component.css']
})
export class PatientPaymentComponent implements OnInit {
  payments: PatientCasePayment[] = [];
  totalCharge: number = 0;
  totalPaid: number = 0;
  balance: number = 0;
  columns: (string | IColumn)[];
  @Input() patientId: number;
  @Input() caseId: number;
  @ViewChild(PatientCasePaymentComponent) casePaymentComponent: PatientCasePaymentComponent;
  showPaymentModal = false;
  showDeleteConfirmModal = false;
  paymentToDelete: number | null = null;
  isSaving = false;
  commonData: any;

  constructor(private patientPaymentService: PatientPaymentService) { }

  savePayment(): void {
    if (this.casePaymentComponent) {
      this.casePaymentComponent.savePayment();
    }
  }

  get savingState(): boolean {
    return this.casePaymentComponent?.isSaving || false;
  }

  openPaymentModal(): void {
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
  }

  onPaymentSaved(): void {
    this.closePaymentModal();
    this.loadPayments();
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  private loadPayments(): void {
    this.patientPaymentService.findCasePayments(this.caseId).subscribe({
      next: (response: PatientCasePaymentResponse) => {
        this.payments = response?.payments || [];
        this.totalCharge = response?.totalCharge || 0;
        this.totalPaid = response?.totalPaid || 0;
        this.balance = response?.balance || 0;
        this.commonData = {
          dateOfTransaction: response?.payments[0]?.dateOfTransaction,
          paymentMethod: response?.payments[0]?.paymentMethod,
          providerId: response?.payments[0]?.providerId
        };
      },
      error: (err) => {
        console.error('Error loading payments:', err);
        this.payments = [];
        this.totalCharge = 0;
        this.totalPaid = 0;
        this.balance = 0;
      }
    });
  }

  formatChargeType(type: string): string {
    if (!type) return '';
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }

  deletePayment(id: number): void {
    this.paymentToDelete = id;
    this.showDeleteConfirmModal = true;
  }

  confirmDelete(): void {
    if (this.paymentToDelete === null) return;

    this.patientPaymentService.deleteCasePayment(this.paymentToDelete).subscribe({
      next: () => {
        this.loadPayments();
        this.closeDeleteConfirmModal();
      },
      error: (err) => {
        console.error('Error deleting payment:', err);
        this.closeDeleteConfirmModal();
      }
    });
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.paymentToDelete = null;
  }
}

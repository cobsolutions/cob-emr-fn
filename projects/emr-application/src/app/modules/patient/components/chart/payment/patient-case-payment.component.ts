import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicalUserService } from '../../../../users/services/clinical/clinical-user.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientPaymentService } from '../../../services/patient/payment/patient-payment.service';
import { ChargeType, PatientCasePayment } from '../../../models/chart/patient.payment/patient-case-payment.request';

@Component({
  selector: 'patient-case-payment',
  templateUrl: './patient-case-payment.component.html',
  styleUrls: ['./patient-case-payment.component.css']
})
export class PatientCasePaymentComponent implements OnInit {
  @Input() patientId: number;
  @Input() caseId: number;
  @Input() commonData: any
  @Output() paymentSaved = new EventEmitter<void>();

  paymentForm: FormGroup;
  chargeTypes = Object.values(ChargeType);
  paymentMethods: string[] = ['Cash', 'Credit Card', 'Debit Card', 'Check', 'Insurance'];
  providers: any[] = [];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private clinicalUserService: ClinicalUserService,
    private loggedInService: LoggedInService,
    private patientPaymentService: PatientPaymentService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProviders();
    this.loadUnpaidPayments();
    this.loadHeaderData();

  }

  private loadProviders(): void {
    const organizationId = this.loggedInService.getLoggedUser()?.organizationId;
    if (organizationId) {
      this.clinicalUserService.getAllClinicalUsersByOrganization(organizationId).subscribe({
        next: (response: any) => {
          this.providers = response || [];
        },
        error: (err) => {
          console.error('Error loading providers:', err);
        }
      });
    }
  }

  private loadUnpaidPayments(): void {
    this.patientPaymentService.findUnpaidCasePayments(this.caseId).subscribe({
      next: (response: PatientCasePayment[]) => {
        const unpaidPayments = response || [];
        if (unpaidPayments.length > 0) {
          const firstPayment = unpaidPayments[0];
          this.paymentForm.patchValue({
            dateOfTransaction: firstPayment.dateOfTransaction ? new Date(firstPayment.dateOfTransaction) : new Date(),
            paymentMethod: firstPayment.paymentMethod || '',
            provider: firstPayment.providerId || ''
          });
        }
        unpaidPayments.forEach(payment => {
          this.addChargeFromPayment(payment);
        });
      },
      error: (err) => {
        console.error('Error loading unpaid payments:', err);
      }
    });
  }
  private loadHeaderData() {
    if (this.commonData.dateOfTransaction !== null)
      this.paymentForm.get('dateOfTransaction').setValue(this.commonData.dateOfTransaction)
    if (this.commonData.paymentMethod !== null)
      this.paymentForm.get('paymentMethod').setValue(this.commonData.paymentMethod)
    if (this.commonData.providerId !== null)
      this.paymentForm.get('provider').setValue(this.commonData.providerId)
  }

  private addChargeFromPayment(payment: PatientCasePayment): void {
    const chargeGroup = this.fb.group({
      id: [payment.id],
      dateOfService: [payment.dateOfService ? new Date(payment.dateOfService) : new Date(), Validators.required],
      chargeType: [payment.chargeType || '', Validators.required],
      amountDue: [payment.amountDue || 0, [Validators.required, Validators.min(0.01)]],
      description: [payment.description || ''],
      paid: [payment.paid || false]
    });
    this.charges.push(chargeGroup);
  }

  private initForm(): void {
    this.paymentForm = this.fb.group({
      dateOfTransaction: [new Date(), Validators.required],
      paymentMethod: ['', Validators.required],
      provider: ['', Validators.required],
      charges: this.fb.array([])
    });
  }

  get charges(): FormArray {
    return this.paymentForm.get('charges') as FormArray;
  }

  addCharge(): void {
    const chargeGroup = this.fb.group({
      id: [null],
      dateOfService: [new Date(), Validators.required],
      chargeType: ['', Validators.required],
      amountDue: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
      paid: [false]
    });
    this.charges.push(chargeGroup);
  }

  removeCharge(index: number): void {
    this.charges.removeAt(index);
  }

  resetForm(): void {
    this.charges.clear();
    this.paymentForm.reset({
      dateOfTransaction: new Date(),
      paymentMethod: '',
      provider: ''
    });
  }

  formatChargeType(type: string): string {
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }

  savePayment(): void {
    if (this.charges.length === 0 || this.isSaving) {
      return;
    }

    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) {
      return;
    }

    this.isSaving = true;
    const formValue = this.paymentForm.value;
    const payments: PatientCasePayment[] = formValue.charges.map((charge: any) => ({
      id: charge.id,
      dateOfTransaction: this.formatDate(formValue.dateOfTransaction),
      paymentMethod: formValue.paymentMethod,
      providerId: formValue.provider,
      dateOfService: this.formatDate(charge.dateOfService),
      chargeType: charge.chargeType,
      amountDue: charge.amountDue,
      description: charge.description,
      patientCaseId: this.caseId,
      paid: charge.paid
    }));

    this.patientPaymentService.createCasePayments(this.caseId, payments).subscribe({
      next: () => {
        this.isSaving = false;
        this.paymentSaved.emit();
      },
      error: (err) => {
        console.error('Error saving payments:', err);
        this.isSaving = false;
      }
    });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}

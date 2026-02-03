import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProviders();
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

  private initForm(): void {
    this.paymentForm = this.fb.group({
      dateOfTransaction: [new Date()],
      paymentMethod: [''],
      provider: [''],
      charges: this.fb.array([])
    });
  }

  get charges(): FormArray {
    return this.paymentForm.get('charges') as FormArray;
  }

  addCharge(): void {
    const chargeGroup = this.fb.group({
      dateOfService: [new Date()],
      chargeType: [''],
      amountDue: [0],
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

    this.isSaving = true;
    const formValue = this.paymentForm.value;
    const payments: PatientCasePayment[] = formValue.charges.map((charge: any) => ({
      dateOfTransaction: this.formatDate(formValue.dateOfTransaction),
      paymentMethod: formValue.paymentMethod,
      providerId: formValue.provider,
      dateOfService: this.formatDate(charge.dateOfService),
      chargeType: charge.chargeType,
      amountDue: charge.amountDue,
      description: charge.description,
      patientCaseId: this.caseId
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

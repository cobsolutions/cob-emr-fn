import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatientCase } from '../../models/case/patient.case';
import { PatientCaseAuthorization } from '../../models/patient.authorization/patient.case.authorization';
import { PatientCaseAuthorizationService } from '../../services/patient/authorization/patient-case-authorization.service';

@Component({
  selector: 'authorization-patient-case',
  templateUrl: './authorization-patient-case.component.html',
  styleUrls: ['./authorization-patient-case.component.css']
})
export class AuthorizationPatientCaseComponent implements OnInit {
  @Input() patientCase: PatientCase
  authForm!: FormGroup;
  @Output() changeVisibility = new EventEmitter<string>()
  editingIndex: number | null = null;
  authList: PatientCaseAuthorization[] = [];
  showModal = false;

  constructor(private fb: FormBuilder, private authService: PatientCaseAuthorizationService) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      id: [null],
      authName: [null, [Validators.required]],
      authType: ['visit', [Validators.required]],
      authNumber: [null, [Validators.required, Validators.min(1)]],
      effectiveStart: [null, [Validators.required]],
      effectiveEnd: [null, [Validators.required]],
      insuranceCase: [{ value: null, disabled: true }]
    });
    this.loadAuths();
  }

  private loadAuths(): void {
    this.authService.list(this.patientCase.id).subscribe({
      next: (data) => {
        this.authList = data.map(auth => ({
          ...auth,
          effectiveStart: moment(auth.effectiveStart).endOf('day').valueOf(),
          effectiveEnd: moment(auth.effectiveEnd).endOf('day').valueOf()
        }));
      },
      error: (err) => console.error('Failed to load auths', err)
    });
  }

  openAddModal(): void {
    this.authForm.reset({ id: null, authType: 'visit' });
    this.editingIndex = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.authForm.reset({ id: null, authType: 'visit' });
    this.editingIndex = null;
    this.showModal = false;
  }

  onEditAuth(auth: PatientCaseAuthorization, index: number): void {
    this.authForm.patchValue({
      id: auth.id ?? null,
      authName: auth.authName,
      authType: auth.authType,
      authNumber: auth.authNumber,
      effectiveStart: auth.effectiveStart
        ? moment(Number(auth.effectiveStart)).format('YYYY-MM-DD')
        : '',
      effectiveEnd: auth.effectiveEnd
        ? moment(Number(auth.effectiveEnd)).format('YYYY-MM-DD')
        : '',
      insuranceName: auth.insuranceName,
      insuranceId: auth.insuranceId
    });

    this.editingIndex = index;
    this.showModal = true;
  }

  onSave(): void {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const raw = this.authForm.getRawValue();
    const record: PatientCaseAuthorization = {
      id: raw.id ?? null,
      authName: raw.authName,
      authType: raw.authType,
      authNumber: raw.authNumber,
      effectiveStart: moment(raw.effectiveStart).endOf('day').valueOf(),
      effectiveEnd: moment(raw.effectiveEnd).endOf('day').valueOf(),
      insuranceName: this.patientCase.caseInsuranceInformation?.primaryInsurance?.insuranceCompanyName,
      insuranceId: Number(this.patientCase.caseInsuranceInformation?.primaryInsurance?.insuranceIdNumber)
    };

    if (this.editingIndex !== null) {
      this.authList[this.editingIndex] = record;
    } else {
      this.authList.push(record);
    }

    // Persist full list to backend
    const payload = this.authList.map(a => ({
      ...a,
      effectiveStart: moment(a.effectiveStart).endOf('day').valueOf(),
      effectiveEnd: moment(a.effectiveEnd).endOf('day').valueOf()
    }));

    this.authService.saveOrUpdate(payload, this.patientCase.id).subscribe({
      next: (updatedList) => {
        this.authList = updatedList.map(a => ({
          ...a,
          effectiveStart: moment(a.effectiveStart).endOf('day').valueOf(),
          effectiveEnd: moment(a.effectiveEnd).endOf('day').valueOf()
        }));
        this.closeModal();
      },
      error: (err) => console.error('Failed to save auths', err)
    });
  }

  onRemoveAuth(index: number): void {
    this.authList.splice(index, 1);

    // Persist the updated list
    const payload = this.authList.map(a => ({
      ...a,
      effectiveStart: moment(a.effectiveStart).endOf('day').valueOf(),
      effectiveEnd: moment(a.effectiveEnd).endOf('day').valueOf()
    }));

    this.authService.saveOrUpdate(payload, this.patientCase.id).subscribe({
      next: (updatedList) => {
        this.authList = updatedList.map(a => ({
          ...a,
          effectiveStart: moment(a.effectiveStart).endOf('day').valueOf(),
          effectiveEnd: moment(a.effectiveEnd).endOf('day').valueOf()
        }));
      },
      error: (err) => console.error('Failed to remove auth', err)
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PatientCaseAuthorization } from '../../models/patient.authorization/patient.case.authorization';
import { PatientCaseAuthorizationService } from '../../services/patient/authorization/patient-case-authorization.service';

@Component({
  selector: 'authorization-patient-case',
  templateUrl: './authorization-patient-case.component.html',
  styleUrls: ['./authorization-patient-case.component.css']
})
export class AuthorizationPatientCaseComponent implements OnInit {

  authForm!: FormGroup;
  @Output() changeVisibility = new EventEmitter<string>()
  editingIndex: number | null = null;
  authList: PatientCaseAuthorization[] = [];
  
  constructor(private fb: FormBuilder, private authService: PatientCaseAuthorizationService) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      id: [null],
      authName: [null, [Validators.required]],
      authType: [null, [Validators.required]],
      authNumber: [null, [Validators.required, Validators.min(1)]],
      effectiveStart: [null, [Validators.required]],
      effectiveEnd: [null, [Validators.required]],
      insuranceCase: [{ value: 'Axa', disabled: true }]
    });
    this.loadAuths();
  }
  private loadAuths(): void {
    this.authService.list().subscribe({
      next: (data) => {
        // convert millis back to Date objects for the form
        this.authList = data.map(auth => ({
          ...auth,
          effectiveStart: this.toMillis(auth.effectiveStart),
          effectiveEnd: this.toMillis(auth.effectiveEnd)
        }));
      },
      error: (err) => console.error('Failed to load auths', err)
    });
  }
  onAdd(): void {
    if (this.authForm.valid) {
      const raw = this.authForm.getRawValue();

      const record: PatientCaseAuthorization = {
        id: raw.id ?? null,              // <-- preserve id when editing
        authName: raw.authName,
        authType: raw.authType,
        authNumber: raw.authNumber,
        effectiveStart: this.toMillis(raw.effectiveStart),
        effectiveEnd: this.toMillis(raw.effectiveEnd),
        insuranceName: raw.insuranceName,
        insuranceId: raw.insuranceId
      };

      if (this.editingIndex !== null) {
        // update local list in-place (keeps id)
        this.authList[this.editingIndex] = record;
        this.editingIndex = null;
      } else {
        // push new (id will be null until persisted)
        this.authList.push(record);
      }

      // clear form — important: reset id to null to avoid accidental reuse
      this.authForm.reset({ id: null });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
  onSave(): void {
    // Normalize dates and ensure id fields are present (or null)
    const payload = this.authList.map(a => ({
      ...a,
      effectiveStart: this.toMillis(a.effectiveStart),
      effectiveEnd: this.toMillis(a.effectiveEnd)
    }));
    console.log(JSON.stringify(payload))
    this.authService.saveOrUpdate(payload).subscribe({
      next: (updatedList) => {
        // backend returns saved records including generated ids; normalize dates to ms
        this.authList = updatedList.map(a => ({
          ...a,
          effectiveStart: this.toMillis(a.effectiveStart),
          effectiveEnd: this.toMillis(a.effectiveEnd)
        }));

        // reset UI state
        this.authForm.reset({ id: null });
        this.editingIndex = null;
        this.changeVisibility.emit('close');
      },
      error: (err) => console.error('Failed to save auths', err)
    });
  }
  onCancel(): void {
    this.authForm.reset();
    this.changeVisibility.emit('close');
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
  }

  onRemoveAuth(index: number): void {
    this.authList.splice(index, 1);
  }
  private toMillis(value: any): number {
    if (!value) return 0;
    return Number(moment(value).format('x')) ?? 0;
  }
}

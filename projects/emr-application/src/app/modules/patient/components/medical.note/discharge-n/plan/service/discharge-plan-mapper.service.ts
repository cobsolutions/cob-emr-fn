import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DischargePlan } from '../model/discharge-plan';

@Injectable({
  providedIn: 'root'
})
export class DischargePlanMapperService {

  constructor() { }

  /**
   * Converts form values to DischargePlan model (for sending to backend)
   * @param formValue FormGroup with form fields
   * @returns DischargePlan model
   */
  toModel(formValue: FormGroup): DischargePlan {
    return {
      reason: formValue.get('reason')?.value || '',
      discharge: formValue.get('discharge')?.value || '',
      physicianSignature: formValue.get('physicianSignature')?.value || false
    };
  }

  /**
   * Converts DischargePlan model to form values (for patching the form)
   * @param dto DischargePlan model
   * @returns Form values object matching form control names
   */
  fromDto(dto: DischargePlan): any {
    if (!dto) {
      return {
        reason: '',
        discharge: '',
        physicianSignature: false
      };
    }

    return {
      reason: dto.reason || '',
      discharge: dto.discharge || '',
      physicianSignature: dto.physicianSignature || false
    };
  }
}

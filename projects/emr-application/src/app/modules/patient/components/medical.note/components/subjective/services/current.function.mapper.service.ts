import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrentFunction } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CurrentFunctionMapperService {
//CurrentFunction
  constructor() { }
   /**
   * Maps CurrentFunction section from form (mixed kebab-snake format) to DTO (camelCase)
   * @param formGroup - The form group containing prior function form controls
   * @returns PriorFunction DTO for backend
   */
   toModel(formGroup: FormGroup): CurrentFunction {
    const mapped: CurrentFunction = {};

    // Helper to get value from form control
    const getValue = (controlName: string) => {
      const value = formGroup.get(controlName)?.value;
      // Return the value as-is, including false
      return value;
    };
    
    return mapped;
  }
  /**
   * Maps CurrentFunction section from DTO to form values
   * @param priorFunction - The PriorFunction DTO from backend
   * @param formGroup - Optional FormGroup to set values directly
   * @returns Object that can be used with formGroup.patchValue()
   */
  fromDto(priorFunction: CurrentFunction, formGroup?: FormGroup): any {
    if (!priorFunction) return {};

    const formValue: any = {};

    // Helper to set value in both formValue object and optionally in formGroup
    const setValue = (controlName: string, value: any) => {
      if (value !== undefined && value !== null) {
        formValue[controlName] = value;
        if (formGroup) {
          formGroup.get(controlName)?.setValue(value);
        }
      }
    };
    return formValue;
  }
}

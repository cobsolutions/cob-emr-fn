import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DailyNotePlan } from '../model/daily-note-plan';

@Injectable({
  providedIn: 'root'
})
export class DailyNotePlanMapperService {

  constructor() { }

  /**
   * Converts form values to DailyNotePlan model (for sending to backend)
   * @param formValue FormGroup with snake_case fields
   * @returns DailyNotePlan model with camelCase fields
   */
  toModel(formValue: FormGroup): DailyNotePlan {
    return {
      instruction: formValue.get('instructions')?.value || '',
      description: formValue.get('free_area_text')?.value || ''
    };
  }

  /**
   * Converts DailyNotePlan model to form values (for patching the form)
   * @param dto DailyNotePlan model with camelCase fields
   * @returns Form values object with snake_case fields matching form control names
   */
  fromDto(dto: DailyNotePlan): any {
    if (!dto) {
      return {
        instructions: '',
        free_area_text: ''
      };
    }

    return {
      instructions: dto.instruction || '',
      free_area_text: dto.description || ''
    };
  }
}

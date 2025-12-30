import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PriorFunction } from '../models/PriorFunction';
import { CarryingMovingHandlingObjectsDTOMapper } from './prior.function.mapper/dto/carrying.moving.handling.objects.mapper.dto';
import { ChangingMaintainingBodyPositionDTOMapper } from './prior.function.mapper/dto/changing.maintaining.body.position.mapper.dto';
import { MobilityWalkingMovingAroundDTOMapper } from './prior.function.mapper/dto/mobility.walking.moving.around.mapper.dto';
import { SelfCareDTOMapper } from './prior.function.mapper/dto/self.care.mapper.dto';
import { CarryingMovingHandlingObjectsMapper } from './prior.function.mapper/form/carrying.moving.handling.objects.mapper.model';
import { ChangingMaintainingBodyPositionMapper } from './prior.function.mapper/form/changing.maintaining.body.position.mapper.model';
import { MobilityWalkingMovingAroundMapper } from './prior.function.mapper/form/mobility.walking.moving.around.mapper.model';
import { SelfCareMapper } from './prior.function.mapper/form/self.care.mapper.model';

@Injectable({
  providedIn: 'root'
})
export class PriorFunctionMapperService {

  constructor() { }

  /**
   * Maps priorFunction section from form (mixed kebab-snake format) to DTO (camelCase)
   * @param formGroup - The form group containing prior function form controls
   * @returns PriorFunction DTO for backend
   */
  toModel(formGroup: FormGroup): PriorFunction {
    const mapped: PriorFunction = {};

    // Helper to get value from form control
    const getValue = (controlName: string) => {
      const value = formGroup.get(controlName)?.value;
      // Return the value as-is, including false
      return value;
    };
    // Call helper methods for other sections
    SelfCareMapper.map(formGroup, mapped, getValue);
    MobilityWalkingMovingAroundMapper.map(formGroup, mapped, getValue);
    ChangingMaintainingBodyPositionMapper.map(formGroup, mapped, getValue);
    CarryingMovingHandlingObjectsMapper.map(formGroup, mapped, getValue);
    this.mapPriorFunctionComments(formGroup, mapped, getValue);

    return mapped;
  }

  private mapPriorFunctionComments(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== COMMENTS ==========

    const priorLevelFunctionOther = getValue('priorLevelFunctionOther');
    if (priorLevelFunctionOther !== undefined) {
      mapped.priorLevelFunctionOther = priorLevelFunctionOther;
    }

    const priorLevelFunctionOtherText = getValue('priorLevelFunctionOtherText');
    if (priorLevelFunctionOtherText !== undefined && priorLevelFunctionOtherText !== '') {
      mapped.priorLevelFunctionOtherText = priorLevelFunctionOtherText;
    }

    const priorLevelFunctionSelfCareComment = getValue('priorLevelFunctionSelfCareComment');
    if (priorLevelFunctionSelfCareComment !== undefined && priorLevelFunctionSelfCareComment !== '') {
      mapped.priorLevelFunctionSelfCareComment = priorLevelFunctionSelfCareComment;
    }

    const priorLevelFunctionMobilityComment = getValue('priorLevelFunctionMobilityWalkingMovingAroundComment');
    if (priorLevelFunctionMobilityComment !== undefined && priorLevelFunctionMobilityComment !== '') {
      mapped.priorLevelFunctionMobilityWalkingMovingAroundComment = priorLevelFunctionMobilityComment;
    }

    const priorLevelFunctionChangingComment = getValue('priorLevelFunctionChangingMaintainingBodyPositionComment');
    if (priorLevelFunctionChangingComment !== undefined && priorLevelFunctionChangingComment !== '') {
      mapped.priorLevelFunctionChangingMaintainingBodyPositionComment = priorLevelFunctionChangingComment;
    }

    const priorLevelFunctionCarryingComment = getValue('priorLevelFunctionCarryingMovingHandlingObjectsComment');
    if (priorLevelFunctionCarryingComment !== undefined && priorLevelFunctionCarryingComment !== '') {
      mapped.priorLevelFunctionCarryingMovingHandlingObjectsComment = priorLevelFunctionCarryingComment;
    }
  }

  /**
   * Maps priorFunction section from DTO to form values
   * @param priorFunction - The PriorFunction DTO from backend
   * @param formGroup - Optional FormGroup to set values directly
   * @returns Object that can be used with formGroup.patchValue()
   */
  fromDto(priorFunction: PriorFunction, formGroup?: FormGroup): any {
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

    // Continue with other sections
    SelfCareDTOMapper.map(priorFunction, setValue);
    MobilityWalkingMovingAroundDTOMapper.map(priorFunction, setValue)
    ChangingMaintainingBodyPositionDTOMapper.map(priorFunction, setValue);
    CarryingMovingHandlingObjectsDTOMapper.map(priorFunction, setValue);
    this.mapCommentsFromDto(priorFunction, setValue);

    return formValue;
  }
  
  private mapCommentsFromDto(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    setValue('priorLevelFunctionOther', priorFunction.priorLevelFunctionOther);
    setValue('priorLevelFunctionOtherText', priorFunction.priorLevelFunctionOtherText);
    setValue('priorLevelFunctionSelfCareComment', priorFunction.priorLevelFunctionSelfCareComment);
    setValue('priorLevelFunctionMobilityWalkingMovingAroundComment', priorFunction.priorLevelFunctionMobilityWalkingMovingAroundComment);
    setValue('priorLevelFunctionChangingMaintainingBodyPositionComment', priorFunction.priorLevelFunctionChangingMaintainingBodyPositionComment);
    setValue('priorLevelFunctionCarryingMovingHandlingObjectsComment', priorFunction.priorLevelFunctionCarryingMovingHandlingObjectsComment);
  }
}

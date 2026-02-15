import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrentFunction } from '../models';
import { CarryingMovingHandlingObjectsDTOMapper } from './current.function.mapper/dto/carrying.moving.handling.objects.mapper.dto';
import { ChangingMaintainingBodyPositionDTOMapper } from './current.function.mapper/dto/changing.maintaining.body.position.mapper.dto';
import { MobilityWalkingMovingAroundDTOMapper } from './current.function.mapper/dto/mobility.walking.moving.around.mapper.dto';
import { SelfCareDTOMapper } from './current.function.mapper/dto/self.care.mapper.dto';
import { CarryingMovingHandlingObjectsMapper } from './current.function.mapper/form/carrying.moving.handling.objects.mapper.model';
import { ChangingMaintainingBodyPositionMapper } from './current.function.mapper/form/changing.maintaining.body.position.mapper.model';
import { MobilityWalkingMovingAroundMapper } from './current.function.mapper/form/mobility.walking.moving.around.mapper.model';
import { SelfCareMapper } from './current.function.mapper/form/self.care.mapper.model';

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
    SelfCareMapper.map(formGroup, mapped, getValue);
    MobilityWalkingMovingAroundMapper.map(formGroup, mapped, getValue);
    ChangingMaintainingBodyPositionMapper.map(formGroup, mapped, getValue);
    CarryingMovingHandlingObjectsMapper.map(formGroup, mapped, getValue);
    this.mapCurrentFunctionComments(formGroup, mapped, getValue);
    return mapped;
  }

  private mapCurrentFunctionComments(formGroup: FormGroup, mapped: CurrentFunction, getValue: (controlName: string) => any): void {
    // ========== OTHER & COMMENTS ==========

    const currentFunctionalLimitationsOther = getValue('current_functional_limitations_other');
    if (currentFunctionalLimitationsOther !== undefined) {
      mapped.currentFunctionalLimitationsOther = currentFunctionalLimitationsOther;
    }

    const currentFunctionalLimitationsOtherText = getValue('current_functional_limitations_function_other_text');
    if (currentFunctionalLimitationsOtherText !== undefined && currentFunctionalLimitationsOtherText !== '') {
      mapped.currentFunctionalLimitationsOtherText = currentFunctionalLimitationsOtherText;
    }

    const assistiveDeviceText = getValue('current-level-function_mobility-walking-moving-around_assistive_device_input');
    if (assistiveDeviceText !== undefined && assistiveDeviceText !== '') {
      if (!mapped.mobilityWalkingMovingAround) {
        mapped.mobilityWalkingMovingAround = {} as any;
      }
      mapped.mobilityWalkingMovingAround.assistiveDeviceText = assistiveDeviceText;
    }

    const lowerExtremitiesText = getValue('current-level-function_carrying-moving-handling-objects_lower_extremities_input');
    if (lowerExtremitiesText !== undefined && lowerExtremitiesText !== '') {
      if (!mapped.carryingMovingHandlingObjects) {
        mapped.carryingMovingHandlingObjects = {} as any;
      }
      if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) {
        mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
      }
      mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.lowerExtremitiesText = lowerExtremitiesText;
    }

    const communityIntegrationText = getValue('current-level-function_carrying-moving-handling-objects_community_integration_input');
    if (communityIntegrationText !== undefined && communityIntegrationText !== '') {
      if (!mapped.carryingMovingHandlingObjects) {
        mapped.carryingMovingHandlingObjects = {} as any;
      }
      mapped.carryingMovingHandlingObjects.communityIntegrationText = communityIntegrationText;
    }

    const workVocationText = getValue('current-level-function_carrying-moving-handling-objects_work_vocation_input');
    if (workVocationText !== undefined && workVocationText !== '') {
      if (!mapped.carryingMovingHandlingObjects) {
        mapped.carryingMovingHandlingObjects = {} as any;
      }
      mapped.carryingMovingHandlingObjects.workVocationText = workVocationText;
    }

    const recreationText = getValue('current-level-function_carrying-moving-handling-objects_recreation_input');
    if (recreationText !== undefined && recreationText !== '') {
      if (!mapped.carryingMovingHandlingObjects) {
        mapped.carryingMovingHandlingObjects = {} as any;
      }
      mapped.carryingMovingHandlingObjects.recreationText = recreationText;
    }

    // Category comments
    const selfCareComment = getValue('current-level-function_self-care_comment');
    if (selfCareComment !== undefined && selfCareComment !== '') {
      mapped.currentFunctionalLimitationsSelfCareComment = selfCareComment;
    }

    const mobilityComment = getValue('current-level-function_mobility-walking-moving-around_comment');
    if (mobilityComment !== undefined && mobilityComment !== '') {
      mapped.currentFunctionalLimitationsMobilityWalkingMovingAroundComment = mobilityComment;
    }

    const changingComment = getValue('current-level-function_changing-maintaining-body-position_comment');
    if (changingComment !== undefined && changingComment !== '') {
      mapped.currentFunctionalLimitationsChangingMaintainingBodyPositionComment = changingComment;
    }

    const carryingComment = getValue('current-level-function_carrying-moving-handling-objects_comment');
    if (carryingComment !== undefined && carryingComment !== '') {
      mapped.currentFunctionalLimitationsCarryingMovingHandlingObjectsComment = carryingComment;
    }

    // Specialty fields - convert "yes"/"no" radio values to boolean
    const lymphedema = getValue('current_functional_limitations_function_other_lymphedema');
    if (lymphedema !== undefined) {
      mapped.currentFunctionalLimitationsLymphedema = lymphedema === 'yes';
    }

    const lymphedemaText = getValue('current_functional_limitations_function_other_lymphedema_text');
    if (lymphedemaText !== undefined && lymphedemaText !== '') {
      mapped.currentFunctionalLimitationsLymphedemaText = lymphedemaText;
    }

    const woundHealing = getValue('current_functional_limitations_function_other_wound_healing');
    if (woundHealing !== undefined) {
      mapped.currentFunctionalLimitationsWoundHealing = woundHealing === 'yes';
    }

    const woundHealingText = getValue('current_functional_limitations_function_other_wound_healing_text');
    if (woundHealingText !== undefined && woundHealingText !== '') {
      mapped.currentFunctionalLimitationsWoundHealingText = woundHealingText;
    }

    const pelvicHealth = getValue('current_functional_limitations_function_other_pelvic_health');
    if (pelvicHealth !== undefined) {
      mapped.currentFunctionalLimitationsPelvicHealth = pelvicHealth === 'yes';
    }

    const pelvicHealthText = getValue('current_functional_limitations_function_other_pelvic_health_text');
    if (pelvicHealthText !== undefined && pelvicHealthText !== '') {
      mapped.currentFunctionalLimitationsPelvicHealthText = pelvicHealthText;
    }
  }
  /**
   * Maps CurrentFunction section from DTO to form values
   * @param priorFunction - The PriorFunction DTO from backend
   * @param formGroup - Optional FormGroup to set values directly
   * @returns Object that can be used with formGroup.patchValue()
   */
  fromDto(currentFunction: CurrentFunction, formGroup?: FormGroup): any {
    if (!currentFunction) return {};

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
    SelfCareDTOMapper.map(currentFunction, setValue);
    MobilityWalkingMovingAroundDTOMapper.map(currentFunction, setValue)
    ChangingMaintainingBodyPositionDTOMapper.map(currentFunction, setValue);
    CarryingMovingHandlingObjectsDTOMapper.map(currentFunction, setValue);
    this.mapCommentsFromDto(currentFunction, setValue);
    return formValue;
  }

  private mapCommentsFromDto(currentFunction: CurrentFunction, setValue: (controlName: string, value: any) => void): void {
    setValue('current_functional_limitations_other', currentFunction.currentFunctionalLimitationsOther);
    setValue('current_functional_limitations_function_other_text', currentFunction.currentFunctionalLimitationsOtherText);
    setValue('current-level-function_mobility-walking-moving-around_assistive_device_input', currentFunction.mobilityWalkingMovingAround?.assistiveDeviceText);
    setValue('current-level-function_carrying-moving-handling-objects_lower_extremities_input', currentFunction.carryingMovingHandlingObjects?.movingObjectsWithLowerExtremities?.lowerExtremitiesText);
    setValue('current-level-function_carrying-moving-handling-objects_community_integration_input', currentFunction.carryingMovingHandlingObjects?.communityIntegrationText);
    setValue('current-level-function_carrying-moving-handling-objects_work_vocation_input', currentFunction.carryingMovingHandlingObjects?.workVocationText);
    setValue('current-level-function_carrying-moving-handling-objects_recreation_input', currentFunction.carryingMovingHandlingObjects?.recreationText);
    setValue('current-level-function_self-care_comment', currentFunction.currentFunctionalLimitationsSelfCareComment);
    setValue('current-level-function_mobility-walking-moving-around_comment', currentFunction.currentFunctionalLimitationsMobilityWalkingMovingAroundComment);
    setValue('current-level-function_changing-maintaining-body-position_comment', currentFunction.currentFunctionalLimitationsChangingMaintainingBodyPositionComment);
    setValue('current-level-function_carrying-moving-handling-objects_comment', currentFunction.currentFunctionalLimitationsCarryingMovingHandlingObjectsComment);

    // Specialty fields - convert boolean to "yes"/"no" for radio buttons
    if (currentFunction.currentFunctionalLimitationsLymphedema !== undefined) {
      setValue('current_functional_limitations_function_other_lymphedema', currentFunction.currentFunctionalLimitationsLymphedema ? 'yes' : 'no');
    }
    setValue('current_functional_limitations_function_other_lymphedema_text', currentFunction.currentFunctionalLimitationsLymphedemaText);

    if (currentFunction.currentFunctionalLimitationsWoundHealing !== undefined) {
      setValue('current_functional_limitations_function_other_wound_healing', currentFunction.currentFunctionalLimitationsWoundHealing ? 'yes' : 'no');
    }
    setValue('current_functional_limitations_function_other_wound_healing_text', currentFunction.currentFunctionalLimitationsWoundHealingText);

    if (currentFunction.currentFunctionalLimitationsPelvicHealth !== undefined) {
      setValue('current_functional_limitations_function_other_pelvic_health', currentFunction.currentFunctionalLimitationsPelvicHealth ? 'yes' : 'no');
    }
    setValue('current_functional_limitations_function_other_pelvic_health_text', currentFunction.currentFunctionalLimitationsPelvicHealthText);
  }
}

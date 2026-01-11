import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InspectionMapperService } from '../inspectionN/services/inspection-mapper.service';
import { Objective } from '../models/objective';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveMapperService {

  constructor(private inspectionMapper: InspectionMapperService) { }
  toModel(formGroup: FormGroup): Objective {
    if (!formGroup) {
      return {};
    }

    const objective: Objective = {};
    const profileControl = formGroup.get('profile');
    if (profileControl) {
      objective.profile = profileControl.value;
    }
    // Get inspection sub-form and convert it
    const inspectionControl = formGroup.get('inspection');
    if (inspectionControl) {
      objective.inspection = this.inspectionMapper.toModel(inspectionControl.value);
    }

    return objective;
  }

  fromDto(dto: Objective, formGroup?: FormGroup): any {
    if (!dto) {
      return {};
    }
    const formValue: any = {};
    if (dto.profile)
      formValue.profile = dto.profile

    return formValue;
  }
}

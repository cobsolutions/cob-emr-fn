import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Objective } from '../models/objective';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveMapperService {

  constructor() { }
  toModel(formGroup: FormGroup): Objective {
    if (!formGroup) {
      return {};
    }

    const objective: Objective = {};
    const profileControl = formGroup.get('profile');
    if (profileControl) {
      objective.profile = profileControl.value;
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

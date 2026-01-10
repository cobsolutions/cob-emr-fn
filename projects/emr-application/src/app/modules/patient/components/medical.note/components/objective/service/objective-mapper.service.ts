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
    objective.profile = formGroup.get('profile').value;
    return objective;
  }

  fromDto(dto: Objective, formGroup?: FormGroup): any {
    if (!dto) {
      return {};
    }
  }
}

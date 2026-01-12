import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InspectionMapperService } from '../inspectionN/services/inspection-mapper.service';
import { Objective } from '../models/objective';
import { OutcomeMeasurementToolsMapperService } from '../outcome-measurement-tools/services/outcome-measurement-tools-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveMapperService {

  constructor(private inspectionMapper: InspectionMapperService,
    private omtMapper: OutcomeMeasurementToolsMapperService) { }
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
    const omt = formGroup.get('omt');    
    if (omt) {
      objective.omt = this.omtMapper.toModel(omt.value);
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
    if (dto.inspection) {
      formValue.inspection = this.inspectionMapper.fromDto(dto.inspection)
    }
    console.log('formValue  ', formValue)
    return formValue;
  }
}

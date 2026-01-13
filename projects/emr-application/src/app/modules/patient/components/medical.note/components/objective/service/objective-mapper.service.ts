import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InspectionMapperService } from '../inspectionN/services/inspection-mapper.service';
import { Objective } from '../models/objective';
import { NeuroVascularMapperService } from '../neuro-vascular/services/neuro-vascular-mapper.service';
import { ObservationMapperService } from '../observationN/services/observation-mapper.service';
import { OutcomeMeasurementToolsMapperService } from '../outcome-measurement-tools/services/outcome-measurement-tools-mapper.service';
import { RangeOfMotionMapperService } from '../range-of-motion/services/range-of-motion-mapper.service';
import { StrengthMapperService } from '../strengthN/services/strength-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveMapperService {

  constructor(private inspectionMapper: InspectionMapperService,
    private omtMapper: OutcomeMeasurementToolsMapperService,
    private observationMapper: ObservationMapperService,
    private rangeOfMotionMapperService: RangeOfMotionMapperService,
    private strengthMapperService: StrengthMapperService,
    private neuroVascularMapperService: NeuroVascularMapperService) { }
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
    if (omt)
      objective.omt = this.omtMapper.toModel(omt.value);

    const observationControl = formGroup.get('observation')
    if (observationControl) {
      objective.observation = this.observationMapper.toModel(observationControl.value)
    }
    const romControl = formGroup.get('rangeOfMotion')
    if (romControl) {
      objective.rom = this.rangeOfMotionMapperService.toModel(romControl.value)
    }
    const strengthControl = formGroup.get('strength')
    if (strengthControl) {
      objective.strength = this.strengthMapperService.toModel(strengthControl.value)
    }
    const neuroVascularControl = formGroup.get('neuroVascular')
    if (neuroVascularControl) {
      objective.neuroVascular = this.neuroVascularMapperService.toModel(neuroVascularControl.value)

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
    // if (dto.observation) {
    //   formValue.observation = this.observationMapper.fromDto(dto.observation)
    // }

    return formValue;
  }
}

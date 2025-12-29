import { Injectable } from '@angular/core';
import { Inspection } from '../models/Inspection';
import {
  InspectionModel,
  ConsentModel,
  ChaperoneModel,
  GirthMeasurementUpperModel,
  GirthMeasurementLowerModel,
  PostOperativeWoundHealingModel,
  WoundCareModel,
  SurgicalScarringModel,
  BodyMassIndexModel,
  AdditionalCommentsModel,
  GirthMeasurementModel,
  SurfaceCultureModel
} from '../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionMapperService {

  /**
   * Converts form raw value to InspectionModel for backend
   */
  toModel(formValue: any) :Inspection{

  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: Inspection) {
  }

 
}

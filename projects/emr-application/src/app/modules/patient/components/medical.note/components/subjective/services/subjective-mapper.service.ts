import { Injectable } from '@angular/core';
import { Subjective } from '../models/Subjective';

@Injectable({
  providedIn: 'root'
})
export class SubjectiveMapperService {

  constructor() { }
  /**
  * Converts form raw value to InspectionModel for backend
  */
  toModel(formValue: any): Subjective { }
  
  /**
     * Converts DTO from backend to form value object
     */
  fromDto(dto: Subjective): any { }
}

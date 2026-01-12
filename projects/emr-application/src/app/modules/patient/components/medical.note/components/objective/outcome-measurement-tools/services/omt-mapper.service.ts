import { Injectable } from '@angular/core';
import { Omt } from '../models/Omt';

@Injectable({
  providedIn: 'root'
})
export class OmtMapperService {

  constructor() { }
  toModel(formValue: any): Omt {
    return null;
  }
  fromDto(dto: Omt): any {

  }
}

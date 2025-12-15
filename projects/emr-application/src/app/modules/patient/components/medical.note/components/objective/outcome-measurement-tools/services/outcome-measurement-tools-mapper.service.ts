import { Injectable } from '@angular/core';
import {
  OutcomeMeasurementToolsModel,
  CustomOutcomeMeasurementModel,
  VestibularModel,
  UpperExtremityModel,
  SpineModel,
  LowerExtremityModel,
  BalanceModel,
  PainModel,
  GeneralFunctionModel
} from '../models/outcome-measurement-tools.model';

@Injectable({
  providedIn: 'root'
})
export class OutcomeMeasurementToolsMapperService {

  /**
   * Converts form raw value to OutcomeMeasurementToolsModel for backend
   */
  toModel(formValue: any): OutcomeMeasurementToolsModel {
    return {
      customOutcomeMeasurement: this.mapCustomOutcomeMeasurement(formValue),
      vestibular: this.mapVestibular(formValue),
      upperExtremity: this.mapUpperExtremity(formValue),
      spine: this.mapSpine(formValue),
      lowerExtremity: this.mapLowerExtremity(formValue),
      balance: this.mapBalance(formValue),
      pain: this.mapPain(formValue),
      generalFunction: this.mapGeneralFunction(formValue)
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: OutcomeMeasurementToolsModel): any {
    return {
      // Custom Outcome Measurement
      custom_outcome_measurement: dto.customOutcomeMeasurement.enabled ? 'yes' : 'no',

      // Vestibular
      vestibular: dto.vestibular.enabled ? 'yes' : 'no',

      // Upper Extremity
      upper_extremity: dto.upperExtremity.enabled ? 'yes' : 'no',

      // Spine
      spine: dto.spine.enabled ? 'yes' : 'no',

      // Lower Extremity
      lower_extremity: dto.lowerExtremity.enabled ? 'yes' : 'no',

      // Balance
      balance: dto.balance.enabled ? 'yes' : 'no',

      // Pain
      pain: dto.pain.enabled ? 'yes' : 'no',

      // General Function
      general_function: dto.generalFunction.enabled ? 'yes' : 'no'
    };
  }

  // Private mapping methods for toModel
  private mapCustomOutcomeMeasurement(formValue: any): CustomOutcomeMeasurementModel {
    const enabled = formValue.custom_outcome_measurement === 'yes';
    const model: CustomOutcomeMeasurementModel = { enabled };

    if (enabled) {
      // TODO: Map custom outcome measurement fields
    }

    return model;
  }

  private mapVestibular(formValue: any): VestibularModel {
    const enabled = formValue.vestibular === 'yes';
    const model: VestibularModel = { enabled };

    if (enabled) {
      // TODO: Map vestibular fields
    }

    return model;
  }

  private mapUpperExtremity(formValue: any): UpperExtremityModel {
    const enabled = formValue.upper_extremity === 'yes';
    const model: UpperExtremityModel = { enabled };

    if (enabled) {
      // TODO: Map upper extremity fields
    }

    return model;
  }

  private mapSpine(formValue: any): SpineModel {
    const enabled = formValue.spine === 'yes';
    const model: SpineModel = { enabled };

    if (enabled) {
      // TODO: Map spine fields
    }

    return model;
  }

  private mapLowerExtremity(formValue: any): LowerExtremityModel {
    const enabled = formValue.lower_extremity === 'yes';
    const model: LowerExtremityModel = { enabled };

    if (enabled) {
      // TODO: Map lower extremity fields
    }

    return model;
  }

  private mapBalance(formValue: any): BalanceModel {
    const enabled = formValue.balance === 'yes';
    const model: BalanceModel = { enabled };

    if (enabled) {
      // TODO: Map balance fields
    }

    return model;
  }

  private mapPain(formValue: any): PainModel {
    const enabled = formValue.pain === 'yes';
    const model: PainModel = { enabled };

    if (enabled) {
      // TODO: Map pain fields
    }

    return model;
  }

  private mapGeneralFunction(formValue: any): GeneralFunctionModel {
    const enabled = formValue.general_function === 'yes';
    const model: GeneralFunctionModel = { enabled };

    if (enabled) {
      // TODO: Map general function fields
    }

    return model;
  }
}

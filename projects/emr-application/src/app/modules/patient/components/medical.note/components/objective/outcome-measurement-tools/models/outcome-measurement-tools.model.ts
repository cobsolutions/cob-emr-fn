// Custom Outcome Measurement Model
export interface CustomOutcomeMeasurementModel {
  enabled: boolean;
  // TODO: Add custom outcome measurement fields
}

// Vestibular Model
export interface VestibularModel {
  enabled: boolean;
  // TODO: Add vestibular fields
}

// Upper Extremity Model
export interface UpperExtremityModel {
  enabled: boolean;
  // TODO: Add upper extremity fields
}

// Spine Model
export interface SpineModel {
  enabled: boolean;
  // TODO: Add spine fields
}

// Lower Extremity Model
export interface LowerExtremityModel {
  enabled: boolean;
  // TODO: Add lower extremity fields
}

// Balance Model
export interface BalanceModel {
  enabled: boolean;
  // TODO: Add balance fields
}

// Pain Model
export interface PainModel {
  enabled: boolean;
  // TODO: Add pain fields
}

// General Function Model
export interface GeneralFunctionModel {
  enabled: boolean;
  // TODO: Add general function fields
}

// Main Outcome Measurement Tools Model
export interface OutcomeMeasurementToolsModel {
  customOutcomeMeasurement: CustomOutcomeMeasurementModel;
  vestibular: VestibularModel;
  upperExtremity: UpperExtremityModel;
  spine: SpineModel;
  lowerExtremity: LowerExtremityModel;
  balance: BalanceModel;
  pain: PainModel;
  generalFunction: GeneralFunctionModel;
}

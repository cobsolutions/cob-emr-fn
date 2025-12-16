// No Limitations Noted Model
export interface NoLimitationsNotedModel {
  enabled: boolean; // true if "No", false if "Yes"
  arom?: boolean;
  prom?: PROMModel;
}

// PROM Model
export interface PROMModel {
  enabled: boolean;
  cervical?: boolean;
  thoracic?: boolean;
  shoulder?: boolean;
  elbow?: boolean;
  wrist?: boolean;
  hand?: boolean;
  lumbar?: boolean;
  hip?: boolean;
  knee?: boolean;
  ankle?: boolean;
  feet?: boolean;
  comments?: string;
}

// Cervical AROM Model
export interface CervicalAROMModel {
  enabled: boolean;
  forwardBending?: string;
  backwardBending?: string;
  rightRotation?: string;
  leftRotation?: string;
  rightSideBending?: string;
  leftSideBending?: string;
  comments?: string;
}

// Costovertebral Expansion Model
export interface CostovertebralExpansionModel {
  enabled: boolean;
  t4?: string;
  t9?: string;
  umbilicus?: string;
}

// Shoulder AROM Model
export interface ShoulderAROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionLeft?: string;
  scaptionRight?: string;
  scaptionLeft?: string;
  abductionRight?: string;
  abductionLeft?: string;
  extensionRight?: string;
  extensionLeft?: string;
  functionalExternalRotationReachRight?: string;
  functionalExternalRotationReachLeft?: string;
  functionalInternalRotationReachRight?: string;
  functionalInternalRotationReachLeft?: string;
  erNeutralPositionRight?: string;
  erNeutralPositionLeft?: string;
  irNeutralPositionRight?: string;
  irNeutralPositionLeft?: string;
  horizontalAbductionRight?: string;
  horizontalAbductionLeft?: string;
  horizontalAdductionRight?: string;
  horizontalAdductionLeft?: string;
}

// Main Range of Motion Model
export interface RangeOfMotionModel {
  noLimitationsNoted: NoLimitationsNotedModel;
  cervicalArom?: CervicalAROMModel;
  costovertebralExpansion?: CostovertebralExpansionModel;
  shoulderArom?: ShoulderAROMModel;
}

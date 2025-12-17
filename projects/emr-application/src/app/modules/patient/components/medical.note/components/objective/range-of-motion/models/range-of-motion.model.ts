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

// Shoulder PROM Model
export interface ShoulderPROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionRightEndfeel?: string;
  flexionLeft?: string;
  flexionLeftEndfeel?: string;
  scaptionRight?: string;
  scaptionRightEndfeel?: string;
  scaptionLeft?: string;
  scaptionLeftEndfeel?: string;
  abductionRight?: string;
  abductionRightEndfeel?: string;
  abductionLeft?: string;
  abductionLeftEndfeel?: string;
  extensionRight?: string;
  extensionRightEndfeel?: string;
  extensionLeft?: string;
  extensionLeftEndfeel?: string;
  erNeutralPositionRight?: string;
  erNeutralPositionRightEndfeel?: string;
  erNeutralPositionLeft?: string;
  erNeutralPositionLeftEndfeel?: string;
  irNeutralPositionRight?: string;
  irNeutralPositionRightEndfeel?: string;
  irNeutralPositionLeft?: string;
  irNeutralPositionLeftEndfeel?: string;
  erScapularPlaneRight?: string;
  erScapularPlaneRightEndfeel?: string;
  erScapularPlaneLeft?: string;
  erScapularPlaneLeftEndfeel?: string;
  irScapularPlaneRight?: string;
  irScapularPlaneRightEndfeel?: string;
  irScapularPlaneLeft?: string;
  irScapularPlaneLeftEndfeel?: string;
  er90DegreesAbductionRight?: string;
  er90DegreesAbductionRightEndfeel?: string;
  er90DegreesAbductionLeft?: string;
  er90DegreesAbductionLeftEndfeel?: string;
  ir90DegreesAbductionRight?: string;
  ir90DegreesAbductionRightEndfeel?: string;
  ir90DegreesAbductionLeft?: string;
  ir90DegreesAbductionLeftEndfeel?: string;
  irSleeperStretchRight?: string;
  irSleeperStretchRightEndfeel?: string;
  irSleeperStretchLeft?: string;
  irSleeperStretchLeftEndfeel?: string;
  horizontalAbductionRight?: string;
  horizontalAbductionRightEndfeel?: string;
  horizontalAbductionLeft?: string;
  horizontalAbductionLeftEndfeel?: string;
  horizontalAdductionRight?: string;
  horizontalAdductionRightEndfeel?: string;
  horizontalAdductionLeft?: string;
  horizontalAdductionLeftEndfeel?: string;
}

// Elbow AROM Model
export interface ElbowAROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionLeft?: string;
  extensionRight?: string;
  extensionLeft?: string;
  pronationRight?: string;
  pronationLeft?: string;
  supinationRight?: string;
  supinationLeft?: string;
}

// Elbow PROM Model
export interface ElbowPROMModel {
  enabled: boolean;
  extensionRight?: string;
  extensionRightEndfeel?: string;
  extensionLeft?: string;
  extensionLeftEndfeel?: string;
  flexionRight?: string;
  flexionRightEndfeel?: string;
  flexionLeft?: string;
  flexionLeftEndfeel?: string;
  supinationRight?: string;
  supinationRightEndfeel?: string;
  supinationLeft?: string;
  supinationLeftEndfeel?: string;
  pronationRight?: string;
  pronationRightEndfeel?: string;
  pronationLeft?: string;
  pronationLeftEndfeel?: string;
}

// Wrist AROM Model
export interface WristAROMModel {
  enabled: boolean;
  extensionRight?: string;
  extensionLeft?: string;
  flexionRight?: string;
  flexionLeft?: string;
  radialDeviationRight?: string;
  radialDeviationLeft?: string;
  ulnarDeviationRight?: string;
  ulnarDeviationLeft?: string;
}

// Wrist PROM Model
export interface WristPROMModel {
  enabled: boolean;
  extensionRight?: string;
  extensionRightEndfeel?: string;
  extensionLeft?: string;
  extensionLeftEndfeel?: string;
  flexionRight?: string;
  flexionRightEndfeel?: string;
  flexionLeft?: string;
  flexionLeftEndfeel?: string;
  radialDeviationRight?: string;
  radialDeviationRightEndfeel?: string;
  radialDeviationLeft?: string;
  radialDeviationLeftEndfeel?: string;
  ulnarDeviationRight?: string;
  ulnarDeviationRightEndfeel?: string;
  ulnarDeviationLeft?: string;
  ulnarDeviationLeftEndfeel?: string;
}

// Thumb AROM-PROM Model
export interface ThumbAromPromModel {
  enabled: boolean;
  cmcPalmarAbductionRightArom?: string;
  cmcPalmarAbductionRightProm?: string;
  cmcPalmarAbductionLeftArom?: string;
  cmcPalmarAbductionLeftProm?: string;
  cmcRadialAbductionRightArom?: string;
  cmcRadialAbductionRightProm?: string;
  cmcRadialAbductionLeftArom?: string;
  cmcRadialAbductionLeftProm?: string;
  cmcAdductionRightArom?: string;
  cmcAdductionRightProm?: string;
  cmcAdductionLeftArom?: string;
  cmcAdductionLeftProm?: string;
  cmcExtensionRightArom?: string;
  cmcExtensionRightProm?: string;
  cmcExtensionLeftArom?: string;
  cmcExtensionLeftProm?: string;
  cmcFlexionRightArom?: string;
  cmcFlexionRightProm?: string;
  cmcFlexionLeftArom?: string;
  cmcFlexionLeftProm?: string;
  cmcTotalMotionRightArom?: string;
  cmcTotalMotionRightProm?: string;
  cmcTotalMotionLeftArom?: string;
  cmcTotalMotionLeftProm?: string;
  mpExtensionRightArom?: string;
  mpExtensionRightProm?: string;
  mpExtensionLeftArom?: string;
  mpExtensionLeftProm?: string;
  mpFlexionRightArom?: string;
  mpFlexionRightProm?: string;
  mpFlexionLeftArom?: string;
  mpFlexionLeftProm?: string;
  mpTotalMotionRightArom?: string;
  mpTotalMotionRightProm?: string;
  mpTotalMotionLeftArom?: string;
  mpTotalMotionLeftProm?: string;
  ipExtensionRightArom?: string;
  ipExtensionRightProm?: string;
  ipExtensionLeftArom?: string;
  ipExtensionLeftProm?: string;
  ipFlexionRightArom?: string;
  ipFlexionRightProm?: string;
  ipFlexionLeftArom?: string;
  ipFlexionLeftProm?: string;
  ipTotalMotionRightArom?: string;
  ipTotalMotionRightProm?: string;
  ipTotalMotionLeftArom?: string;
  ipTotalMotionLeftProm?: string;
  comments?: string;
}

// Index Finger AROM-PROM Model
export interface IndexFingerAromPromModel {
  enabled: boolean;
  mpAdductionRightArom?: string;
  mpAdductionRightProm?: string;
  mpAdductionLeftArom?: string;
  mpAdductionLeftProm?: string;
  mpExtensionRightArom?: string;
  mpExtensionRightProm?: string;
  mpExtensionLeftArom?: string;
  mpExtensionLeftProm?: string;
  mpFlexionRightArom?: string;
  mpFlexionRightProm?: string;
  mpFlexionLeftArom?: string;
  mpFlexionLeftProm?: string;
  mpTotalMotionRightArom?: string;
  mpTotalMotionRightProm?: string;
  mpTotalMotionLeftArom?: string;
  mpTotalMotionLeftProm?: string;
  pipExtensionRightArom?: string;
  pipExtensionRightProm?: string;
  pipExtensionLeftArom?: string;
  pipExtensionLeftProm?: string;
  pipFlexionRightArom?: string;
  pipFlexionRightProm?: string;
  pipFlexionLeftArom?: string;
  pipFlexionLeftProm?: string;
  pipTotalMotionRightArom?: string;
  pipTotalMotionRightProm?: string;
  pipTotalMotionLeftArom?: string;
  pipTotalMotionLeftProm?: string;
  dipExtensionRightArom?: string;
  dipExtensionRightProm?: string;
  dipExtensionLeftArom?: string;
  dipExtensionLeftProm?: string;
  dipFlexionRightArom?: string;
  dipFlexionRightProm?: string;
  dipFlexionLeftArom?: string;
  dipFlexionLeftProm?: string;
  dipTotalMotionRightArom?: string;
  dipTotalMotionRightProm?: string;
  dipTotalMotionLeftArom?: string;
  dipTotalMotionLeftProm?: string;
  comments?: string;
}

// Middle Finger AROM-PROM Model
export interface MiddleFingerAromPromModel {
  enabled: boolean;
  mpAdductionRightArom?: string;
  mpAdductionRightProm?: string;
  mpAdductionLeftArom?: string;
  mpAdductionLeftProm?: string;
  mpExtensionRightArom?: string;
  mpExtensionRightProm?: string;
  mpExtensionLeftArom?: string;
  mpExtensionLeftProm?: string;
  mpFlexionRightArom?: string;
  mpFlexionRightProm?: string;
  mpFlexionLeftArom?: string;
  mpFlexionLeftProm?: string;
  mpTotalMotionRightArom?: string;
  mpTotalMotionRightProm?: string;
  mpTotalMotionLeftArom?: string;
  mpTotalMotionLeftProm?: string;
  pipExtensionRightArom?: string;
  pipExtensionRightProm?: string;
  pipExtensionLeftArom?: string;
  pipExtensionLeftProm?: string;
  pipFlexionRightArom?: string;
  pipFlexionRightProm?: string;
  pipFlexionLeftArom?: string;
  pipFlexionLeftProm?: string;
  pipTotalMotionRightArom?: string;
  pipTotalMotionRightProm?: string;
  pipTotalMotionLeftArom?: string;
  pipTotalMotionLeftProm?: string;
  dipExtensionRightArom?: string;
  dipExtensionRightProm?: string;
  dipExtensionLeftArom?: string;
  dipExtensionLeftProm?: string;
  dipFlexionRightArom?: string;
  dipFlexionRightProm?: string;
  dipFlexionLeftArom?: string;
  dipFlexionLeftProm?: string;
  dipTotalMotionRightArom?: string;
  dipTotalMotionRightProm?: string;
  dipTotalMotionLeftArom?: string;
  dipTotalMotionLeftProm?: string;
  comments?: string;
}

// Ring Finger AROM-PROM Model
export interface RingFingerAromPromModel {
  enabled: boolean;
  mpAdductionRightArom?: string;
  mpAdductionRightProm?: string;
  mpAdductionLeftArom?: string;
  mpAdductionLeftProm?: string;
  mpExtensionRightArom?: string;
  mpExtensionRightProm?: string;
  mpExtensionLeftArom?: string;
  mpExtensionLeftProm?: string;
  mpFlexionRightArom?: string;
  mpFlexionRightProm?: string;
  mpFlexionLeftArom?: string;
  mpFlexionLeftProm?: string;
  mpTotalMotionRightArom?: string;
  mpTotalMotionRightProm?: string;
  mpTotalMotionLeftArom?: string;
  mpTotalMotionLeftProm?: string;
  pipExtensionRightArom?: string;
  pipExtensionRightProm?: string;
  pipExtensionLeftArom?: string;
  pipExtensionLeftProm?: string;
  pipFlexionRightArom?: string;
  pipFlexionRightProm?: string;
  pipFlexionLeftArom?: string;
  pipFlexionLeftProm?: string;
  pipTotalMotionRightArom?: string;
  pipTotalMotionRightProm?: string;
  pipTotalMotionLeftArom?: string;
  pipTotalMotionLeftProm?: string;
  dipExtensionRightArom?: string;
  dipExtensionRightProm?: string;
  dipExtensionLeftArom?: string;
  dipExtensionLeftProm?: string;
  dipFlexionRightArom?: string;
  dipFlexionRightProm?: string;
  dipFlexionLeftArom?: string;
  dipFlexionLeftProm?: string;
  dipTotalMotionRightArom?: string;
  dipTotalMotionRightProm?: string;
  dipTotalMotionLeftArom?: string;
  dipTotalMotionLeftProm?: string;
  comments?: string;
}

// Small Finger AROM-PROM Model
export interface SmallFingerAromPromModel {
  enabled: boolean;
  mpAdductionRightArom?: string;
  mpAdductionRightProm?: string;
  mpAdductionLeftArom?: string;
  mpAdductionLeftProm?: string;
  mpExtensionRightArom?: string;
  mpExtensionRightProm?: string;
  mpExtensionLeftArom?: string;
  mpExtensionLeftProm?: string;
  mpFlexionRightArom?: string;
  mpFlexionRightProm?: string;
  mpFlexionLeftArom?: string;
  mpFlexionLeftProm?: string;
  mpTotalMotionRightArom?: string;
  mpTotalMotionRightProm?: string;
  mpTotalMotionLeftArom?: string;
  mpTotalMotionLeftProm?: string;
  pipExtensionRightArom?: string;
  pipExtensionRightProm?: string;
  pipExtensionLeftArom?: string;
  pipExtensionLeftProm?: string;
  pipFlexionRightArom?: string;
  pipFlexionRightProm?: string;
  pipFlexionLeftArom?: string;
  pipFlexionLeftProm?: string;
  pipTotalMotionRightArom?: string;
  pipTotalMotionRightProm?: string;
  pipTotalMotionLeftArom?: string;
  pipTotalMotionLeftProm?: string;
  dipExtensionRightArom?: string;
  dipExtensionRightProm?: string;
  dipExtensionLeftArom?: string;
  dipExtensionLeftProm?: string;
  dipFlexionRightArom?: string;
  dipFlexionRightProm?: string;
  dipFlexionLeftArom?: string;
  dipFlexionLeftProm?: string;
  dipTotalMotionRightArom?: string;
  dipTotalMotionRightProm?: string;
  dipTotalMotionLeftArom?: string;
  dipTotalMotionLeftProm?: string;
  comments?: string;
}

// Hand AROM-PROM Model
export interface HandAromPromModel {
  enabled: boolean;
  calculateTotalRom?: boolean;
  thumbAromProm?: ThumbAromPromModel;
  indexFingerAromProm?: IndexFingerAromPromModel;
  middleFingerAromProm?: MiddleFingerAromPromModel;
  ringFingerAromProm?: RingFingerAromPromModel;
  smallFingerAromProm?: SmallFingerAromPromModel;
}

// Thoracic AROM Sitting with Passive Overpressure Model
export interface ThoracicAromSittingWithPassiveOverpressureModel {
  enabled: boolean;
  forwardBending?: string;
  backwardBending?: string;
  rightRotation?: string;
  leftRotation?: string;
  rightSideBending?: string;
  leftSideBending?: string;
}

// Thoracic AROM Standing
export interface ThoracicAROMStandingModel {
  enabled: boolean;
  forwardBending?: string;
  backwardBending?: string;
  rightRotation?: string;
  leftRotation?: string;
  rightSideBending?: string;
  leftSideBending?: string;
}
// Lumbar AROM
export interface LumbarAROMModel {
  enabled: boolean;
  lumbarArromApplyToAll?: string;
  lumbarArromForwardBending?: string;
  lumbarArromBackwardBending?: string;
  lumbarArromRightRotation?: string;
  lumbarArromLeftRotation?: string;
  lumbarArromRightSideBending?: string;
  lumbarArromLeftSideBending?: string;
}

// Hip AROM Model
export interface HipAROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionLeft?: string;
  extensionRight?: string;
  extensionLeft?: string;
  abductionRight?: string;
  abductionLeft?: string;
  adductionRight?: string;
  adductionLeft?: string;
  internalRotationRight?: string;
  internalRotationLeft?: string;
  externalRotationRight?: string;
  externalRotationLeft?: string;
  comments?: string;
}

// Toe AROM Model
export interface ToeAROMModel {
  enabled: boolean;
  secondMtpFlexionRight?: string;
  secondMtpFlexionLeft?: string;
  secondMtpExtensionRight?: string;
  secondMtpExtensionLeft?: string;
  secondIpFlexionRight?: string;
  secondIpFlexionLeft?: string;
  secondIpExtensionRight?: string;
  secondIpExtensionLeft?: string;
  thirdMtpFlexionRight?: string;
  thirdMtpFlexionLeft?: string;
  thirdMtpExtensionRight?: string;
  thirdMtpExtensionLeft?: string;
  thirdIpFlexionRight?: string;
  thirdIpFlexionLeft?: string;
  thirdIpExtensionRight?: string;
  thirdIpExtensionLeft?: string;
  fourthMtpFlexionRight?: string;
  fourthMtpFlexionLeft?: string;
  fourthMtpExtensionRight?: string;
  fourthMtpExtensionLeft?: string;
  fourthIpFlexionRight?: string;
  fourthIpFlexionLeft?: string;
  fourthIpExtensionRight?: string;
  fourthIpExtensionLeft?: string;
  fifthMtpFlexionRight?: string;
  fifthMtpFlexionLeft?: string;
  fifthMtpExtensionRight?: string;
  fifthMtpExtensionLeft?: string;
  fifthIpFlexionRight?: string;
  fifthIpFlexionLeft?: string;
  fifthIpExtensionRight?: string;
  fifthIpExtensionLeft?: string;
  comments?: string;
}

// Toe PROM Model
export interface ToePROMModel {
  enabled: boolean;
  secondMtpFlexionRight?: string;
  secondMtpFlexionRightEndfeel?: string;
  secondMtpFlexionLeft?: string;
  secondMtpFlexionLeftEndfeel?: string;
  secondMtpExtensionRight?: string;
  secondMtpExtensionRightEndfeel?: string;
  secondMtpExtensionLeft?: string;
  secondMtpExtensionLeftEndfeel?: string;
  secondIpFlexionRight?: string;
  secondIpFlexionRightEndfeel?: string;
  secondIpFlexionLeft?: string;
  secondIpFlexionLeftEndfeel?: string;
  secondIpExtensionRight?: string;
  secondIpExtensionRightEndfeel?: string;
  secondIpExtensionLeft?: string;
  secondIpExtensionLeftEndfeel?: string;
  thirdMtpFlexionRight?: string;
  thirdMtpFlexionRightEndfeel?: string;
  thirdMtpFlexionLeft?: string;
  thirdMtpFlexionLeftEndfeel?: string;
  thirdMtpExtensionRight?: string;
  thirdMtpExtensionRightEndfeel?: string;
  thirdMtpExtensionLeft?: string;
  thirdMtpExtensionLeftEndfeel?: string;
  thirdIpFlexionRight?: string;
  thirdIpFlexionRightEndfeel?: string;
  thirdIpFlexionLeft?: string;
  thirdIpFlexionLeftEndfeel?: string;
  thirdIpExtensionRight?: string;
  thirdIpExtensionRightEndfeel?: string;
  thirdIpExtensionLeft?: string;
  thirdIpExtensionLeftEndfeel?: string;
  fourthMtpFlexionRight?: string;
  fourthMtpFlexionRightEndfeel?: string;
  fourthMtpFlexionLeft?: string;
  fourthMtpFlexionLeftEndfeel?: string;
  fourthMtpExtensionRight?: string;
  fourthMtpExtensionRightEndfeel?: string;
  fourthMtpExtensionLeft?: string;
  fourthMtpExtensionLeftEndfeel?: string;
  fourthIpFlexionRight?: string;
  fourthIpFlexionRightEndfeel?: string;
  fourthIpFlexionLeft?: string;
  fourthIpFlexionLeftEndfeel?: string;
  fourthIpExtensionRight?: string;
  fourthIpExtensionRightEndfeel?: string;
  fourthIpExtensionLeft?: string;
  fourthIpExtensionLeftEndfeel?: string;
  fifthMtpFlexionRight?: string;
  fifthMtpFlexionRightEndfeel?: string;
  fifthMtpFlexionLeft?: string;
  fifthMtpFlexionLeftEndfeel?: string;
  fifthMtpExtensionRight?: string;
  fifthMtpExtensionRightEndfeel?: string;
  fifthMtpExtensionLeft?: string;
  fifthMtpExtensionLeftEndfeel?: string;
  fifthIpFlexionRight?: string;
  fifthIpFlexionRightEndfeel?: string;
  fifthIpFlexionLeft?: string;
  fifthIpFlexionLeftEndfeel?: string;
  fifthIpExtensionRight?: string;
  fifthIpExtensionRightEndfeel?: string;
  fifthIpExtensionLeft?: string;
  fifthIpExtensionLeftEndfeel?: string;
  comments?: string;
}
// Hip PROM Model
export interface HipPROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionRightEndfeel?: string;
  flexionLeft?: string;
  flexionLeftEndfeel?: string;
  extensionRight?: string;
  extensionRightEndfeel?: string;
  extensionLeft?: string;
  extensionLeftEndfeel?: string;
  abductionRight?: string;
  abductionRightEndfeel?: string;
  abductionLeft?: string;
  abductionLeftEndfeel?: string;
  adductionRight?: string;
  adductionRightEndfeel?: string;
  adductionLeft?: string;
  adductionLeftEndfeel?: string;
  internalRotationRight?: string;
  internalRotationRightEndfeel?: string;
  internalRotationLeft?: string;
  internalRotationLeftEndfeel?: string;
  
  externalRotationRight?: string;
  externalRotationRightEndfeel?: string;
  externalRotationLeft?: string;
  externalRotationLeftEndfeel?: string;
}
// Main Range of Motion Model
export interface RangeOfMotionModel {
  noLimitationsNoted: NoLimitationsNotedModel;
  cervicalArom?: CervicalAROMModel;
  costovertebralExpansion?: CostovertebralExpansionModel;
  shoulderArom?: ShoulderAROMModel;
  shoulderProm?: ShoulderPROMModel;
  elbowArom?: ElbowAROMModel;
  elbowProm?: ElbowPROMModel;
  wristArom?: WristAROMModel;
  wristProm?: WristPROMModel;
  handAromProm?: HandAromPromModel;
  thoracicAromSittingWithPassiveOverpressure?: ThoracicAromSittingWithPassiveOverpressureModel;
  thoracicAROMStandingModel?: ThoracicAROMStandingModel;
  lumbarAROMModel?: LumbarAROMModel;
  hipArom?: HipAROMModel;
  hipProm?: HipPROMModel;
  toeArom?: ToeAROMModel;
  toeProm?: ToePROMModel;
}

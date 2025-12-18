// Export all types
export * from './rom-types';

// Export all options
export * from './rom-options';

// Export all config classes
export * from './lower-extremity-config';
export * from './upper-extremity-config';
export * from './special-tests-config';
export * from './spine-config';

// Combined config class for backward compatibility
import { LowerExtremityConfig } from './lower-extremity-config';
import { UpperExtremityConfig } from './upper-extremity-config';
import { SpecialTestsConfig } from './special-tests-config';
import { SpineConfig } from './spine-config';
import { CervicalAROMConfig } from './cervical-arom';
import { CostovertebralExpansionConfig } from './costovertebral.expansion-config';
import { LumbarAROMConfig } from './lumbar-arom-config';
import { ThoracicAROMSitting } from './thoracic-arom-sitting-config';
import { ThoracicAROMStanding } from './thoracic-arom-standing-config';
import { ShoulderAROM } from './shoulder-arom-config';

export class RomSectionsConfig {
  // Lower Extremity
  static readonly kneeArom = LowerExtremityConfig.kneeArom;
  static readonly ankleArom = LowerExtremityConfig.ankleArom;
  static readonly ankleProm = LowerExtremityConfig.ankleProm;
  static readonly firstMtpArom = LowerExtremityConfig.firstMtpArom;
  static readonly firstIpArom = LowerExtremityConfig.firstIpArom;
  static readonly toeArom = LowerExtremityConfig.toeArom;
  static readonly toeProm = LowerExtremityConfig.toeProm;
  static readonly hipProm = LowerExtremityConfig.hipProm;

  // Upper Extremity
  static readonly shoulderAromWithLabels = UpperExtremityConfig.shoulderAromWithLabels;
  static readonly elbowAromWithSelects = UpperExtremityConfig.elbowAromWithSelects;

  // Special Tests
  static readonly gripTestNoLabels = SpecialTestsConfig.gripTestNoLabels;

  // CervicalAROM
  static readonly cervicalArom = CervicalAROMConfig.cervicalArom;

  //Costovertebral Expansion
  static readonly costovertebralExpansion = CostovertebralExpansionConfig.costovertebralExpansion;

  //Lumbar AROM
  static readonly lumbarArom = LumbarAROMConfig.lumbarArom;

  //Thoracic AROM Sitting with Passive Overpressure
  static readonly thoracicAromSitting = ThoracicAROMSitting.thoracicAromSitting;

  ThoracicAROMStanding

  //Thoracic AROM Standing with Passive Overpressure
  static readonly thoracicAromStanding = ThoracicAROMStanding.thoracicAromStanding;

  //Shoulder AROM
  static readonly shoulderArom = ShoulderAROM.shoulderArom;
}

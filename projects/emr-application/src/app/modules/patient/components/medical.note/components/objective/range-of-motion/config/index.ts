// Export all types
export * from './rom-types';

// Export all options
export * from './rom-options';

// Export all config classes
export * from './lower-extremity-config';
export * from './upper-extremity-config';
export * from './special-tests-config';

// Combined config class for backward compatibility
import { LowerExtremityConfig } from './lower-extremity-config';
import { UpperExtremityConfig } from './upper-extremity-config';
import { SpecialTestsConfig } from './special-tests-config';

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
}

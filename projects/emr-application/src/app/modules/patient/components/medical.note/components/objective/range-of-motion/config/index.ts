// Export all types
export * from './hip-arom-config';
// Export all config classes
export * from './lower-extremity-config';
// Export all options
export * from './rom-options';
export * from './rom-types';
export * from './special-tests-config';
export * from './spine-config';
export * from './upper-extremity-config';



// Combined config class for backward compatibility
import { AnkleAROM } from './ankle-arom-config';
import { AnklePROM } from './ankle-prom-config';
import { CervicalAROMConfig } from './cervical-arom';
import { CostovertebralExpansionConfig } from './costovertebral.expansion-config';
import { ElbowAROM } from './elbow-arom-config';
import { ElbowPROM } from './elbow-prom-config';
import { FstIPAROM } from './fst-ip-arom-config';
import { FSTIPPROM } from './fst-ip-prom-config';
import { FstMTPArom } from './fst-mtp-arom-config';
import { FStMTPPROM } from './fst-mtp-prom-config';
import { HipAromConfig } from './hip-arom-config';
import { HipPROM } from './hip-prom-config';
import { KneeAROM } from './knee-arom-config';
import { LumbarAROMConfig } from './lumbar-arom-config';
import { ShoulderAROM } from './shoulder-arom-config';
import { ShoulderPROM } from './shoulder-prom-config';
import { SpecialTestsConfig } from './special-tests-config';
import { ThoracicAROMSitting } from './thoracic-arom-sitting-config';
import { ThoracicAROMStanding } from './thoracic-arom-standing-config';
import { ToeAROM } from './toe-arom-config';
import { ToePROM } from './toe-prom-config';
import { UpperExtremityConfig } from './upper-extremity-config';
import { WristAROM } from './wrist-arom-config';
import { WristPROM } from './wrist-prom-config';
import { KneePROM } from './knee-prom-config';


export class RomSectionsConfig {
  
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

  //Elbow AROM
  static readonly elbowArom = ElbowAROM.elbowArom;

  //Wrist AROM
  static readonly wristArom = WristAROM.wristArom;

  //Hip AROM
  static readonly hipArom = HipAromConfig.hipArom;

  //Toe AROM
  static readonly toeArom = ToeAROM.toeArom;

  //Knee AROM
  static readonly kneeArom = KneeAROM.kneeArom;

  //ankle AROM
  static readonly ankleArom = AnkleAROM.ankleArom;

  //1st MTP AROM
  static readonly fstMTPArom = FstMTPArom.fstMTPArom;

  //1st IP AROM
  static readonly fstipArom = FstIPAROM.fstipArom;

  //Shoulder PROM
  static readonly shoulderProm= ShoulderPROM.shoulderProm

  //Elbow PROM
  static readonly elbowProm= ElbowPROM.elbowProm

  //Wrist PROM
  static readonly wristProm= WristPROM.wristProm  
  //Toe PROM
  static readonly toeProm= ToePROM.toeProm
  //HiPProm
  static readonly hipProm = HipPROM.hipProm;

  //AnklePROM
  static readonly ankleProm = AnklePROM.ankleProm;

  //1st MTP PROM
  static readonly fstmtpProm = FStMTPPROM.FstmtpProm;

  //1st IP PROM
  static readonly fstipProm = FSTIPPROM.fstipProm;

  //1st IP PROM
  static readonly kneeProm = KneePROM.kneeProm;
}

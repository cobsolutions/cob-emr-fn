import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, patellarBallottement_OPTIONS } from "../special-test-options";

export interface PatellarBallottement {
  enabled: boolean;
}

export class PatellarBallottement {
  static readonly patellarBallottement: RomSectionConfig = {
    labels: [
      'Patellar Ballottement'
    ],
    options: patellarBallottement_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'patellar_ballottement_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


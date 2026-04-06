import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, patellarPassiveMobility_OPTIONS } from "../special-test-options";

export interface PatellarPassiveMobility {
  enabled: boolean;
}

export class PatellarPassiveMobility {
  static readonly patellarPassiveMobility: RomSectionConfig = {
    labels: [
      'Patellar Passive Mobility'
    ],
    options: patellarPassiveMobility_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'patellar_passive_mobility_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


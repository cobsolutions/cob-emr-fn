import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, singleLegBridgeHold_OPTIONS } from "../special-test-options";

export interface SingleLegBridgeHold {
  enabled: boolean;
}

export class SingleLegBridgeHold {
  static readonly singleLegBridgeHold: RomSectionConfig = {
    labels: [
      'Single Leg Bridge Hold'
    ],
    options: singleLegBridgeHold_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'single_leg_bridge_hold_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../../range-of-motion/config";
import {  storkStandSiMobilityTest_OPTIONS } from "../special-test-options";

export interface AnteriorDrawer {
  enabled: boolean;
}

export class StorkStandSIMobilityTest {
  static readonly storkStandSiMobilityTest: RomSectionConfig = {
    labels: [
      'Stork Stand SI Mobility Test'
    ],
    options: storkStandSiMobilityTest_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'stork_stand_si_mobility_test_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
  
}


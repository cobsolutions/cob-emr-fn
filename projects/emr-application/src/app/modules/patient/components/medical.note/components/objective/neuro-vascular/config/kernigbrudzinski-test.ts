import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { kernigBrudzinskiTest_OPTIONS } from "./neuro-vascular-options";

export interface KernigBrudzinskiTest {
  enabled: boolean;
}

export class KernigBrudzinskiTest {
  static readonly kernigBrudzinskiTest: RomSectionConfig = {
    labels: [
      'Kernig/Brudzinski Test'
    ],
    options: kernigBrudzinskiTest_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'kernig_brudzinski_test_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


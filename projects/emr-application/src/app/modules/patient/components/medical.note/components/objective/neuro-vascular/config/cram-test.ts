import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { cramTest_OPTIONS } from "./neuro-vascular-options";

export interface CramTest {
  enabled: boolean;
}

export class CramTest {
  static readonly cramTest: RomSectionConfig = {
    labels: [
      'Cram Test'
    ],
    options: cramTest_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'cram_test_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


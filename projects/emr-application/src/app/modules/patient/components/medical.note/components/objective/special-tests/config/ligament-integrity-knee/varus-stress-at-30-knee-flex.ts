import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, varusStressAt30KneeFlex_OPTIONS } from "../special-test-options";

export interface VarusStressAt30KneeFlex {
  enabled: boolean;
}

export class VarusStressAt30KneeFlex {
  static readonly varusStressAt30KneeFlex: RomSectionConfig = {
    labels: [
      'Varus Stress at 30 Knee Flex'
    ],
    options: varusStressAt30KneeFlex_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'varus_stress_at_30_knee_flex_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


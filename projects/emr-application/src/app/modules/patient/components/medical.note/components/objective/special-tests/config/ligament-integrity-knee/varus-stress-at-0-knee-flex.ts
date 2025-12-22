import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, varusStressAt0KneeFlex_OPTIONS } from "../special-test-options";
export interface VarusStressAt0KneeFlex {
  enabled: boolean;
}

export class VarusStressAt0KneeFlex {
  static readonly varusStressAt0KneeFlex: RomSectionConfig = {
    labels: [
      'Varus Stress at 0 Knee Flex'
    ],
    options: varusStressAt0KneeFlex_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'varus_stress_at_0_knee_flex_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}


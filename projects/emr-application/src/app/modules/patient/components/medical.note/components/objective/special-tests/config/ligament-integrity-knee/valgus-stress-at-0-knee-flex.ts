import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, valgusStressAt0KneeFlex_OPTIONS } from "../special-test-options";

export interface ValgusStressAt0KneeFlex {
  enabled: boolean;
}

export class ValgusStressAt0KneeFlex {
  static readonly valgusStressAt0KneeFlex: RomSectionConfig = {
    labels: [
      'Valgus Stress at 0 Knee Flex'
    ],
    options: valgusStressAt0KneeFlex_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'valgus_stress_at_0_knee_flex_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


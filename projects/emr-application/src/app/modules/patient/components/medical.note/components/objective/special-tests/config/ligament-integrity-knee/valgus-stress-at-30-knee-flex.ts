import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, valgusStressAt30KneeFlex_OPTIONS } from "../special-test-options";

export interface ValgusStressAt30KneeFlex {
  enabled: boolean;
}

export class ValgusStressAt30KneeFlex {
  static readonly valgusStressAt30KneeFlex: RomSectionConfig = {
    labels: [
      'Valgus Stress at 30 Knee Flex'
    ],
    options: valgusStressAt30KneeFlex_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'valgus_stress_at_30_knee_flex_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


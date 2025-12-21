import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, proneKneeBendNachlas_OPTIONS } from "./neuro-vascular-options";

export interface ProneKneeBendNachlas {
  enabled: boolean;
}

export class ProneKneeBendNachlas {
  static readonly proneKneeBendNachlas: RomSectionConfig = {
    labels: [
      'Prone Knee Bend (Nachlas)'
    ],
    options: proneKneeBendNachlas_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'prone_knee_bend_nachlas_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}


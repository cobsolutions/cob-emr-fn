import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, seatedDuralStretch_OPTIONS } from "./neuro-vascular-options";

export interface SeatedDuralStretch {
  enabled: boolean;
}

export class SeatedDuralStretch {
  static readonly seatedDuralStretch: RomSectionConfig = {
    labels: [
      'Seated Dural Stretch'
    ],
    options: seatedDuralStretch_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'seated_dural_stretch_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: true
  };
  
}


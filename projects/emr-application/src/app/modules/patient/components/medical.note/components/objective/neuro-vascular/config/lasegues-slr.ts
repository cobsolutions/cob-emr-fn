import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { laseguesSLR_OPTIONS } from "./neuro-vascular-options";

export interface LaseguesSLR {
  enabled: boolean;
}

export class LaseguesSLR {
  static readonly laseguesSLR: RomSectionConfig = {
    labels: [
      "Lasegue's SLR"
    ],
    options: laseguesSLR_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'lasegues_slr_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}


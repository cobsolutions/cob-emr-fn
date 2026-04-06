import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { capillaryRefill_OPTIONS } from "./neuro-vascular-options";

export interface CapillaryRefill {
  enabled: boolean;
}

export class CapillaryRefill {
  static readonly capillaryRefill: RomSectionConfig = {
  labels: [
    'Capillary Refill'
  ],
  options: capillaryRefill_OPTIONS,
  applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
  fieldPrefix: 'capillary_refill_',
  applyToAllFieldName: '',
  commentsFieldName: '',
  showApplyToAll: false,
  showComments: false
};

}


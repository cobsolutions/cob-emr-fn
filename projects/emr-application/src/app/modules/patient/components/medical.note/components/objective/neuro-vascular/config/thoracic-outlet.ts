import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { thoracicOutlet_OPTIONS } from "./neuro-vascular-options";

export interface ThoracicOutlet {
  enabled: boolean;
}

export class ThoracicOutlet {
  static readonly thoracicOutlet: RomSectionConfig = {
  labels: [
    "Adson's Test",
    "Roos' Test"
  ],
  options: thoracicOutlet_OPTIONS,
  applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
  fieldPrefix: 'thoracic_outlet_',
  applyToAllFieldName: '',
  commentsFieldName: '',
  showApplyToAll: false,
  showComments: false
};

}


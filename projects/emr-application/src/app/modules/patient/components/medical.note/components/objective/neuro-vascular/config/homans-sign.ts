import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { homansSign_OPTIONS } from "./neuro-vascular-options";

export interface HomansSign {
  enabled: boolean;
}

export class HomansSign {
  static readonly homansSign: RomSectionConfig = {
  labels: [
    "Homan's Sign"
  ],
  options: homansSign_OPTIONS,
  applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
  fieldPrefix: 'homans_sign_',
  applyToAllFieldName: '',
  commentsFieldName: '',
  showApplyToAll: false,
  showComments: false
};

}


import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../../range-of-motion/config";
import { anteriorDrawer_OPTIONS } from "../special-test-options";

export interface AnteriorDrawer {
  enabled: boolean;
}

export class AnteriorDrawer {
  static readonly anteriorDrawer: RomSectionConfig = {
    labels: [
      'Anterior Drawer'
    ],
    options: anteriorDrawer_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'anterior_drawer_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


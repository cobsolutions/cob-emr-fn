import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, posteriorDrawer_OPTIONS } from "../special-test-options";

export interface PosteriorDrawer {
  enabled: boolean;
}

export class PosteriorDrawer {
  static readonly posteriorDrawer: RomSectionConfig = {
    labels: [
      'Posterior Drawer'
    ],
    options: posteriorDrawer_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'posterior_drawer_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomInputSectionConfig, RomSectionConfig } from "../../../range-of-motion/config";

export interface SideBridgePlank {
  enabled: boolean;
}

export class SideBridgePlank {
  static readonly sideBridgePlank: RomInputSectionConfig = {
    labels: [
      'Hold Duration'
    ],
    fieldPrefix: 'side_bridge_plank_',
    showComments: false,
    commentsFieldName: ""
  };
}


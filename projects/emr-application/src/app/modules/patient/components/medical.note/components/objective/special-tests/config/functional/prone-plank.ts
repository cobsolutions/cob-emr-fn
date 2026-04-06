import { RomInputSectionConfig } from "../../../range-of-motion/config";

export interface PronePlank {
  enabled: boolean;
}

export class PronePlank {
  static readonly pronePlank: RomInputSectionConfig = {
    labels: [
      'Hold Duration'
    ],
    fieldPrefix: 'prone_plank_',
    showComments: false,
    commentsFieldName: ""
  };
}


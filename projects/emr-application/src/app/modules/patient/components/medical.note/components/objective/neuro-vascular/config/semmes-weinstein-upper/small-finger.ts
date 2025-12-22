import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { smallFinger_OPTIONS } from "../neuro-vascular-options";

export interface SmallFinger {
  enabled: boolean;
}

export class SmallFinger {
  static readonly smallFinger: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Radial', 'Ulnar'],
    options: smallFinger_OPTIONS,
    fieldPrefix: 'small_finger_',
    commentsFieldName: 'small_finger_comments',
    showComments: false
  };
  
}


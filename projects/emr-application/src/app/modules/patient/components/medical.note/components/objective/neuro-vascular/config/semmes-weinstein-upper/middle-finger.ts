import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { middleFinger_OPTIONS } from "../neuro-vascular-options";

export interface MiddleFinger {
  enabled: boolean;
}

export class MiddleFinger {
  static readonly middleFinger: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Radial', 'Ulnar'],
    options: middleFinger_OPTIONS,
    fieldPrefix: 'middle_finger_',
    commentsFieldName: 'middle_finger_comments',
    showComments: false
  };
  
}


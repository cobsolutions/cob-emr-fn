import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { indexFinger_OPTIONS } from "../neuro-vascular-options";

export interface IndexFinger {
  enabled: boolean;
}

export class IndexFinger {
  static readonly indexFinger: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Radial', 'Ulnar'],
    options: indexFinger_OPTIONS,
    fieldPrefix: 'index_finger_',
    commentsFieldName: 'index_finger_comments',
    showComments: false
  };
  
}


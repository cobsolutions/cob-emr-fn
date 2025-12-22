import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { ringFinger_OPTIONS } from "../neuro-vascular-options";

export interface RingFinger {
  enabled: boolean;
}

export class RingFinger {
  static readonly ringFinger: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Radial', 'Ulnar'],
    options: ringFinger_OPTIONS,
    fieldPrefix: 'ring_finger_',
    commentsFieldName: 'ring_finger_comments',
    showComments: false
  };
  
}


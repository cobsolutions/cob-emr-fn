import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { DORSAL_SURFACE_OPTIONS } from "../neuro-vascular-options";

export interface Thumb {
  enabled: boolean;
}

export class Thumb {
  static readonly thumb: RomSectionDropdownTextConfig = {
  columns: ['Right', 'Left'],
  labels: ['Radial', 'Ulnar'],
  options: DORSAL_SURFACE_OPTIONS,
  fieldPrefix: 'thumb_',
  commentsFieldName: 'thumb_comments',
  showComments: false
};

}


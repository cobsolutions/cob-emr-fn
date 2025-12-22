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
  fieldPrefix: 'dorsal_surface_',
  commentsFieldName: 'dorsal_surface_comments',
  showComments: false
};

}


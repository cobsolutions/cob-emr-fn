import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { dorsalSurface_OPTIONS } from "../neuro-vascular-options";

export class DorsalSurface{
    static readonly dorsalSurface: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: dorsalSurface_OPTIONS,
        fieldPrefix: 'dorsal_surface_',
        commentsFieldName: 'dorsal_surface_comments',
        showComments: false
      };
      
}
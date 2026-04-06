import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { plantarSurface_OPTIONS } from "../neuro-vascular-options";

export class PlantarSurface{
    static readonly plantarSurface: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: plantarSurface_OPTIONS,
        fieldPrefix: 'plantar_surface_',
        commentsFieldName: 'plantar_surface_comments',
        showComments: false
      };
      
}
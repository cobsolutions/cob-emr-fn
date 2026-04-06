import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { fifthToe_OPTIONS } from "../neuro-vascular-options";

export class FifthTeo{
    static readonly fifthToe: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: fifthToe_OPTIONS,
        fieldPrefix: 'fifth_toe_',
        commentsFieldName: 'fifth_toe_comments',
        showComments: false
      };
      
}
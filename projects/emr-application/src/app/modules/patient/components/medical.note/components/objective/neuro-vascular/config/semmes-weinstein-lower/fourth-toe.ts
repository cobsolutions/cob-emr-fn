import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { fourthToe_OPTIONS } from "../neuro-vascular-options";

export class FourthToe{
    static readonly fourthToe: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: fourthToe_OPTIONS,
        fieldPrefix: 'fourth_toe_',
        commentsFieldName: 'fourth_toe_comments',
        showComments: false
      };
      
}
import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { secondToe_OPTIONS } from "../neuro-vascular-options";

export class SecondToe{
    static readonly secondToe: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: secondToe_OPTIONS,
        fieldPrefix: 'second_toe_',
        commentsFieldName: 'second_toe_comments',
        showComments: false
      };
      
}
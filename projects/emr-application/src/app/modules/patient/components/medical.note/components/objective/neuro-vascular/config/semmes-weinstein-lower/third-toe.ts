import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { thirdToe_OPTIONS } from "../neuro-vascular-options";

export class ThirdToe{
    static readonly thirdToe: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: thirdToe_OPTIONS,
        fieldPrefix: 'third_toe_',
        commentsFieldName: 'third_toe_comments',
        showComments: false
      };
      
}
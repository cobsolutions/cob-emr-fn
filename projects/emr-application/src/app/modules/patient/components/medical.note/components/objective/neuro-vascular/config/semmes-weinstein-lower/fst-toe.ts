import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { firstToet_OPTIONS } from "../neuro-vascular-options";

export class FirstToet{
    static readonly firstToet: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: [],
        options: firstToet_OPTIONS,
        fieldPrefix: 'first_toet_',
        commentsFieldName: 'first_toet_comments',
        showComments: false
      };
      
}
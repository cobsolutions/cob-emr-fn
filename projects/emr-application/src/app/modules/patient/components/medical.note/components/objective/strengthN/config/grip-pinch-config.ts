import { RomSectionDropdownTextConfig } from "../../range-of-motion/config";

export class GripPinch{
    static readonly gripPinch: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: ['Power Grip', 'Lateral Pinch', 'Tip Pinch/Pincer', 'Tripod Pinch'],
        options: [],
        specialOptions:{

        },
        fieldPrefix: 'grip_pinch_',
        commentsFieldName: 'grip_pinch__comments',
        showComments: true
      };
}
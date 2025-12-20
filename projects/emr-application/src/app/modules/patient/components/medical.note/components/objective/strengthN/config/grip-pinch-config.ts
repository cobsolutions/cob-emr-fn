import { RomSectionDropdownTextConfig } from "../../range-of-motion/config";
import { Power_Grip_OPTION, Lateral_Pinch_Grip_OPTION, Tip_Pinch_Pincer_Grip_OPTION, Tripod_Pinch_Grip_OPTION } from "./strength-options";

export class GripPinch {
    static readonly gripPinch: RomSectionDropdownTextConfig = {
        columns: ['Right', 'Left'],
        labels: ['Power Grip', 'Lateral Pinch', 'Tip Pinch/Pincer', 'Tripod Pinch'],
        options: [],
        specialOptions: {
            'Power Grip': Power_Grip_OPTION,
            'Lateral Pinch': Lateral_Pinch_Grip_OPTION,
            'Tip Pinch/Pincer': Tip_Pinch_Pincer_Grip_OPTION,
            'Tripod Pinch': Tripod_Pinch_Grip_OPTION
        },
        fieldPrefix: 'grip_pinch_',
        commentsFieldName: 'grip_pinch_comments',
        showComments: true
    };
}
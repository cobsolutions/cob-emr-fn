import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsLowerKnee {
    static readonly kneeGmtLower: RomSectionConfig = {
        labels: [
            'Knee Flexion',
            'Knee Extension'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'knee_gmt_lower_',
        applyToAllFieldName: '',
        commentsFieldName: 'knee_gmt_lower_comments',
        showApplyToAll: false,
        showComments: true
    };
}

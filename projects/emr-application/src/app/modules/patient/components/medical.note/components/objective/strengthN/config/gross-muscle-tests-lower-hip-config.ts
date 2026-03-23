import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsLowerHip {
    static readonly hipGmtLower: RomSectionConfig = {
        labels: [
            'Hip Flexion',
            'Hip Extension',
            'Hip Abduction',
            'Hip Adduction',
            'Hip Internal Rotation',
            'Hip External Rotation'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'hip_gmt_lower_',
        applyToAllFieldName: '',
        commentsFieldName: 'hip_gmt_lower_comments',
        showApplyToAll: false,
        showComments: true
    };
}

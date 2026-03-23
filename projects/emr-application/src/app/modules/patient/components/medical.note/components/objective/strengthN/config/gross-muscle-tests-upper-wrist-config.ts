import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsUpperWrist {
    static readonly wristGmtUpper: RomSectionConfig = {
        labels: [
            'Wrist Flexion',
            'Wrist Extension',
            'Radial Deviation',
            'Ulnar Deviation'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'wrist_gmt_upper_',
        applyToAllFieldName: '',
        commentsFieldName: 'wrist_gmt_upper_comments',
        showApplyToAll: false,
        showComments: true
    };
}

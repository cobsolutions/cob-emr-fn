import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsUpperElbow {
    static readonly elbowGmtUpper: RomSectionConfig = {
        labels: [
            'Elbow Flexion',
            'Elbow Extension',
            'Elbow Supination',
            'Elbow Pronation'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'elbow_gmt_upper_',
        applyToAllFieldName: '',
        commentsFieldName: 'elbow_gmt_upper_comments',
        showApplyToAll: false,
        showComments: true
    };
}

import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsUpperShoulder {
    static readonly shoulderGmtUpper: RomSectionConfig = {
        labels: [
            'Shoulder Flexion',
            'Shoulder Extension',
            'Shoulder Abduction',
            'Shoulder Adduction',
            'Shoulder Internal Rotation',
            'Shoulder External Rotation',
            'Shoulder Scaption',
            'Shoulder ER @ 90 Abduction',
            'Shoulder IR @ 90 Abduction'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'shoulder_gmt_upper_',
        applyToAllFieldName: '',
        commentsFieldName: 'shoulder_gmt_upper_comments',
        showApplyToAll: false,
        showComments: true
    };
}

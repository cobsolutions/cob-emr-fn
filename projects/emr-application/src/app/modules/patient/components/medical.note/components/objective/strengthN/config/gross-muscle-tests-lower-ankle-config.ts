import { RomSectionConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsLowerAnkle {
    static readonly ankleGmtLower: RomSectionConfig = {
        labels: [
            'Ankle Dorsiflexion',
            'Ankle Plantarflexion',
            'Ankle Inversion',
            'Ankle Eversion'
        ],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'ankle_gmt_lower_',
        applyToAllFieldName: '',
        commentsFieldName: 'ankle_gmt_lower_comments',
        showApplyToAll: false,
        showComments: true
    };
}

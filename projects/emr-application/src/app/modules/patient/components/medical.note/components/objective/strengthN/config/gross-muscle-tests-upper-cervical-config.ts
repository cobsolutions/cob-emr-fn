import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsUpperCervical {
    static readonly cervicalGmtUpper: RomSectionWithSelectsConfig = {
        labels: ['Cervical Sidebending', 'Cervical Rotation'],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'cervical_gmt_upper_',
        topSelects: [
            {
                label: 'Cervical Flexion',
                fieldName: 'cervical_gmt_upper_flexion',
                options: Gross_Muscle_Tests_Trunk_OPTION
            },
            {
                label: 'Cervical Extension',
                fieldName: 'cervical_gmt_upper_extension',
                options: Gross_Muscle_Tests_Trunk_OPTION
            }
        ],
        commentsFieldName: 'cervical_gmt_upper_comments',
        showComments: true
    };
}

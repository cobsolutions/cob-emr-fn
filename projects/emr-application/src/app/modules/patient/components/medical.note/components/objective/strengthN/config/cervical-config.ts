import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Cervical {
    static readonly cervical: RomSectionWithSelectsConfig = {
        labels: ['Cervical Side Bending', 'Cervical Rotation'],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'cervical_stt_',
        topSelects: [
            {
                label: 'Cervical Flexion',
                fieldName: 'cervical_stt_flexion',
                options: Selective_Tissue_Tension_Upper_Cervical_OPTION
            },
            {
                label: 'Cervical Extension',
                fieldName: 'cervical_stt_extension',
                options: Selective_Tissue_Tension_Upper_Cervical_OPTION
            }
        ],
        commentsFieldName: 'cervical_stt_comments',
        showComments: true
    };
}

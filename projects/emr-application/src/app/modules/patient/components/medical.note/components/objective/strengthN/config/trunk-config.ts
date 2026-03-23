import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Trunk {
    static readonly trunk: RomSectionWithSelectsConfig = {
        labels: ['Sidebending', 'Rotation'],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'trunk_stt_',
        topSelects: [
            {
                label: 'Forward Flexion',
                fieldName: 'trunk_stt_forward_flexion',
                options: Selective_Tissue_Tension_Upper_Cervical_OPTION
            },
            {
                label: 'Extension',
                fieldName: 'trunk_stt_extension',
                options: Selective_Tissue_Tension_Upper_Cervical_OPTION
            }
        ],
        commentsFieldName: 'trunk_stt_comments',
        showComments: true
    };
}

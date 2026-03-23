import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Hip {
    static readonly hip: RomSectionConfig = {
        labels: [
            'Hip Flexion',
            'Hip Adduction',
            'Hip Abduction',
            'Hip Extension',
            'Hip Internal Rotation',
            'Hip External Rotation'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'hip_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'hip_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

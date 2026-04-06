import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Knee {
    static readonly knee: RomSectionConfig = {
        labels: [
            'Knee Extension',
            'Knee Flexion'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'knee_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'knee_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Elbow {
    static readonly elbow: RomSectionConfig = {
        labels: [
            'Elbow Flexion',
            'Elbow Extension',
            'Forearm Supination',
            'Forearm Pronation'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'elbow_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'elbow_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

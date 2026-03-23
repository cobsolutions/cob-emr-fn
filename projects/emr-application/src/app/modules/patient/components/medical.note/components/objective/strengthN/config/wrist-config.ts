import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Wrist {
    static readonly wrist: RomSectionConfig = {
        labels: [
            'Wrist Extension',
            'Wrist Flexion',
            'Wrist Radial Deviation',
            'Wrist Ulnar Deviation'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'wrist_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'wrist_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

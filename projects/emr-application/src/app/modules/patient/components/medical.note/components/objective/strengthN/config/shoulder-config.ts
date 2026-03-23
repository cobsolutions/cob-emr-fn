import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Shoulder {
    static readonly shoulder: RomSectionConfig = {
        labels: [
            'Shoulder Shrug',
            'Shoulder Abduction',
            'Shoulder Internal Rotation',
            'Shoulder External Rotation',
            'Shoulder Flexion',
            'Shoulder Extension'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'shoulder_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'shoulder_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

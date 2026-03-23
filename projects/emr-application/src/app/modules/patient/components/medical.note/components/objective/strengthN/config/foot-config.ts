import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Foot {
    static readonly foot: RomSectionConfig = {
        labels: [
            'Great Toe Extension',
            '2nd Toe Extension',
            '3rd Toe Extension',
            '4th Toe Extension',
            '5th Toe Extension',
            'Great Toe Flexion',
            '2nd Toe Flexion',
            '3rd Toe Flexion',
            '4th Toe Flexion',
            '5th Toe Flexion'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'foot_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'foot_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

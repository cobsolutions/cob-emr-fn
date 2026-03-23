import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Hand {
    static readonly hand: RomSectionConfig = {
        labels: [
            '1st Abduction',
            '1st Adduction',
            '1st Flexion',
            '1st Extension',
            'Finger 2-3 Abduction',
            'Finger 3-4 Abduction',
            'Finger 4-5 Abduction',
            'Finger 2-3 Adduction',
            'Finger 3-4 Adduction',
            'Finger 4-5 Adduction',
            'Finger Extension',
            'Finger Flexion',
            'Opposition of 1st to 5th Finger'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'hand_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'hand_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class Ankle {
    static readonly ankle: RomSectionConfig = {
        labels: [
            'Ankle Dorsiflexion',
            'Ankle Plantarflexion',
            'Ankle Inversion',
            'Ankle Eversion'
        ],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'ankle_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'ankle_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

import { RomSectionConfig } from "../../range-of-motion/config";
import { Selective_Tissue_Tension_Upper_Cervical_OPTION } from "./strength-options";

export class BackRibs {
    static readonly backRibs: RomSectionConfig = {
        labels: ['Rib Elevation (Inhalation)', 'Rib Depression (Exhalation)'],
        options: Selective_Tissue_Tension_Upper_Cervical_OPTION,
        fieldPrefix: 'back_ribs_stt_',
        applyToAllFieldName: '',
        commentsFieldName: 'back_ribs_stt_comments',
        showApplyToAll: false,
        showComments: true
    };
}

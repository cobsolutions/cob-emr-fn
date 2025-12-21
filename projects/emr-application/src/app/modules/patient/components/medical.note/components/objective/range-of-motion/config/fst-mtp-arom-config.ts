import { FLEXION_FST_MTP_AROM_OPTION, EXTENSION_FST_MTP_AROM_OPTION, DEFAULT_APPLY_TO_ALL_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class FstMTPArom {
    static readonly fstMTPArom: RomSectionConfig = {
        labels: ['Flexion', 'Extension'],
        options: [],
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialOptions: {
            'Flexion': FLEXION_FST_MTP_AROM_OPTION,
            'Extension': EXTENSION_FST_MTP_AROM_OPTION,
        },
        fieldPrefix: 'fst_mtp_',
        applyToAllFieldName: 'fst_mtp_apply_to_all',
        commentsFieldName: 'fst_mtp_arrom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
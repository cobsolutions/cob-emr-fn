import { DEFAULT_APPLY_TO_ALL_OPTIONS, EXTENSION_FST_IP_AROM_OPTION, FLEXION_FST_IP_AROM_OPTION } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class FstIPAROM {
    static readonly fstipArom: RomSectionConfig = {
        labels: [
            'Flexion', 'Extension'
        ],
        options: [], // Default options for all selects (WFL, Limited)
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        specialOptions: {
            'Flexion': FLEXION_FST_IP_AROM_OPTION,
            'Extension': EXTENSION_FST_IP_AROM_OPTION
        },
        fieldPrefix: 'fstip_arom_',
        applyToAllFieldName: 'fstip_arom_apply_to_all',
        commentsFieldName: 'fstip_arom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
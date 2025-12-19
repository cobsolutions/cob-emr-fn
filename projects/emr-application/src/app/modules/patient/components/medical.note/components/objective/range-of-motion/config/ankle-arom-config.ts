import { APPLY_TO_ALL_OPTIONS, DEFAULT_APPLY_TO_ALL_OPTIONS, DORSIFLEXION_AT_0_ANKLE_AROM_FLEXION_OPTION, DORSIFLEXION_AT_90_ANKLE_AROM_FLEXION_OPTION, EVERSION_ANKLE_AROM_OPTION, INVERSION_ANKLE_AROM_OPTION, PLANTARFLEXION_ANKLE_AROM_OPTION } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class AnkleAROM {
    static readonly ankleArom: RomSectionConfig = {
        labels: [
            'Dorsiflexion at 0 Knee Flexion', 'Dorsiflexion at 90 Knee Flexion', 'Plantarflexion', 'Inversion', 'Eversion'
        ],
        options: [], // Default options for all selects (WFL, Limited)
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        specialOptions: {
            'Dorsiflexion at 0 Knee Flexion': DORSIFLEXION_AT_0_ANKLE_AROM_FLEXION_OPTION,
            'Dorsiflexion at 90 Knee Flexion': DORSIFLEXION_AT_90_ANKLE_AROM_FLEXION_OPTION,
            'Plantarflexion': PLANTARFLEXION_ANKLE_AROM_OPTION,
            'Inversion': INVERSION_ANKLE_AROM_OPTION,
            'Eversion': EVERSION_ANKLE_AROM_OPTION
        },
        fieldPrefix: 'ankle_arom_',
        applyToAllFieldName: 'ankle_arom_apply_to_all',
        commentsFieldName: 'ankle_arom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
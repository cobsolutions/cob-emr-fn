import { APPLY_TO_ALL_OPTIONS, KNEE_AROM_EXTENSION_OPTION, KNEE_AROM_OPTION } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class KneeAROM {
    static readonly kneeArom: RomSectionConfig = {
        labels: [
            'Flexion', 'Extension'
        ],
        options: KNEE_AROM_OPTION,
        applyToAllOptions: APPLY_TO_ALL_OPTIONS,
        specialOptions: {
            'Extension': KNEE_AROM_EXTENSION_OPTION
        },
        fieldPrefix: 'knee_arrom_',
        applyToAllFieldName: 'knee_arrom_apply_to_all',
        commentsFieldName: 'knee_arrom_comments',
        showApplyToAll: true,
        showComments: false
    }
}
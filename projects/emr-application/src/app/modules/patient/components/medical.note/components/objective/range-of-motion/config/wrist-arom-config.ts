import { DEFAULT_APPLY_TO_ALL_OPTIONS, WRIST_AROM_FLEXION_OPTIONS, WRIST_AROM_OPTIONS, WRIST_AROM_SUPINATION_PRONATION_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class WristAROM {
    static readonly wristArom: RomSectionConfig = {
        labels: [
            'Extension', 'Flexion', 'Supination', 'Pronation'
        ],
        options: WRIST_AROM_OPTIONS, // Default options for all selects (WFL, Limited)
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        specialOptions: {
            'Flexion': WRIST_AROM_FLEXION_OPTIONS,
            'Supination': WRIST_AROM_SUPINATION_PRONATION_OPTIONS,
            'Pronation': WRIST_AROM_SUPINATION_PRONATION_OPTIONS
        },
        fieldPrefix: '',
        applyToAllFieldName: 'wrist_arrom_apply_to_all',
        commentsFieldName: 'wrist_arrom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
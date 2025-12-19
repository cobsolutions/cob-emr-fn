import { ALBOW_AROM_FLEXION_OPTIONS, ALBOW_AROM_OPTIONS, ALBOW_AROM_SUPINATION_PRONATION_OPTIONS, DEFAULT_APPLY_TO_ALL_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class ElbowAROM {
    static readonly elbowArom: RomSectionConfig = {
        labels: [
            'Extension', 'Flexion', 'Supination', 'Pronation'
        ],
        options: ALBOW_AROM_OPTIONS,
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialOptions: {
            'Flexion': ALBOW_AROM_FLEXION_OPTIONS,
            'Supination': ALBOW_AROM_SUPINATION_PRONATION_OPTIONS,
            'Pronation': ALBOW_AROM_SUPINATION_PRONATION_OPTIONS
        },
        fieldPrefix: 'elbow_arom_',
        applyToAllFieldName: 'elbow_arom_apply_to_all',
        commentsFieldName: 'elbow_arom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
import { LUMBAR_AROM_OPTIONS, LUMBAR_AROM_SPECIAL_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class LumbarAROMConfig {
    static readonly lumbarArom: RomSectionConfig = {
        labels: ['Forward Bending', 'Backward Bending', 'Right Rotation', 'Left Rotation', 'Right Side Bending', 'Left Side Bending'],
        options: LUMBAR_AROM_OPTIONS, // Default options for all selects (WFL, Limited)
        applyToAllOptions: LUMBAR_AROM_OPTIONS, // Options for Apply to All (same as default)
        specialOptions: {
            'Forward Bending': LUMBAR_AROM_SPECIAL_OPTIONS // Special options for Forward Bending (WFL, Limited, Painful, Restricted)
        },
        fieldPrefix: "lumbar_arrom_",
        applyToAllFieldName: "lumbar_arrom_apply_to_all",
        commentsFieldName: "lumbar_arrom_comments",
        showApplyToAll: true,
        showComments: true
    }
}
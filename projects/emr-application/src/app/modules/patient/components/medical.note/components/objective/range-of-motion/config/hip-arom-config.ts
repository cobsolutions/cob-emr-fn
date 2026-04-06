import { DEFAULT_APPLY_TO_ALL_OPTIONS, HIP_AROM_ABDUCTION_OPTIONS, HIP_AROM_ADDUCTION_OPTIONS, HIP_AROM_EXTENSION_OPTIONS, HIP_AROM_FLEXION_OPTIONS, HIP_AROM_OPTIONS, ROM_TEST_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class HipAromConfig {
    static readonly hipArom: RomSectionConfig = {
        labels: ['Flexion', 'Extension', 'Abduction', 'Adduction', 'Internal Rotation', 'External Rotation'],
        options: HIP_AROM_OPTIONS,
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        specialOptions: {
            'Flexion': HIP_AROM_FLEXION_OPTIONS,
            'Extension' : HIP_AROM_EXTENSION_OPTIONS,
            'Abduction': HIP_AROM_ABDUCTION_OPTIONS,
            'Adduction': HIP_AROM_ADDUCTION_OPTIONS,
        },
        fieldPrefix: "hip_",
        applyToAllFieldName: "hip_apply_to_all",
        commentsFieldName: "hip_arrom_comments",
        showApplyToAll: true,
        showComments: false
    }
}

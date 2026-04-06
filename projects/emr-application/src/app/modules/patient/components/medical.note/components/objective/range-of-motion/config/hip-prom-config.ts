import { DEFAULT_APPLY_TO_ALL_OPTIONS, ENDFEEL_OPTION, HIP_PROM_30_OPTION, HIP_PROM_90_OPTION, HIP_PROM_OPTION } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";

export class HipPROM {
    static readonly hipProm: RomSectionEndfeelConfig = {
        labels: [
            "Flexion",
            "Extension",
            "Abduction",
            "Adduction",
            "Internal Rotation",
            "External Rotation"
        ],
        measurementOptions: HIP_PROM_OPTION,
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            "Extension":HIP_PROM_30_OPTION,
            "Abduction":HIP_PROM_90_OPTION,
            "Adduction":HIP_PROM_30_OPTION,
            "Internal Rotation":HIP_PROM_90_OPTION,
            "External Rotation":HIP_PROM_90_OPTION
        },
        fieldPrefix: 'hip_prom_',
        applyToAllFieldName: 'hip_prom_apply_to_all',
        commentsFieldName: 'hip_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };
}
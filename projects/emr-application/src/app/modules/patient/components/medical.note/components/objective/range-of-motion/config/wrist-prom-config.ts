import { DEFAULT_APPLY_TO_ALL_OPTIONS, ENDFEEL_OPTION, WRIST_PROM_100_OPTION, WRIST_PROM_60_OPTION, WRIST_PROM_90_OPTION } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";

export class WristPROM {
    static readonly wristProm: RomSectionEndfeelConfig = {
        labels: [
            'Extension', 'Flexion', 'Radial Deviation', 'Ulnar Deviation'
        ],
        measurementOptions: [],
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            'Extension': WRIST_PROM_90_OPTION,
            'Flexion': WRIST_PROM_100_OPTION,
            'Radial Deviation': WRIST_PROM_60_OPTION,
            'Ulnar Deviation': WRIST_PROM_60_OPTION

        },
        fieldPrefix: 'wrist_prom_',
        applyToAllFieldName: 'wrist_prom_apply_to_all',
        commentsFieldName: 'wrist_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };

}
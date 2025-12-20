import { DEFAULT_APPLY_TO_ALL_OPTIONS, ENDFEEL_OPTION, FStMTPPROM_75_OPTION, FStMTPPROM_90_OPTION } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";
export class KneePROM {
    static readonly kneeProm: RomSectionEndfeelConfig = {
        labels: [
            'Flexion', 'Extension'
        ],
        measurementOptions: [],
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            'Flexion': FStMTPPROM_75_OPTION,
            'Extension': FStMTPPROM_90_OPTION
        },
        fieldPrefix: 'knee_prom_',
        applyToAllFieldName: 'knee_prom_apply_to_all',
        commentsFieldName: 'knee_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };
}
import { DEFAULT_APPLY_TO_ALL_OPTIONS, SHOULDER_PROM_120_OPTION, SHOULDER_PROM_180_OPTION, SHOULDER_PROM_80_OPTION, SHOULDER_PROM_90_OPTION, SHOULDER_PROM_ENDFEEL_OPTION } from "./rom-options";
import { RomSectionConfig, RomSectionEndfeelConfig } from "./rom-types";

export class ShoulderPROM {
    static readonly shoulderProm: RomSectionEndfeelConfig = {
        labels: [
            'Flexion',
            'Scaption',
            'Abduction',
            'Extension',
            'ER in Neutral Position',
            'IR in Neutral Position',
            'ER in Scapular Plane',
            'IR in Scapular Plane',
            'ER in 90 Degrees Abduction',
            'IR in 90 Degrees Abduction',
            'IR in Sleeper Stretch position',
            'Horizontal Abduction',
            'Horizontal Adduction'
        ],
        measurementOptions: [],
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            'Flexion': SHOULDER_PROM_180_OPTION,
            'Scaption': SHOULDER_PROM_180_OPTION,
            'Abduction': SHOULDER_PROM_180_OPTION,
            'Extension': SHOULDER_PROM_80_OPTION,
            'ER in Neutral Position': SHOULDER_PROM_90_OPTION,
            'IR in Neutral Position': SHOULDER_PROM_90_OPTION,
            'ER in Scapular Plane': SHOULDER_PROM_120_OPTION,
            'IR in Scapular Plane': SHOULDER_PROM_120_OPTION,
            'ER in 90 Degrees Abduction': SHOULDER_PROM_120_OPTION,
            'IR in 90 Degrees Abduction': SHOULDER_PROM_120_OPTION,
            'IR in Sleeper Stretch position': SHOULDER_PROM_120_OPTION,
            'Horizontal Abduction': SHOULDER_PROM_120_OPTION,
            'Horizontal Adduction': SHOULDER_PROM_120_OPTION
        },
        fieldPrefix: 'shoulderProm_',
        applyToAllFieldName: 'shoulderProm_apply_to_all',
        commentsFieldName: 'shoulderProm_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: SHOULDER_PROM_ENDFEEL_OPTION
    };
}
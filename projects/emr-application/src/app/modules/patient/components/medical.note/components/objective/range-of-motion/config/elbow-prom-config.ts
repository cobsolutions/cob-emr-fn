import { DEFAULT_APPLY_TO_ALL_OPTIONS, ELBOW_PROM_150_OPTION, ELBOW_PROM_90_OPTION, ELBOW_PROM_OPTION, ENDFEEL_OPTION,  } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";

export class ElbowPROM{
    static readonly elbowProm: RomSectionEndfeelConfig = {
        labels: [
           'Extension','Flexion','Supination','Pronation'
        ],
        measurementOptions: ELBOW_PROM_OPTION,
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            'Flexion':ELBOW_PROM_150_OPTION,
            'Supination':ELBOW_PROM_90_OPTION,
            'Pronation':ELBOW_PROM_90_OPTION
        },
        fieldPrefix: 'elbow_prom_',
        applyToAllFieldName: 'elbow_prom_apply_to_all',
        commentsFieldName: 'elbow_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };

}
import { ELBOW_PROM_OPTION, DEFAULT_APPLY_TO_ALL_OPTIONS, ELBOW_PROM_150_OPTION, ELBOW_PROM_90_OPTION, ENDFEEL_OPTION, AnklePROM_20_OPTION, AnklePROM_30_OPTION, AnklePROM_50_OPTION, AnklePROM_70_OPTION } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";

export class AnklePROM {
    static readonly ankleProm: RomSectionEndfeelConfig = {
        labels: [
            "Dorsiflexion at 0 Knee Flexion",
            "Dorsiflexion at 90 Knee Flexion",
            "Plantarflexion",
            "Inversion",
            "Eversion"
        ],
        measurementOptions: [],
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            "Dorsiflexion at 0 Knee Flexion": AnklePROM_50_OPTION,
            "Dorsiflexion at 90 Knee Flexion": AnklePROM_50_OPTION,
            "Plantarflexion": AnklePROM_70_OPTION,
            "Inversion": AnklePROM_30_OPTION,
            "Eversion": AnklePROM_20_OPTION
        },
        fieldPrefix: 'ankle_prom_',
        applyToAllFieldName: 'ankle_prom_apply_to_all',
        commentsFieldName: 'ankle_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };

}
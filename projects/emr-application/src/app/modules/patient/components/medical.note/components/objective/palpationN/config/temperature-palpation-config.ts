import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, Temperature_Palpation_OPTIONS } from "./palpation-options";

export class TemperaturePalpation{
    static readonly temperaturePalpation: RomSectionConfig = {
        labels: [
            'Lower Leg',
            'Ankle',
            'Foot',
        ],
        options: Temperature_Palpation_OPTIONS,
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        fieldPrefix: 'temperature_palpation_',
        applyToAllFieldName: 'temperature_palpation_apply_to_all',
        commentsFieldName: 'temperature_palpation_comments',
        showApplyToAll: false,
        showComments: false
    };

}
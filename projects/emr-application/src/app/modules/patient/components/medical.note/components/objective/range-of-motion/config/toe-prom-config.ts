import { DEFAULT_APPLY_TO_ALL_OPTIONS, ENDFEEL_OPTION, TOE_PROM_40_OPTION, TOE_PROM_75_OPTION } from "./rom-options";
import { RomSectionEndfeelConfig } from "./rom-types";

export class ToePROM{
    static readonly toeProm: RomSectionEndfeelConfig = {
        labels: [
            "2nd MTP Flexion",
            "2nd MTP Extension",
            "2nd IP Flexion",
            "2nd IP Extension",
            "3rd MTP Flexion",
            "3rd MTP Extension",
            "3rd IP Flexion",
            "3rd IP Extension",
            "4th MTP Flexion",
            "4th MTP Extension",
            "4th IP Flexion",
            "4th IP Extension",
            "5th MTP Flexion",
            "5th MTP Extension",
            "5th IP Flexion",
            "5th IP Extension"
        ],
        measurementOptions: [],
        applyToAllMeasurementOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialMeasurementOptions: {
            "2nd MTP Flexion":TOE_PROM_75_OPTION,
            "2nd MTP Extension":TOE_PROM_40_OPTION,
            "2nd IP Flexion":TOE_PROM_75_OPTION,
            "2nd IP Extension":TOE_PROM_40_OPTION,
            "3rd MTP Flexion":TOE_PROM_75_OPTION,
            "3rd MTP Extension":TOE_PROM_40_OPTION,
            "3rd IP Flexion":TOE_PROM_75_OPTION,
            "3rd IP Extension":TOE_PROM_40_OPTION,
            "4th MTP Flexion":TOE_PROM_75_OPTION,
            "4th MTP Extension":TOE_PROM_40_OPTION,
            "4th IP Flexion":TOE_PROM_75_OPTION,
            "4th IP Extension":TOE_PROM_40_OPTION,
            "5th MTP Flexion":TOE_PROM_75_OPTION,
            "5th MTP Extension":TOE_PROM_40_OPTION,
            "5th IP Flexion":TOE_PROM_75_OPTION,
            "5th IP Extension":TOE_PROM_40_OPTION
        },
        fieldPrefix: 'toe_',
        applyToAllFieldName: 'toe_prom_apply_to_all',
        commentsFieldName: 'toe_prom_comments',
        showApplyToAll: true,
        showComments: false,
        endfeelOptions: ENDFEEL_OPTION
    };
}
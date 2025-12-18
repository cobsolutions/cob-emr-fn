import { DEFAULT_APPLY_TO_ALL_OPTIONS, THORACIC_AROM_SITTING_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class ThoracicAROMSitting {
    static readonly thoracicAromSitting: RomSectionConfig = {
        labels: ['Forward Bending',
            'Backward Bending',
            'Right Rotation',
            'Left Rotation',
            'Right Side Bending',
            'Left Side Bending'],
        options: THORACIC_AROM_SITTING_OPTIONS, 
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        fieldPrefix: "thoracic_arrom_sitting_with_passive_overpressure",
        applyToAllFieldName: "thoracic_arrom_sitting_with_passive_overpressure_apply_to_all",
        commentsFieldName: "",
        showApplyToAll: true,
        showComments: false
    }
}
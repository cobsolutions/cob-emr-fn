import { COSTOVERTEBRAL_EXPANSION_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class CostovertebralExpansionConfig {
    static readonly costovertebralExpansion: RomSectionConfig = {
        labels: ['T4', 'T9', 'Umbilicus'],
        options: COSTOVERTEBRAL_EXPANSION_OPTIONS,
        fieldPrefix: "costovertebral_",
        applyToAllFieldName: "costovertebral_apply_to_all",
        commentsFieldName: "costovertebral_expansion_comments",
        showApplyToAll: true,
        showComments: true
    }
}

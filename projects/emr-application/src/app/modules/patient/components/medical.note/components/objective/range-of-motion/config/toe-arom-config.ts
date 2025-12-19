import { RomSectionConfig } from "./rom-types";

export class ToeAROM {
    static readonly toeArom: RomSectionConfig = {
        labels: [],
        options: [],
        applyToAllOptions: [],
        specialOptions: {},
        fieldPrefix: 'toe_arrom_',
        applyToAllFieldName: 'toe_arrom_apply_to_all',
        commentsFieldName: 'toe_arrom_comments',
        showApplyToAll: true,
        showComments: false
    }
}
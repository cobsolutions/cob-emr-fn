import { APPLY_TO_ALL_OPTIONS, SHOULDER_AROM_Extension_OPTIONS, SHOULDER_AROM_External_OPTIONS, SHOULDER_AROM_INTERNAL_OPTIONS, SHOULDER_AROM_OPTIONS, SHOULDER_AROM_POSITION_ABDUCTION_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class ShoulderAROM {
    static readonly shoulderArom: RomSectionConfig = {
        labels: [
            'Flexion',
            'Scaption',
            'Abduction',
            'Extension',
            'Functional External Rotation Reach',
            'Functional Internal Rotation Reach',
            'ER in Neutral Position',
            'IR in Neutral Position',
            'Horizontal Abduction',
            'Horizontal Adduction'
        ],
        options: SHOULDER_AROM_OPTIONS,
        specialOptions: {
            'Extension': SHOULDER_AROM_Extension_OPTIONS,
            'Functional External Rotation Reach': SHOULDER_AROM_External_OPTIONS,
            'Functional Internal Rotation Reach': SHOULDER_AROM_INTERNAL_OPTIONS,
            'ER in Neutral Position': SHOULDER_AROM_POSITION_ABDUCTION_OPTIONS,
            'IR in Neutral Position': SHOULDER_AROM_POSITION_ABDUCTION_OPTIONS,
            'Horizontal Abduction': SHOULDER_AROM_POSITION_ABDUCTION_OPTIONS,
            'Horizontal Adduction': SHOULDER_AROM_POSITION_ABDUCTION_OPTIONS,
        },
        applyToAllOptions: APPLY_TO_ALL_OPTIONS,
        fieldPrefix: 'shoulder_arrom_',
        applyToAllFieldName: 'shoulder_arrom_apply_to_all',
        commentsFieldName: 'shoulder_arrom_comments',
        showApplyToAll: true,
        showComments: false
    };
}
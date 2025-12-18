import { CERVICAL_AROM_OPTIONS, CERVICAL_AROM_SPECIAL_OPTIONS, DEFAULT_APPLY_TO_ALL_OPTIONS } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class CervicalAROMConfig{
    static readonly cervicalArom: RomSectionConfig = {
        labels: [
          'Forward Bending',
          'Backward Bending',
          'Right Rotation',
          'Left Rotation',
          'Right Side Bending',
          'Left Side Bending'
        ],
        options: CERVICAL_AROM_OPTIONS, // Default options for all selects (WFL, Limited)
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
        specialOptions: {
          'Forward Bending': CERVICAL_AROM_SPECIAL_OPTIONS // Special options for Forward Bending (WFL, Limited, Painful, Restricted)
        },
        fieldPrefix: 'cervical_arom_',
        applyToAllFieldName: 'cervical_arom_apply_to_all',
        commentsFieldName: 'cervical_arom_comments',
        showApplyToAll: true,
        showComments: true
      };
}
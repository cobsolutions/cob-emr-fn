import { RomSectionConfig } from './rom-types';
import { CERVICAL_ROM_OPTIONS, APPLY_TO_ALL_OPTIONS, FORWARD_BENDING_OPTIONS } from './rom-options';

export class SpineConfig {
  static readonly cervicalArom: RomSectionConfig = {
    labels: [
      'Forward Bending',
      'Backward Bending',
      'Right Rotation',
      'Left Rotation',
      'Right Side Bending',
      'Left Side Bending'
    ],
    options: CERVICAL_ROM_OPTIONS, // Default options for all selects (WFL, Limited)
    applyToAllOptions: APPLY_TO_ALL_OPTIONS, // Options for Apply to All (includes Not Tested)
    specialOptions: {
      'Forward Bending': FORWARD_BENDING_OPTIONS // Special options for Forward Bending (WFL, Limited, Painful, Restricted)
    },
    fieldPrefix: 'cervical_arom_',
    applyToAllFieldName: 'cervical_arom_apply_to_all',
    commentsFieldName: 'cervical_arom_comments',
    showApplyToAll: true,
    showComments: true
  };
}

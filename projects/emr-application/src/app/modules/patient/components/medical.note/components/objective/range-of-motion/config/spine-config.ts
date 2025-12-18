import { RomSectionConfig } from './rom-types';
import { ROM_TEST_OPTIONS, CERVICAL_ROM_OPTIONS } from './rom-options';

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
    options: CERVICAL_ROM_OPTIONS,
    fieldPrefix: 'cervical_arom_',
    applyToAllFieldName: 'cervical_arom_apply_to_all',
    commentsFieldName: 'cervical_arom_comments',
    showApplyToAll: true,
    showComments: true
  };
}

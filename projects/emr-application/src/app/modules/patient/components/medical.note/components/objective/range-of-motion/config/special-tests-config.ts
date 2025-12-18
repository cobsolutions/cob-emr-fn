import { RomSectionDropdownTextConfig } from './rom-types';
import { ROM_TEST_OPTIONS } from './rom-options';

export class SpecialTestsConfig {
  static readonly gripTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right Hand', 'Left Hand'],
    labels: [],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'grip_test_',
    commentsFieldName: 'grip_test_comments',
    showComments: false
  };
}

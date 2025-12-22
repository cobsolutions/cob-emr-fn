import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { craigsTest_OPTIONS } from "../special-test-options";

export interface CraigsTest {
  enabled: boolean;
}

export class CraigsTest {
  static readonly craigsTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: [],
    options: craigsTest_OPTIONS,
    fieldPrefix: 'craigs_test_',
    commentsFieldName: 'craigs_test_comments',
    hasTextInput:false,
    showComments: false
  };
}


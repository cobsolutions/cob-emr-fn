import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { ninetynineHamstringFlexibility_OPTIONS } from "../special-test-options";

export class HamstringFlexibilityTest {
  static readonly ninetynineHamstringFlexibilityTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: [],
    options: ninetynineHamstringFlexibility_OPTIONS,
    fieldPrefix: 'ninetynine_hamstring_flexibility_',
    commentsFieldName: 'ninetynine_hamstring_flexibility_comments',
    showComments: false
  };
}


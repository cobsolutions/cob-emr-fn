import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class LaseguesSlrConfig {
  static readonly laseguesSlr: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ["Lasegues SLR"],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'lasegues_slr_',
    commentsFieldName: 'lasegues_slr_comments',
    hasTextInput: false,
    showComments: false
  };
}

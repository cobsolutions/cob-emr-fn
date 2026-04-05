import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { slBalance_OPTIONS } from "../special-test-options";

export class SlBalanceConfig {
  static readonly slBalance: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Eyes Open', 'Eyes Closed'],
    options: slBalance_OPTIONS,
    fieldPrefix: 'pb_sl_balance_',
    commentsFieldName: 'pb_sl_balance_comments',
    hasTextInput: false,
    showComments: false
  };
}

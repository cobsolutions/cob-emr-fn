import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class SpurlingsManeuverConfig {
  static readonly spurlingsManeuver: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ["Spurlings Maneuver"],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'spurlings_maneuver_',
    commentsFieldName: 'spurlings_maneuver_comments',
    hasTextInput: false,
    showComments: false
  };
}

import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class LigamentIntegrityElbowConfig {
  static readonly ligamentIntegrityElbow: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Valgus Overload', 'Valgus Stress', 'Varus Stress'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'ligament_integrity_elbow_',
    commentsFieldName: 'ligament_integrity_elbow_comments',
    hasTextInput: false,
    showComments: false
  };
}

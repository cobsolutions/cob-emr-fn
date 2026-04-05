import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { AlarLigamentTest_OPTIONS } from "../special-test-options";

export class AlarLigamentTestManualConfig {
  static readonly alarLigamentTestManual: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Alar Ligament Test'],
    options: AlarLigamentTest_OPTIONS,
    fieldPrefix: 'alar_ligament_test_manual_',
    commentsFieldName: 'alar_ligament_test_manual_comments',
    hasTextInput: false,
    showComments: false
  };
}

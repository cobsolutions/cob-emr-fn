import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { unnamedField_OPTIONS } from "../special-test-options";

export interface TibialTorsion {
  enabled: boolean;
}

export class TibialTorsion {
  static readonly tibialTorsionFieldTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: [],
    options: unnamedField_OPTIONS,
    fieldPrefix: 'tibial_torsion_',
    commentsFieldName: 'unnamed_field_comments',
    hasTextInput:false,
    showComments: false
  };
}


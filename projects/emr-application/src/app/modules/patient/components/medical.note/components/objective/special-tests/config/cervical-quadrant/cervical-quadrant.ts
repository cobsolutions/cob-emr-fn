import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { cervicalQuadrant_OPTIONS } from "../special-test-options";

export interface CervicalQuadrantConfig {
  enabled: boolean;
}

export class CervicalQuadrantConfig {
  static readonly cervicalQuadrant: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Cervical Quadrant'],
    options: cervicalQuadrant_OPTIONS,
    fieldPrefix: 'cervical_quadrant_',
    commentsFieldName: 'cervical_quadrant_comments',
    hasTextInput: false,
    showComments: false
  };
}

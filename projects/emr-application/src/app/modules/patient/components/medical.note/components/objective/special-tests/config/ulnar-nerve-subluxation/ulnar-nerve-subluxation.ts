import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class UlnarNerveSubluxationConfig {
  static readonly ulnarNerveSubluxation: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Ulnar Nerve Subluxation'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'ulnar_nerve_subluxation_',
    commentsFieldName: 'ulnar_nerve_subluxation_comments',
    hasTextInput: false,
    showComments: false
  };
}

import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class SiCompressionConfig {
  static readonly siCompression: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['SI Compression'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'si_compression_',
    commentsFieldName: 'si_compression_comments',
    hasTextInput: false,
    showComments: false
  };
}

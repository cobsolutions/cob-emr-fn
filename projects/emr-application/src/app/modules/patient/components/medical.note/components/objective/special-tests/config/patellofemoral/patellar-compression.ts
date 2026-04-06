import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, patellarCompression_OPTIONS } from "../special-test-options";

export interface PatellarCompression {
  enabled: boolean;
}

export class PatellarCompression {
  static readonly patellarCompression: RomSectionConfig = {
    labels: [
      'Patellar Compression'
    ],
    options: patellarCompression_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'patellar_compression_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


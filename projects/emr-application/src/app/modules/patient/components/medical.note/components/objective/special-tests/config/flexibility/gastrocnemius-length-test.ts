import { RomInputSectionConfig } from "../../../range-of-motion/config";

export interface GastrocnemiusLengthTest {
  enabled: boolean;
}

export class GastrocnemiusLengthTest {
  static readonly gastrocnemiusLengthTest: RomInputSectionConfig = {
    labels: [
      'Gastrocnemius Length'
    ],
    fieldPrefix: 'gastrocnemius_length_test_',
    showComments: false,
    commentsFieldName: ""
  };
}


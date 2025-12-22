import { RomCheckSectionConfig, RomInputSectionConfig } from "../../../range-of-motion/config";

export interface ThomasTest {
  enabled: boolean;
}

export class ThomasTest {
  static readonly thomasTest: RomCheckSectionConfig = {
    labels: [
      'Negative',
      'Positive for Rectus Femoris',
      'Positive for Iliopsoas',
      'Positive for Rectus Femoris and Iliopsoas',
      'Positive for TFL/ITB'
    ],
    fieldPrefix: 'thomas_test_',
    showComments: false,
    commentsFieldName: ""
  };
}


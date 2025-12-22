import { RomInputSectionConfig } from "../../../range-of-motion/config";

export interface SoleusMuscleLengthTest {
  enabled: boolean;
}

export class SoleusMuscleLengthTest {
  static readonly soleusMuscleLengthTest: RomInputSectionConfig = {
    labels: [
      'Soleus Muscle Length'
    ],
    fieldPrefix: 'soleus_muscle_length_test_',
    showComments: false,
    commentsFieldName: ""
  };
}


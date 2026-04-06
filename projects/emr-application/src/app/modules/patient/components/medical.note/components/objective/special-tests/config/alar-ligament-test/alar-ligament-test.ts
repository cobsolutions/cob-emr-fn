import { RomSectionConfig } from "../../../range-of-motion/config";
import { AlarLigamentTest_OPTIONS, DEFAULT_APPLY_TO_ALL_OPTIONS, selectiveFunctionalMovementAssessment_OPTIONS } from "../special-test-options";

export interface SelectiveFunctionalMovementAssessment {
  enabled: boolean;
}

export class AlarLigamentTest {
  static readonly alarLigamentTest: RomSectionConfig = {
    labels: [
      'Alar Ligament Test'
    ],
    options: AlarLigamentTest_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'alar_ligament_test_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}


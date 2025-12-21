import { CERVICAL_ROM_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { CranialNerveScreen_OPTION } from "./neuro-vascular-options";

export interface CranialNerveScreen {
  enabled: boolean;
}

export class CranialNerveScreen {
  static readonly cranialNerveScreen: RomSectionConfig = {
    labels: [
      'Unilateral Smell (CN 1)',
      'Negative (Normal)',
      'Confrontation (CN 2)',
      'Not Tested',
      'Hall-Pike (CN 8 Coch)',
      'Negative (Normal)',
      'Finger Rustle (CN 8 Coch)',
      'Negative (Normal)',
      'Bone Conduction (CN 8 Coch)',
      'Negative (Normal)',
      'Convergence (CN 3,4,6)',
      'Negative (Normal)',
      'Facial Sensation (CN 5)',
      'Negative (Normal)',
      'Jaw Jerk / Clonus (CN 5)',
      'Negative (Normal)',
      'Smile (CN 7)',
      'Negative (Normal)',
      'Frown (CN 7)',
      'Negative (Normal)',
      'Body Tilt (CN 8 Vest)',
      'Not Tested',
      'Hall-Pike (CN 8 Coch)',
      'Not Tested',
      'Finger Rustle (CN 8 Coch)',
      'Not Tested',
      'Bone Conduction (CN 8 Coch)',
      'Not Tested',
      'Swallowing (CN 9)',
      'Not Tested',
      'Uvula Test (CN 10)',
      'Not Tested',
      'Trapezius / SCM (CN 11)',
      'Not Tested',
      'Tongue Protrusion (CN 12)'
    ],
    options: CranialNerveScreen_OPTION,
    fieldPrefix: 'cervical_arom_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
}


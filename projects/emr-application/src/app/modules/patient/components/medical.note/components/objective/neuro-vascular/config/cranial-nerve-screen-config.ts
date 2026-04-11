import { CERVICAL_ROM_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { CranialNerveScreen_OPTION } from "./neuro-vascular-options";

export interface CranialNerveScreen {
  enabled: boolean;
}

export class CranialNerveScreen {
  static readonly cranialNerveScreen: RomSectionConfig = {
    labels: [
      'Unilateral Smell (CN 1)',
      'Confrontation (CN 2)',
      'Convergence (CN 3,4,6)',
      'Facial Sensation (CN 5)',
      'Jaw Jerk / Clonus (CN 5)',
      'Smile (CN 7)',
      'Frown (CN 7)',
      'Body Tilt (CN 8 Vest)',
      'Hall-Pike (CN 8 Coch)',
      'Finger Rustle (CN 8 Coch)',
      'Bone Conduction (CN 8 Coch)',
      'Swallowing (CN 9)',
      'Uvula Test (CN 10)',
      'Trapezius / SCM (CN 11)',
      'Tongue Protrusion (CN 12)'
    ],
    options: CranialNerveScreen_OPTION,
    fieldPrefix: 'cranial_nerve_screen_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
}


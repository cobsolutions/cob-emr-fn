import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { C1_2_Resist_Chin_in_OPTION, C1_2_Resist_Chin_up_OPTION, MyotomesUpper_OPTION } from "./neuro-vascular-options";

export interface MyotomesUpper {
  enabled: boolean;
}

export class MyotomesUpper {
  static readonly myotomesUpperSelect: RomSectionWithSelectsConfig = {
    labels: ['C3 Lat Cerv Flexion', 'C4 Shoulder Elevation', 'C5 Shoulder Abduction', 'C6 Wrist Extension', 'C7 Triceps', 'C8 1st Extension', 'T1 Hand Intrinsics'],
    options: MyotomesUpper_OPTION,
    fieldPrefix: 'myotomes_upper_',
    topSelects: [
      {
        label: 'C1-2 Resist Chin in',
        fieldName: 'myotomes_upper_chin_in',
        options: C1_2_Resist_Chin_in_OPTION
      },
      {
        label: 'C1-2 Resist Chin up',
        fieldName: 'myotomes_upper_chin_up',
        options: C1_2_Resist_Chin_up_OPTION
      }
    ],
    commentsFieldName: 'myotomes_upper_comments',
    showComments: true
  };

}


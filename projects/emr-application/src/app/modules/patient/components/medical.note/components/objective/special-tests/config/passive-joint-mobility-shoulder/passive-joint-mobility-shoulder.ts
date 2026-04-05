import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { passiveJointMobilityShoulder_OPTIONS } from "../special-test-options";

export class PassiveJointMobilityShoulderConfig {
  static readonly passiveJointMobilityShoulder: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Posterior Capsule', 'Anterior Capsule', 'Inferior Capsule'],
    options: passiveJointMobilityShoulder_OPTIONS,
    fieldPrefix: 'passive_joint_mobility_shoulder_',
    commentsFieldName: 'passive_joint_mobility_shoulder_comments',
    hasTextInput: false,
    showComments: false
  };
}

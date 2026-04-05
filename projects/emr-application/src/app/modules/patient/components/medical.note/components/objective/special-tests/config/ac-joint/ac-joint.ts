export interface AcJointConfig {
  title: string;
  labels: string[];
  fieldPrefix: string;
  showNormalCheckbox?: boolean;
  showComments?: boolean;
}

export class AcJointConfig {
  static readonly acJoint: AcJointConfig = {
    title: 'AC Joint',
    labels: [
      'Normal',
      'Hypermobile',
      'Hypomobile',
      'Capsular',
      'Non Capsular',
      'Painful'
    ],
    fieldPrefix: 'ac_joint_',
    showNormalCheckbox: false,
    showComments: false
  };
}

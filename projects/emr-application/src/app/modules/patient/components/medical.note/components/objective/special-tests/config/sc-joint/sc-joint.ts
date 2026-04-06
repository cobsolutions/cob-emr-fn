export interface ScJointConfig {
  title: string;
  labels: string[];
  fieldPrefix: string;
  showNormalCheckbox?: boolean;
  showComments?: boolean;
}

export class ScJointConfig {
  static readonly scJoint: ScJointConfig = {
    title: 'SC Joint',
    labels: [
      'Normal',
      'Hypermobile',
      'Hypomobile',
      'Capsular',
      'Non Capsular',
      'Painful'
    ],
    fieldPrefix: 'sc_joint_',
    showNormalCheckbox: false,
    showComments: false
  };
}

/**
 * ROM Sections Configuration
 * Central configuration for all ROM parent-child sections
 */

export interface RomOption {
  value: string;
  label: string;
}

export interface RomSectionConfig {
  labels: string[];
  options: RomOption[];
  fieldPrefix: string;
  applyToAllFieldName: string;
  commentsFieldName: string;
  showApplyToAll?: boolean;
  showComments?: boolean;
}

export interface RomSectionEndfeelConfig {
  labels: string[];
  measurementOptions: RomOption[];
  endfeelOptions: RomOption[];
  fieldPrefix: string;
  applyToAllFieldName: string;
  commentsFieldName: string;
  showApplyToAll?: boolean;
  showComments?: boolean;
}

export interface RomSectionDropdownTextConfig {
  columns: string[];
  labels: string[];
  options: RomOption[];
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
}

export interface TopSelect {
  label: string;
  fieldName: string;
  options: RomOption[];
}

export interface RomSectionWithSelectsConfig {
  labels: string[];
  options: RomOption[];
  fieldPrefix: string;
  topSelects: TopSelect[];
  commentsFieldName: string;
  showComments?: boolean;
}

// Standard ROM test options (used by most sections)
const ROM_TEST_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' }
];

const CERVICAL_ROM_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' }
];

const WRIST_AROM_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' }
];

const ENDFEEL_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'normal', label: 'Normal' },
  { value: 'abnormal', label: 'Abnormal' }
];

/**
 * Individual ROM Section Configurations
 */
export class RomSectionsConfig {
  static readonly kneeArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'knee_',
    applyToAllFieldName: 'knee_arom_apply_to_all',
    commentsFieldName: 'knee_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly ankleArom: RomSectionConfig = {
    labels: [
      'Dorsiflexion 0 Knee Flexion',
      'Dorsiflexion 90 Knee Flexion',
      'Plantarflexion',
      'Inversion',
      'Eversion'
    ],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'ankle_',
    applyToAllFieldName: 'ankle_arom_apply_to_all',
    commentsFieldName: 'ankle_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly ankleProm: RomSectionConfig = {
    labels: [
      'Dorsiflexion 0 Knee Flexion',
      'Dorsiflexion 90 Knee Flexion',
      'Plantarflexion',
      'Inversion',
      'Eversion'
    ],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'ankle_prom_',
    applyToAllFieldName: 'ankle_prom_apply_to_all',
    commentsFieldName: 'ankle_prom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly firstMtpArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'fst_mtp_',
    applyToAllFieldName: 'fst_mtp_arom_apply_to_all',
    commentsFieldName: 'fst_mtp_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly firstIpArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'fst_ip_',
    applyToAllFieldName: 'fst_ip_arom_apply_to_all',
    commentsFieldName: 'fst_ip_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly toeArom: RomSectionConfig = {
    labels: [
      '2nd MTP Flexion',
      '2nd MTP Extension',
      '2nd IP Flexion',
      '2nd IP Extension',
      '3rd MTP Flexion',
      '3rd MTP Extension',
      '3rd IP Flexion',
      '3rd IP Extension',
      '4th MTP Flexion',
      '4th MTP Extension',
      '4th IP Flexion',
      '4th IP Extension',
      '5th MTP Flexion',
      '5th MTP Extension',
      '5th IP Flexion',
      '5th IP Extension'
    ],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'toe_arom_',
    applyToAllFieldName: 'toe_arom_apply_to_all',
    commentsFieldName: 'toe_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly toeProm: RomSectionConfig = {
    labels: [
      '2nd MTP Flexion',
      '2nd MTP Extension',
      '2nd IP Flexion',
      '2nd IP Extension',
      '3rd MTP Flexion',
      '3rd MTP Extension',
      '3rd IP Flexion',
      '3rd IP Extension',
      '4th MTP Flexion',
      '4th MTP Extension',
      '4th IP Flexion',
      '4th IP Extension',
      '5th MTP Flexion',
      '5th MTP Extension',
      '5th IP Flexion',
      '5th IP Extension'
    ],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'toe_prom_',
    applyToAllFieldName: 'toe_prom_apply_to_all',
    commentsFieldName: 'toe_prom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly hipProm: RomSectionEndfeelConfig = {
    labels: [
      'Flexion',
      'Extension',
      'Abduction',
      'Adduction',
      'Internal Rotation',
      'External Rotation'
    ],
    measurementOptions: ROM_TEST_OPTIONS,
    endfeelOptions: ROM_TEST_OPTIONS,
    fieldPrefix: 'hip_prom_',
    applyToAllFieldName: 'hip_prom_apply_to_all',
    commentsFieldName: 'hip_prom_comments',
    showApplyToAll: true,
    showComments: true
  };

  // Dummy Example: Shoulder AROM with Labels
  static readonly shoulderAromWithLabels: RomSectionDropdownTextConfig = {
    columns: ['ROM', 'Movement Quality', 'Pain Free Movement'],
    labels: [
      'Retraction',
      'Right Rotation',
      'Left Rotation',
      'Right Lateral Flexion',
      'Left Lateral Flexion',
      'Extension'
    ],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'shoulder_arom_',
    commentsFieldName: 'shoulder_arom_comments',
    showComments: true
  };

  // Dummy Example: Grip Test without Labels
  static readonly gripTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: [], // Empty = no labels layout
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'grip_test_',
    commentsFieldName: 'grip_test_comments',
    showComments: true
  };

  // Dummy Example: Elbow AROM with Top Selects
  static readonly elbowAromWithSelects: RomSectionWithSelectsConfig = {
    labels: ['Flexion', 'Extension', 'Supination', 'Pronation'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'elbow_arom_',
    topSelects: [
      {
        label: 'Patient Position',
        fieldName: 'elbow_arom_patient_position',
        options: [
          { value: 'sitting', label: 'Sitting' },
          { value: 'standing', label: 'Standing' },
          { value: 'supine', label: 'Supine' }
        ]
      },
      {
        label: 'Test Method',
        fieldName: 'elbow_arom_test_method',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'passive', label: 'Passive' },
          { value: 'resistive', label: 'Resistive' }
        ]
      },
      {
        label: 'Pain Level',
        fieldName: 'elbow_arom_pain_level',
        options: [
          { value: 'none', label: 'None' },
          { value: 'mild', label: 'Mild' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'severe', label: 'Severe' }
        ]
      }
    ],
    commentsFieldName: 'elbow_arom_comments',
    showComments: true
  };
}

/**
 * Export options for direct use
 */
export const ROM_OPTIONS = {
  romTest: ROM_TEST_OPTIONS,
  cervical: CERVICAL_ROM_OPTIONS,
  wristArom: WRIST_AROM_OPTIONS,
  endfeel: ENDFEEL_OPTIONS
};

import { RomSectionDropdownTextConfig, RomSectionWithSelectsConfig } from './rom-types';
import { ROM_TEST_OPTIONS } from './rom-options';

export class UpperExtremityConfig {
  static readonly shoulderAromWithLabels: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Flexion', 'Extension', 'Abduction', 'Adduction'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'shoulder_arom_',
    commentsFieldName: 'shoulder_arom_comments',
    showComments: true
  };

  static readonly elbowAromWithSelects: RomSectionWithSelectsConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'elbow_arom_',
    topSelects: [
      {
        label: 'Position',
        fieldName: 'elbow_arom_position',
        options: [
          { value: 'sitting', label: 'Sitting' },
          { value: 'standing', label: 'Standing' },
          { value: 'supine', label: 'Supine' }
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
      },
      {
        label: 'Quality',
        fieldName: 'elbow_arom_quality',
        options: [
          { value: 'smooth', label: 'Smooth' },
          { value: 'restricted', label: 'Restricted' },
          { value: 'painful', label: 'Painful' }
        ]
      }
    ],
    commentsFieldName: 'elbow_arom_comments',
    showComments: true
  };
}

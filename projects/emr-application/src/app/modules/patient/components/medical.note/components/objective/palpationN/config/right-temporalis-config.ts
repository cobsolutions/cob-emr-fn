export interface MuscleSectionConfig {
    title: string;
    labels: string[];
    fieldPrefix: string;
    showNormalCheckbox?: boolean;
    showComments?: boolean;
    commentsLabel?: string;
    commentsFieldName?: string;
    normalFieldName?: string;
  }
  export const MuscleAssessmentConfig = {
    rightTemporalis: {
      title: 'Right Temporalis',
      labels: [
        'Tender with increased tissue tension',
        'Edema',
        'Warmth',
        'Involuntary muscle holding (spasms)',
        'Voluntary muscle holding (guarding)',
        'Adaptive shortening'
      ],
      fieldPrefix: 'right_temporalis_'
    } as MuscleSectionConfig
  };
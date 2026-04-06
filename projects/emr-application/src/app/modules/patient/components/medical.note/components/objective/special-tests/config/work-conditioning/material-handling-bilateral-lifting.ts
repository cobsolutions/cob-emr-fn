export interface MaterialHandlingBilateralLifting {
  enabled: boolean;
}

export class MaterialHandlingBilateralLifting {
  static readonly liftingTest = {
    labels: [
      'Floor To Knuckle',
      'Knuckle To Shoulder', 
      'Shoulder To Overhead',
      '100 FT Carry And Pivot'
    ],
    columnHeaders: [
      'Occasional (Lbs.)',
      'Frequent (Lbs.)',
      'Adequate For Job'
    ],
    columnPlaceholders: [
      'Enter lbs...',
      'Enter lbs...', 
      'WAY/NAY'
    ],
    fieldPrefix: 'material_handling_bilateral_lifting_',
    showComments: true,
    commentsLabel: '',
    commentsFieldName: 'material_handling_bilateral_lifting_comments',
    options: [
      { value: '', label: 'Clear All' },
      { value: 'WAY', label: 'Set All to WAY' },
      { value: 'NAY', label: 'Set All to NAY' }
    ],
  };
}


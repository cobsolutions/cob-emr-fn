export interface NonMaterialHandling {
  enabled: boolean;
}

export class NonMaterialHandling {
  static readonly nonMaterialHandling: any = {
    items: [
      { label: 'Sitting', unit: 'Minutes' },
      { label: 'Standing', unit: 'Minutes' },
      { label: 'Walking', unit: 'Minutes' },
      { label: 'Stair Climbing', unit: 'Flights' },
      { label: 'Trunk Bending' },
      { label: 'Overhead Reach' },
      { label: 'Crawl' },
      { label: 'Squatting' },
      { label: 'Kneeling' },
      { label: 'Stooping' },
      { label: 'Crouching' },
      { label: 'Ladder Climbing' },
      { label: 'Forward Reach' }
    ],
    columnHeaders: ['Occasional', 'Frequent', 'Constant', 'Adequate For Job'],
    frequencyColumns: ['Occasional', 'Frequent', 'Constant'], // First 3 are checkboxes
    adequateColumn: 'Adequate For Job', // Last column is select
    fieldPrefix: 'non_naterial_handling_',
    showComments: true,
    commentsLabel: '',
    commentsFieldName: 'demonstrated_comments',
    columnWidths: [250, 100, 100, 100, 150], // Custom column widths
    options: [
      { value: 'check_all', label: 'Check All Frequency' },
      { value: 'uncheck_all', label: 'Uncheck All Frequency' },
      { value: 'set_adequate', label: 'Set All Adequate to YES' }
    ]
  };
}


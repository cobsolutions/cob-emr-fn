import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TopSelect } from '../../range-of-motion/config';

@Component({
  selector: 'measurement-table-with-selects',
  templateUrl: './measurement-table-with-selects.component.html',
  styleUrls: ['./measurement-table-with-selects.component.css']
})
export class MeasurementTableWithSelectsComponent {
  @Input() labels: string[] = []; // Row labels like ['Flexion', 'Extension']
  @Input() options: any[] = []; // Options for table dropdowns
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() topSelects: TopSelect[] = []; // Multiple selects at the top
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;

  /**
   * Generate form control name for a measurement field
   * Example: fieldPrefix='elbow_', label='Flexion', side='right' => 'elbow_flexion_right'
   */
  getFieldName(label: string, side: 'right' | 'left'): string {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
    return `${this.fieldPrefix}${normalizedLabel}_${side}`;
  }

  /**
   * Generate form control name for comments field
   */
  getCommentsFieldName(): string {
    return this.commentsFieldName || `${this.fieldPrefix}comments`;
  }
}

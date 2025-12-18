import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TopSelect } from '../../range-of-motion/config';

@Component({
  selector: 'measurement-table-with-selects',
  templateUrl: './measurement-table-with-selects.component.html',
  styleUrls: ['./measurement-table-with-selects.component.css']
})
export class MeasurementTableWithSelectsComponent implements OnInit {
  @Input() labels: string[] = []; // Row labels like ['Flexion', 'Extension']
  @Input() options: any[] = []; // Default options for all measurement selects
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() topSelects: TopSelect[] = []; // Multiple selects at the top
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ensureFormControlsExist();
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    // Add top select controls
    this.topSelects.forEach(select => {
      if (!this.formGroup.get(select.fieldName)) {
        this.formGroup.addControl(select.fieldName, this.fb.control(''));
      }
    });

    // Add measurement controls for each label (right and left)
    this.labels.forEach(label => {
      const rightField = this.getFieldName(label, 'right');
      const leftField = this.getFieldName(label, 'left');

      if (!this.formGroup.get(rightField)) {
        this.formGroup.addControl(rightField, this.fb.control('not_tested'));
      }
      if (!this.formGroup.get(leftField)) {
        this.formGroup.addControl(leftField, this.fb.control('not_tested'));
      }
    });

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(''));
      }
    }
  }

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

  /**
   * Get options for a specific label
   * Returns specialOptions[label] if provided, otherwise falls back to options
   */
  getOptionsForLabel(label: string): any[] {
    if (this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }
}

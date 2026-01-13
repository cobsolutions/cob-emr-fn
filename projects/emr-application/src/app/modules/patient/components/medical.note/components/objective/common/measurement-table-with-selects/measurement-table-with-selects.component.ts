import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TopSelect } from '../../range-of-motion/config';
import { generateMeasurementFieldName } from '../form-field-utils';

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
  @Input() initialData?: any; // Initial values for controls

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
      const initialValue = this.initialData?.[select.fieldName] || '';
      if (!this.formGroup.get(select.fieldName)) {
        if(this.fieldPrefix ==='gross_muscle_tests_'){
          console.log('select.fieldName' , select.fieldName)
        }
        this.formGroup.addControl(select.fieldName, this.fb.control(initialValue));
      }
    });

    // Add measurement controls for each label (right and left)
    this.labels.forEach(label => {
      const rightField = this.getFieldName(label, 'right');
      const leftField = this.getFieldName(label, 'left');

      const rightValue = this.initialData?.[rightField] || 'not_tested';
      const leftValue = this.initialData?.[leftField] || 'not_tested';

      if (!this.formGroup.get(rightField)) {
        this.formGroup.addControl(rightField, this.fb.control(rightValue));
      }
      if (!this.formGroup.get(leftField)) {
        this.formGroup.addControl(leftField, this.fb.control(leftValue));
      }
    });

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      const commentsValue = this.initialData?.[commentsFieldName] || '';
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(commentsValue));
      }
    }
  }

  /**
   * Generate form control name for a measurement field
   * Example: fieldPrefix='elbow_', label='Flexion', side='right' => 'elbow_flexion_right'
   */
  getFieldName(label: string, side: 'right' | 'left'): string {
    return generateMeasurementFieldName(this.fieldPrefix, label, side);
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

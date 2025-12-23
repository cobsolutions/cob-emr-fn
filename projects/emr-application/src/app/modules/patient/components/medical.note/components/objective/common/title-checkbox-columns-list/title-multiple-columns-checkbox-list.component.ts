import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'title-multiple-columns-checkbox-list',
  templateUrl: './title-multiple-columns-checkbox-list.component.html',
  styleUrls: ['./title-multiple-columns-checkbox-list.component.css']
})
export class TitleMultipleColumnsCheckboxListComponent implements OnInit {

  // Required inputs
  @Input() title!: string;
  @Input() labels!: string[];
  @Input() formGroup!: FormGroup;

  // Optional inputs with defaults
  @Input() fieldPrefix: string = '';
  @Input() showNormalCheckbox: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;
  @Input() normalFieldName?: string;
  @Input() rightColumnLabel: string = 'Right';
  @Input() leftColumnLabel: string = 'Left';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Validate required inputs
    if (!this.title) {
      console.warn('TitleMultipleColumnsCheckboxListComponent: title input is required');
    }

    if (!this.labels || !Array.isArray(this.labels)) {
      console.warn('TitleMultipleColumnsCheckboxListComponent: labels input must be an array');
      this.labels = [];
    }

    if (!this.formGroup) {
      console.error('TitleMultipleColumnsCheckboxListComponent: formGroup input is required');
      return;
    }

    this.ensureFormControlsExist();
  }

  private ensureFormControlsExist(): void {
    // Add Normal checkbox control if needed
    if (this.showNormalCheckbox) {
      const normalFieldName = this.getNormalFieldName();
      if (!this.formGroup.get(normalFieldName)) {
        this.formGroup.addControl(normalFieldName, this.fb.control(false));
      }
    }

    // Add controls for each label (Right and Left columns)
    if (this.labels && this.labels.length > 0) {
      this.labels.forEach((label, index) => {
        const rightFieldName = this.getFieldName(label, 'right', index);
        const leftFieldName = this.getFieldName(label, 'left', index);

        if (!this.formGroup.get(rightFieldName)) {
          this.formGroup.addControl(rightFieldName, this.fb.control(false));
        }

        if (!this.formGroup.get(leftFieldName)) {
          this.formGroup.addControl(leftFieldName, this.fb.control(false));
        }
      });
    }

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(''));
      }
    }
  }

  /**
   * Generate form control name for a checkbox field (with side: right or left)
   */
  getFieldName(label: string, side: 'right' | 'left', index: number): string {
    const cleanLabel = this.cleanString(label);
    return `${this.fieldPrefix}${cleanLabel}_${side}`;
  }

  /**
   * Generate form control name for Normal checkbox
   */
  getNormalFieldName(): string {
    return this.normalFieldName || `${this.fieldPrefix}normal`;
  }

  /**
   * Generate form control name for comments field
   */
  getCommentsFieldName(): string {
    return this.commentsFieldName || `${this.fieldPrefix}comments`;
  }

  /**
   * Clean string for use in field name
   */
  private cleanString(str: string): string {
    return str.toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }

}

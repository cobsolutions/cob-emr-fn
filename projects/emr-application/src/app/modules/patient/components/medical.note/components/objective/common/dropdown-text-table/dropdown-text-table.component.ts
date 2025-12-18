import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dropdown-text-table',
  templateUrl: './dropdown-text-table.component.html',
  styleUrls: ['./dropdown-text-table.component.css']
})
export class DropdownTextTableComponent implements OnInit {
  @Input() columns: string[] = []; // e.g., ['ROM', 'Movement Quality', 'Pain Free Movement'] or ['Right', 'Left']
  @Input() labels: string[] = []; // e.g., ['Retraction', 'Right Rotation', ...] - empty for no labels
  @Input() options: any[] = []; // Default dropdown options for all columns
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = ''; // e.g., 'shoulder_arom_'
  @Input() showComments: boolean = false;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;

  hasLabels: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.hasLabels = this.labels && this.labels.length > 0;
    this.ensureFormControlsExist();
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    if (this.hasLabels) {
      // With labels: create dropdown and text for each label-column combination
      this.labels.forEach(label => {
        this.columns.forEach(column => {
          const dropdownFieldName = this.getDropdownFieldName(label, column);
          const textFieldName = this.getTextFieldName(label, column);

          if (!this.formGroup.get(dropdownFieldName)) {
            this.formGroup.addControl(dropdownFieldName, this.fb.control(''));
          }
          if (!this.formGroup.get(textFieldName)) {
            this.formGroup.addControl(textFieldName, this.fb.control(''));
          }
        });
      });
    } else {
      // Without labels: create dropdown and text for each column
      this.columns.forEach(column => {
        const dropdownFieldName = this.getDropdownFieldName(null, column);
        const textFieldName = this.getTextFieldName(null, column);

        if (!this.formGroup.get(dropdownFieldName)) {
          this.formGroup.addControl(dropdownFieldName, this.fb.control(''));
        }
        if (!this.formGroup.get(textFieldName)) {
          this.formGroup.addControl(textFieldName, this.fb.control(''));
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
   * Generate form control name for a dropdown field
   * With labels: fieldPrefix_labelName_columnName (e.g., shoulder_arom_retraction_rom)
   * Without labels: fieldPrefix_columnName (e.g., shoulder_arom_right)
   */
  getDropdownFieldName(label: string | null, column: string): string {
    const normalizedColumn = column.toLowerCase().replace(/\s+/g, '_');

    if (label) {
      const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
      return `${this.fieldPrefix}${normalizedLabel}_${normalizedColumn}`;
    } else {
      return `${this.fieldPrefix}${normalizedColumn}`;
    }
  }

  /**
   * Generate form control name for a text input field
   * With labels: fieldPrefix_labelName_columnName_text
   * Without labels: fieldPrefix_columnName_text
   */
  getTextFieldName(label: string | null, column: string): string {
    const normalizedColumn = column.toLowerCase().replace(/\s+/g, '_');

    if (label) {
      const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
      return `${this.fieldPrefix}${normalizedLabel}_${normalizedColumn}_text`;
    } else {
      return `${this.fieldPrefix}${normalizedColumn}_text`;
    }
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
  getOptionsForLabel(label: string | null): any[] {
    if (label && this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dropdown-text-table',
  templateUrl: './dropdown-text-table.component.html',
  styleUrls: ['./dropdown-text-table.component.css']
})
export class DropdownTextTableComponent implements OnInit {
  @Input() columns: string[] = []; // e.g., ['ROM', 'Movement Quality', 'Pain Free Movement'] or ['Right', 'Left']
  @Input() labels: string[] = []; // e.g., ['Retraction', 'Right Rotation', ...] - empty for no labels
  @Input() options: any[] = []; // Dropdown options for all columns
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = ''; // e.g., 'shoulder_arom_'
  @Input() showComments: boolean = false;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;

  hasLabels: boolean = false;

  ngOnInit(): void {
    this.hasLabels = this.labels && this.labels.length > 0;
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
}

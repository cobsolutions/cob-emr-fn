import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateDropdownFieldName, generateTextFieldName } from '../form-field-utils';

interface LabelColumnMapping {
  label: string;
  columns: {
    column: string;
    dropdownField: string;
    textField: string;
    customField: string;
    options: any[];
  }[];
}

interface ColumnMapping {
  column: string;
  dropdownField: string;
  textField: string;
  customField: string;
  options: any[];
}

@Component({
  selector: 'dropdown-text-table',
  templateUrl: './dropdown-text-table.component.html',
  styleUrls: ['./dropdown-text-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownTextTableComponent implements OnInit, OnDestroy {
  @Input() columns: string[] = []; // e.g., ['ROM', 'Movement Quality', 'Pain Free Movement'] or ['Right', 'Left']
  @Input() labels: string[] = []; // e.g., ['Retraction', 'Right Rotation', ...] - empty for no labels
  @Input() options: any[] = []; // Default dropdown options for all columns
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = ''; // e.g., 'shoulder_arom_'
  @Input() showComments: boolean = false;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;
  @Input() hasTextInput?: boolean = true
  @Input() initialData?: any; // Initial values for controls

  hasLabels: boolean = false;

  // Pre-computed field mappings
  labelMappings: LabelColumnMapping[] = [];
  columnMappings: ColumnMapping[] = [];
  computedCommentsFieldName: string = '';

  // Track which fields currently have 'custom' selected
  customFieldVisible: { [fieldName: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.hasLabels = this.labels && this.labels.length > 0;
    this.computedCommentsFieldName = this.getCommentsFieldName();

    // Pre-compute field mappings
    if (this.hasLabels) {
      this.labelMappings = this.labels.map(label => ({
        label,
        columns: this.columns.map(column => ({
          column,
          dropdownField: this.getDropdownFieldName(label, column),
          textField: this.getTextFieldName(label, column),
          customField: this.getDropdownFieldName(label, column) + '_custom',
          options: this.getOptionsForLabel(label)
        }))
      }));
    } else {
      this.columnMappings = this.columns.map(column => ({
        column,
        dropdownField: this.getDropdownFieldName(null, column),
        textField: this.getTextFieldName(null, column),
        customField: this.getDropdownFieldName(null, column) + '_custom',
        options: this.getOptionsForLabel(null)
      }));
    }

    this.ensureFormControlsExist();
    this.setupCustomFieldListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    console.log('fieldPrefix , ' + this.fieldPrefix)
    if (this.hasLabels) {
      console.log('this.hasLabels , ' + this.fieldPrefix)
      // With labels: create dropdown, text, and custom for each label-column combination
      this.labelMappings.forEach(mapping => {
        mapping.columns.forEach(col => {
          const dropdownValue = this.initialData?.[col.dropdownField] || 'not_tested';
          const textValue = this.initialData?.[col.textField] || '';
          const customValue = this.initialData?.[col.customField] || '';

          if (!this.formGroup.get(col.dropdownField)) {
            this.formGroup.addControl(col.dropdownField, this.fb.control(dropdownValue));
          }
          if (!this.formGroup.get(col.textField) && this.hasTextInput) {
            this.formGroup.addControl(col.textField, this.fb.control(textValue));
          }
          if (!this.formGroup.get(col.customField)) {
            this.formGroup.addControl(col.customField, this.fb.control(customValue));
          }

          // Initialize visibility based on initial values
          this.customFieldVisible[col.customField] = this.isCustomValue(dropdownValue);
        });
      });
    } else {
      // Without labels: create dropdown, text, and custom for each column
      this.columnMappings.forEach(col => {
        const dropdownValue = this.initialData?.[col.dropdownField] || 'not_tested';
        const textValue = this.initialData?.[col.textField] || '';
        const customValue = this.initialData?.[col.customField] || '';

        if (!this.formGroup.get(col.dropdownField)) {
          this.formGroup.addControl(col.dropdownField, this.fb.control(dropdownValue));
        }
        if (!this.formGroup.get(col.textField) && this.hasTextInput) {
          this.formGroup.addControl(col.textField, this.fb.control(textValue));
        }
        if (!this.formGroup.get(col.customField)) {
          this.formGroup.addControl(col.customField, this.fb.control(customValue));
        }

        // Initialize visibility based on initial values
        this.customFieldVisible[col.customField] = this.isCustomValue(dropdownValue);
      });
    }

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      const commentsValue = this.initialData?.[commentsFieldName] || '';
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(commentsValue));
      }
    }
  }

  private isCustomValue(value: string): boolean {
    return value?.toLowerCase() === 'custom';
  }

  private setupCustomFieldListeners(): void {
    const allColumns = this.hasLabels
      ? this.labelMappings.flatMap(m => m.columns)
      : this.columnMappings;

    allColumns.forEach(col => {
      this.formGroup.get(col.dropdownField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[col.customField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(col.customField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });
    });
  }

  /**
   * Generate form control name for a dropdown field
   */
  getDropdownFieldName(label: string | null, column: string): string {
    return generateDropdownFieldName(this.fieldPrefix, label, column);
  }

  /**
   * Generate form control name for a text input field
   */
  getTextFieldName(label: string | null, column: string): string {
    return generateTextFieldName(this.fieldPrefix, label, column);
  }

  /**
   * Generate form control name for comments field
   */
  getCommentsFieldName(): string {
    return this.commentsFieldName || `${this.fieldPrefix}comments`;
  }

  /**
   * Get options for a specific label
   */
  getOptionsForLabel(label: string | null): any[] {
    if (label && this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }

  trackByLabel(index: number, item: LabelColumnMapping): string {
    return item.label;
  }

  trackByColumn(index: number, item: ColumnMapping | { column: string }): string {
    return item.column;
  }

  trackByValue(index: number, item: any): string {
    return item.value;
  }
}

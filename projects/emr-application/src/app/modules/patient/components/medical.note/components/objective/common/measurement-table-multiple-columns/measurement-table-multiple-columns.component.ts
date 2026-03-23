import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateMultiColumnFieldName } from '../form-field-utils';

export interface ColumnDefinition {
  name: string;          // Column header label (e.g. 'Trial 1', 'Right', 'Dominant')
  fieldSuffix?: string;  // Optional override for field name part (defaults to normalized name)
}

export type CellType = 'select' | 'input' | 'both';

interface CellMapping {
  column: ColumnDefinition;
  selectField: string;
  inputField: string;
  customField: string;
  options: any[];
}

interface LabelFieldMapping {
  label: string;
  cells: CellMapping[];
}

@Component({
  selector: 'measurement-table-multiple-columns',
  templateUrl: './measurement-table-multiple-columns.component.html',
  styleUrls: ['./measurement-table-multiple-columns.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementTableMultipleColumnsComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() columns: ColumnDefinition[] = [];
  @Input() options: any[] = [];                           // Default options for all selects
  @Input() applyToAllOptions?: any[];                     // Options for Apply to All dropdown
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() columnOptions?: { [columnName: string]: any[] }; // Override options for specific columns
  @Input() cellOptions?: { [labelAndColumn: string]: any[] }; // Override options for specific cell (key: "label::column")
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;
  @Input() initialData?: any;

  /** Controls what each cell contains: 'select', 'input', or 'both' (default: 'both') */
  @Input() cellType: CellType = 'both';

  /** Whether select shows custom text input when 'custom' is selected (only relevant when cellType includes select) */
  @Input() showCustomField: boolean = true;

  /** Default value for select controls */
  @Input() defaultSelectValue: string = 'not_tested';

  /** Default value for input controls */
  @Input() defaultInputValue: string = '';

  /** Placeholder for input fields */
  @Input() inputPlaceholder: string = '';

  /** Input type (text, number, etc.) */
  @Input() inputType: string = 'text';

  /** Label column width */
  @Input() labelColumnWidth: string = '300px';

  // Pre-computed mappings
  labelMappings: LabelFieldMapping[] = [];
  computedApplyToAllFieldName: string = '';
  computedCommentsFieldName: string = '';
  computedApplyToAllOptions: any[] = [];

  // Track which fields currently have 'custom' selected
  customFieldVisible: { [fieldName: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  get hasSelect(): boolean {
    return this.cellType === 'select' || this.cellType === 'both';
  }

  get hasInput(): boolean {
    return this.cellType === 'input' || this.cellType === 'both';
  }

  trackByLabel(index: number, item: LabelFieldMapping): string {
    return item.label;
  }

  trackByCell(index: number, item: CellMapping): string {
    return item.column.name;
  }

  trackByValue(index: number, item: any): string {
    return item.value;
  }

  trackByColumn(index: number, item: ColumnDefinition): string {
    return item.name;
  }

  ngOnInit(): void {
    this.computedApplyToAllFieldName = this.applyToAllFieldName || `${this.fieldPrefix}apply_to_all`;
    this.computedCommentsFieldName = this.commentsFieldName || `${this.fieldPrefix}comments`;
    this.computedApplyToAllOptions = this.applyToAllOptions || this.options;

    // Pre-compute label and cell mappings
    this.labelMappings = this.labels.map(label => ({
      label,
      cells: this.columns.map(col => {
        const baseField = this.getFieldName(label, col);
        return {
          column: col,
          selectField: baseField + '_select',
          inputField: baseField + '_input',
          customField: baseField + '_select_custom',
          options: this.getOptionsForCell(label, col)
        };
      })
    }));

    this.ensureFormControlsExist();
    if (this.hasSelect && this.showCustomField) {
      this.setupCustomFieldListeners();
    }
    if (this.showApplyToAll && this.hasSelect) {
      this.setupApplyToAllListener();
    }
  }

  private getFieldName(label: string, column: ColumnDefinition): string {
    const colKey = column.fieldSuffix || column.name;
    return generateMultiColumnFieldName(this.fieldPrefix, label, colKey);
  }

  private getOptionsForCell(label: string, column: ColumnDefinition): any[] {
    // Most specific: cell-level override
    const cellKey = `${label}::${column.name}`;
    if (this.cellOptions && this.cellOptions[cellKey]) {
      return this.cellOptions[cellKey];
    }
    // Column-level override
    if (this.columnOptions && this.columnOptions[column.name]) {
      return this.columnOptions[column.name];
    }
    // Label-level override
    if (this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }

  private ensureFormControlsExist(): void {
    // Apply to All control
    if (this.showApplyToAll && this.hasSelect) {
      const fieldName = this.computedApplyToAllFieldName;
      const initialValue = this.initialData?.[fieldName] || '';
      if (!this.formGroup.get(fieldName)) {
        this.formGroup.addControl(fieldName, this.fb.control(initialValue));
      }
    }

    // Cell controls for each label x column
    this.labelMappings.forEach(mapping => {
      mapping.cells.forEach(cell => {
        if (this.hasSelect) {
          const selectValue = this.initialData?.[cell.selectField] || this.defaultSelectValue;
          if (!this.formGroup.get(cell.selectField)) {
            this.formGroup.addControl(cell.selectField, this.fb.control(selectValue));
          }
          // Custom text control for select
          if (this.showCustomField) {
            const customValue = this.initialData?.[cell.customField] || '';
            if (!this.formGroup.get(cell.customField)) {
              this.formGroup.addControl(cell.customField, this.fb.control(customValue));
            }
            this.customFieldVisible[cell.customField] = this.isCustomValue(selectValue);
          }
        }

        if (this.hasInput) {
          const inputValue = this.initialData?.[cell.inputField] || this.defaultInputValue;
          if (!this.formGroup.get(cell.inputField)) {
            this.formGroup.addControl(cell.inputField, this.fb.control(inputValue));
          }
        }
      });
    });

    // Comments control
    if (this.showComments) {
      const fieldName = this.computedCommentsFieldName;
      const initialValue = this.initialData?.[fieldName] || '';
      if (!this.formGroup.get(fieldName)) {
        this.formGroup.addControl(fieldName, this.fb.control(initialValue));
      }
    }
  }

  private isCustomValue(value: string): boolean {
    return value?.toLowerCase() === 'custom';
  }

  private setupCustomFieldListeners(): void {
    this.labelMappings.forEach(mapping => {
      mapping.cells.forEach(cell => {
        this.formGroup.get(cell.selectField)?.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            this.customFieldVisible[cell.customField] = this.isCustomValue(value);
            if (!this.isCustomValue(value)) {
              this.formGroup.get(cell.customField)?.setValue('', { emitEvent: false });
            }
            this.cdr.markForCheck();
          });
      });
    });
  }

  private setupApplyToAllListener(): void {
    const applyToAllControl = this.formGroup.get(this.computedApplyToAllFieldName);
    if (applyToAllControl) {
      applyToAllControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          if (value) {
            this.applyValueToAllFields(value);
          }
        });
    }
  }

  private applyValueToAllFields(value: string): void {
    const updates: any = {};
    this.labelMappings.forEach(mapping => {
      mapping.cells.forEach(cell => {
        updates[cell.selectField] = value;
      });
    });
    this.formGroup.patchValue(updates, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'material-handling-work-condition',
  templateUrl: './material-handling-work-condition.component.html',
  styleUrls: ['./material-handling-work-condition.component.css']
})
export class MaterialHandlingWorkConditionComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() columnHeaders: string[] = [];
  @Input() selectColumnIndices: number[] = []; // Indices of columns that should be selects
  @Input() selectOptions: { [columnIndex: number]: { value: string, label: string }[] } = {}; // Options for select columns
  @Input() options: any[] = []; // Options for Apply to All dropdown
  @Input() applyToAllOptions?: any[]; // Options for Apply to All dropdown
  @Input() columnPlaceholders: string[] = []; // Optional placeholders for each column
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;
  @Input() columnWidths: number[] = []; // Optional custom widths for columns
  @Input() initialData?: any; // Initial values for controls

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ensureFormControlsExist();
    if (this.showApplyToAll) {
      this.setupApplyToAllListener();
    }
  }

  private ensureFormControlsExist(): void {
    // Add Apply to All control if needed
    if (this.showApplyToAll) {
      const applyToAllFieldName = this.getApplyToAllFieldName();
      const initialValue = this.initialData?.[applyToAllFieldName] || '';
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(initialValue));
      }
    }

    // Add controls for each label and column combination
    this.labels.forEach(label => {
      this.columnHeaders.forEach((column, colIndex) => {
        const fieldName = this.getFieldName(label, colIndex);
        const initialValue = this.initialData?.[fieldName] || '';
        if (!this.formGroup.get(fieldName)) {
          this.formGroup.addControl(fieldName, this.fb.control(initialValue));
        }
      });
    });

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      const initialValue = this.initialData?.[commentsFieldName] || '';
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(initialValue));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Generate form control name for a field
   */
  getFieldName(label: string, columnIndex: number): string {
    // Clean the label for use in field name
    const cleanLabel = label.toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    // Clean the column header for use in field name
    const cleanColumn = this.columnHeaders[columnIndex].toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    return `${this.fieldPrefix}${cleanLabel}_${cleanColumn}`;
  }

  /**
   * Check if a column should be a select dropdown
   */
  isSelectColumn(columnIndex: number): boolean {
    // Check if this column index is in the selectColumnIndices array
    if (this.selectColumnIndices.includes(columnIndex)) {
      return true;
    }
    
    // Also check by column header name (for convenience)
    const columnName = this.columnHeaders[columnIndex].toLowerCase();
    return columnName.includes('adequate') || columnName.includes('yes') || columnName.includes('no');
  }

  /**
   * Get options for a specific select column
   */
  getSelectOptions(columnIndex: number): { value: string, label: string }[] {
    // Return custom options if provided
    if (this.selectOptions && this.selectOptions[columnIndex]) {
      return this.selectOptions[columnIndex];
    }
    
    // Default YES/NO options for "Adequate For Job" type columns
    return [
      { value: 'na', label: 'N/A' },
      { value: 'YES', label: 'YES' },
      { value: 'NO', label: 'NO' }
    ];
  }

  /**
   * Generate form control name for Apply to All field
   */
  getApplyToAllFieldName(): string {
    return this.applyToAllFieldName || `${this.fieldPrefix}apply_to_all`;
  }

  /**
   * Generate form control name for comments field
   */
  getCommentsFieldName(): string {
    return this.commentsFieldName || `${this.fieldPrefix}comments`;
  }

  /**
   * Get options for Apply to All dropdown
   */
  getApplyToAllOptions(): any[] {
    return this.applyToAllOptions || this.options;
  }

  /**
   * Get placeholder for a specific column
   */
  getPlaceholderForColumn(columnIndex: number): string {
    if (this.columnPlaceholders && this.columnPlaceholders[columnIndex]) {
      return this.columnPlaceholders[columnIndex];
    }
    
    // Different placeholder for select columns
    if (this.isSelectColumn(columnIndex)) {
      return 'N/A';
    }
    
    return 'Enter value...'; // Default placeholder for inputs
  }

  /**
   * Get width for a specific column
   */
  getColumnWidth(columnIndex: number): number | null {
    if (this.columnWidths && this.columnWidths[columnIndex]) {
      return this.columnWidths[columnIndex];
    }
    return null; // Use default width
  }

  /**
   * Setup Apply to All listener
   */
  private setupApplyToAllListener(): void {
    const applyToAllControl = this.formGroup.get(this.getApplyToAllFieldName());
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

  /**
   * Apply a value to all fields
   */
  private applyValueToAllFields(value: string): void {
    const updates: any = {};
    
    this.labels.forEach(label => {
      this.columnHeaders.forEach((column, colIndex) => {
        const fieldName = this.getFieldName(label, colIndex);
        updates[fieldName] = value;
      });
    });
    
    this.formGroup.patchValue(updates, { emitEvent: false });
  }

}

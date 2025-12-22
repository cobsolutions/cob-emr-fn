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
  @Input() options: any[] = []; // Options for Apply to All dropdown
  @Input() columnPlaceholders: string[] = []; // Optional placeholders for each column
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string;
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;
  @Input() columnWidths: number[] = []; // Optional custom widths for columns

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ensureFormControlsExist();
    
  }

  private ensureFormControlsExist(): void {
    // Add controls for each label and column combination
    this.labels.forEach(label => {
      this.columnHeaders.forEach((column, colIndex) => {
        const fieldName = this.getFieldName(label, colIndex);
        if (!this.formGroup.get(fieldName)) {
          this.formGroup.addControl(fieldName, this.fb.control(''));
        }
      });
    });

    // Add comments control if needed
    if (this.showComments) {
      const commentsFieldName = this.getCommentsFieldName();
      if (!this.formGroup.get(commentsFieldName)) {
        this.formGroup.addControl(commentsFieldName, this.fb.control(''));
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
   * Get placeholder for a specific column
   */
  getPlaceholderForColumn(columnIndex: number): string {
    if (this.columnPlaceholders && this.columnPlaceholders[columnIndex]) {
      return this.columnPlaceholders[columnIndex];
    }
    return 'Enter value...'; // Default placeholder
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

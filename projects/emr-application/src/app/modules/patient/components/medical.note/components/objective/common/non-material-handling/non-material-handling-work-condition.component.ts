import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export interface DemonstratedItem {
  label: string;
  unit?: string; // Optional unit like "Minutes", "Flights"
}
@Component({
  selector: 'non-material-handling-work-condition',
  templateUrl: './non-material-handling-work-condition.component.html',
  styleUrls: ['./non-material-handling-work-condition.component.css']
})
export class NonMaterialHandlingWorkConditionComponent implements OnInit {
  @Input() items: DemonstratedItem[] = [];
  @Input() columnHeaders: string[] = [];
  @Input() frequencyColumns: string[] = ['Occasional', 'Frequent', 'Constant'];
  @Input() adequateColumn: string = 'Adequate For Job';
  @Input() options: any[] = []; // Options for Apply to All dropdown
  @Input() applyToAllOptions?: any[]; // Options for Apply to All dropdown
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = '';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;
  @Input() columnWidths: number[] = []; // Optional custom widths for columns
  @Input() initialData?: any; // Initial values for controls

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ensureFormControlsExist();
    if (this.showApplyToAll) {
      this.setupApplyToAllListener();
    }
  }

  private ensureFormControlsExist(): void {
    // Add Apply to All control if needed
    console.log('this.initialData ', this.initialData)
    if (this.showApplyToAll) {
      const applyToAllFieldName = this.getApplyToAllFieldName();
      const initialValue = this.initialData?.[applyToAllFieldName] || '';
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(initialValue));
      }
    }

    // Add controls for each item
    this.items.forEach(item => {
      // Add frequency checkbox controls (Occasional, Frequent, Constant)
      this.frequencyColumns.forEach((column, index) => {
        const fieldName = this.getFrequencyFieldName(item, index);
        const initialValue = this.initialData?.[fieldName] || false;
        if (!this.formGroup.get(fieldName)) {
          this.formGroup.addControl(fieldName, this.fb.control(initialValue));
        }
      });

      // Add adequate select control
      const adequateFieldName = this.getAdequateFieldName(item);
      const initialValue = this.initialData?.[adequateFieldName] || '';
      if (!this.formGroup.get(adequateFieldName)) {
        this.formGroup.addControl(adequateFieldName, this.fb.control(initialValue));
      }
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
   * Generate form control name for a frequency checkbox field
   */
  getFrequencyFieldName(item: DemonstratedItem, columnIndex: number): string {
    const cleanLabel = this.cleanString(item.label);
    const cleanColumn = this.cleanString(this.frequencyColumns[columnIndex]);
    return `${this.fieldPrefix}${cleanLabel}_${cleanColumn}`;
  }

  /**
   * Generate form control name for adequate select field
   */
  getAdequateFieldName(item: DemonstratedItem): string {
    const cleanLabel = this.cleanString(item.label);
    const cleanColumn = this.cleanString(this.adequateColumn);
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
   * Get options for Apply to All dropdown
   */
  getApplyToAllOptions(): any[] {
    return this.applyToAllOptions || this.options;
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
          if (value === 'check_all' || value === 'uncheck_all' || value === 'set_adequate') {
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

    if (value === 'check_all') {
      // Check all frequency checkboxes
      this.items.forEach(item => {
        this.frequencyColumns.forEach((column, index) => {
          const fieldName = this.getFrequencyFieldName(item, index);
          updates[fieldName] = true;
        });
      });
    } else if (value === 'uncheck_all') {
      // Uncheck all frequency checkboxes
      this.items.forEach(item => {
        this.frequencyColumns.forEach((column, index) => {
          const fieldName = this.getFrequencyFieldName(item, index);
          updates[fieldName] = false;
        });
      });
    } else if (value === 'set_adequate') {
      // Set all adequate selects to a specific value
      this.items.forEach(item => {
        const fieldName = this.getAdequateFieldName(item);
        updates[fieldName] = 'YES'; // Or any other value from dropdown
      });
    }

    this.formGroup.patchValue(updates, { emitEvent: false });
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

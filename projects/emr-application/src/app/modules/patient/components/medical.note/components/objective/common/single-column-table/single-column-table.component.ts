import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateSingleColumnFieldName } from '../form-field-utils';

interface LabelFieldMapping {
  label: string;
  fieldName: string;
  options: any[];
}

@Component({
  selector: 'single-column-table',
  templateUrl: './single-column-table.component.html',
  styleUrls: ['./single-column-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleColumnTableComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() options: any[] = []; // Default options for all selects
  @Input() applyToAllOptions?: any[]; // Options for Apply to All dropdown (defaults to options)
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;
  @Input() initialData?: any; // Initial values for controls

  // Pre-computed field mappings to avoid function calls in template
  labelMappings: LabelFieldMapping[] = [];
  computedApplyToAllFieldName: string = '';
  computedCommentsFieldName: string = '';
  computedApplyToAllOptions: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  trackByLabel(index: number, item: LabelFieldMapping): string {
    return item.label;
  }

  trackByValue(index: number, item: any): string {
    return item.value;
  }

  ngOnInit(): void {
    // Pre-compute field names to avoid function calls in template
    this.computedApplyToAllFieldName = this.getApplyToAllFieldName();
    this.computedCommentsFieldName = this.getCommentsFieldName();
    this.computedApplyToAllOptions = this.getApplyToAllOptions();

    // Pre-compute label mappings
    this.labelMappings = this.labels.map(label => ({
      label,
      fieldName: this.getFieldName(label),
      options: this.getOptionsForLabel(label)
    }));

    this.ensureFormControlsExist();
    if (this.showApplyToAll) {
      this.setupApplyToAllListener();
    }
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    // Add Apply to All control if needed
    if (this.showApplyToAll) {
      const applyToAllFieldName = this.getApplyToAllFieldName();
      const initialValue = this.initialData?.[applyToAllFieldName] || '';
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(initialValue));
      }
    }

    // Add controls for each label with initial values
    this.labels.forEach(label => {
      const fieldName = this.getFieldName(label);
      const initialValue = this.initialData?.[fieldName] || 'not_tested';
      if (!this.formGroup.get(fieldName)) {
        this.formGroup.addControl(fieldName, this.fb.control(initialValue));
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
   * Generate form control name for a field
   * Example: fieldPrefix='cervical_arom_', label='Forward Bending' => 'cervical_arom_forward_bending'
   */
  getFieldName(label: string): string {
    return generateSingleColumnFieldName(this.fieldPrefix, label);
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
   * Get options for a specific label
   * Checks specialOptions first, falls back to default options
   */
  getOptionsForLabel(label: string): any[] {
    if (this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
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
      const fieldName = this.getFieldName(label);
      updates[fieldName] = value;
    });
    this.formGroup.patchValue(updates, { emitEvent: false });
  }
}

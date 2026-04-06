import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateMeasurementFieldName } from '../form-field-utils';

interface LabelFieldMapping {
  label: string;
  rightField: string;
  leftField: string;
  rightCustomField: string;
  leftCustomField: string;
  options: any[];
}

@Component({
  selector: 'measurement-table',
  templateUrl: './measurement-table.component.html',
  styleUrls: ['./measurement-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementTableComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() options: any[] = []; // Default options for all measurement selects
  @Input() applyToAllOptions?: any[]; // Options for Apply to All dropdown (defaults to options)
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string; // Optional custom apply to all field name
  @Input() commentsFieldName?: string; // Optional custom comments field name
  @Input() initialData?: any; // Initial values for controls

  // Pre-computed field mappings to avoid function calls in template
  labelMappings: LabelFieldMapping[] = [];
  computedApplyToAllFieldName: string = '';
  computedCommentsFieldName: string = '';
  computedApplyToAllOptions: any[] = [];

  // Track which fields currently have 'custom' selected
  customFieldVisible: { [fieldName: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

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
      rightField: this.getFieldName(label, 'right'),
      leftField: this.getFieldName(label, 'left'),
      rightCustomField: this.getFieldName(label, 'right') + '_custom',
      leftCustomField: this.getFieldName(label, 'left') + '_custom',
      options: this.getOptionsForLabel(label)
    }));

    this.ensureFormControlsExist();
    this.setupCustomFieldListeners();
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

    // Add controls for each label (right and left) with initial values
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

      // Add custom text controls
      const rightCustomField = rightField + '_custom';
      const leftCustomField = leftField + '_custom';
      const rightCustomValue = this.initialData?.[rightCustomField] || '';
      const leftCustomValue = this.initialData?.[leftCustomField] || '';

      if (!this.formGroup.get(rightCustomField)) {
        this.formGroup.addControl(rightCustomField, this.fb.control(rightCustomValue));
      }
      if (!this.formGroup.get(leftCustomField)) {
        this.formGroup.addControl(leftCustomField, this.fb.control(leftCustomValue));
      }

      // Initialize visibility based on initial values
      this.customFieldVisible[rightCustomField] = this.isCustomValue(rightValue);
      this.customFieldVisible[leftCustomField] = this.isCustomValue(leftValue);
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

  private isCustomValue(value: string): boolean {
    return value?.toLowerCase() === 'custom';
  }

  private setupCustomFieldListeners(): void {
    this.labelMappings.forEach(mapping => {
      // Listen to right select
      this.formGroup.get(mapping.rightField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.rightCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.rightCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });

      // Listen to left select
      this.formGroup.get(mapping.leftField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.leftCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.leftCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Generate form control name for a measurement field
   * Example: fieldPrefix='fst_mtp_', label='Flexion', side='right' => 'fst_mtp_flexion_right'
   */
  getFieldName(label: string, side: 'right' | 'left'): string {
    return generateMeasurementFieldName(this.fieldPrefix, label, side);
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
   * Returns applyToAllOptions if provided, otherwise falls back to options
   */
  getApplyToAllOptions(): any[] {
    return this.applyToAllOptions || this.options;
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
   * Apply a value to all measurement fields
   */
  private applyValueToAllFields(value: string): void {
    const updates: any = {};
    this.labels.forEach(label => {
      const rightField = this.getFieldName(label, 'right');
      const leftField = this.getFieldName(label, 'left');
      updates[rightField] = value;
      updates[leftField] = value;
    });
    this.formGroup.patchValue(updates, { emitEvent: false });
  }
}

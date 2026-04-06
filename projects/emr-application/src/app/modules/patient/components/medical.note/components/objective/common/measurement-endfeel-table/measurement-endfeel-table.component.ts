import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateMeasurementFieldName, generateEndfeelFieldName } from '../form-field-utils';

interface LabelFieldMapping {
  label: string;
  rightMeasurementField: string;
  leftMeasurementField: string;
  rightMeasurementCustomField: string;
  leftMeasurementCustomField: string;
  rightEndfeelField: string;
  leftEndfeelField: string;
  rightEndfeelCustomField: string;
  leftEndfeelCustomField: string;
  measurementOptions: any[];
}

@Component({
  selector: 'measurement-endfeel-table',
  templateUrl: './measurement-endfeel-table.component.html',
  styleUrls: ['./measurement-endfeel-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementEndfeelTableComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() measurementOptions: any[] = []; // Default measurement options for all selects
  @Input() applyToAllMeasurementOptions?: any[]; // Options for Apply to All dropdown (defaults to measurementOptions)
  @Input() specialMeasurementOptions?: { [labelName: string]: any[] }; // Override measurement options for specific labels
  @Input() endfeelOptions: any[] = [];
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
  computedApplyToAllMeasurementOptions: any[] = [];

  // Track which fields currently have 'custom' selected
  customFieldVisible: { [fieldName: string]: boolean } = {};

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
    this.computedApplyToAllMeasurementOptions = this.getApplyToAllMeasurementOptions();

    // Pre-compute label mappings
    this.labelMappings = this.labels.map(label => ({
      label,
      rightMeasurementField: this.getMeasurementFieldName(label, 'right'),
      leftMeasurementField: this.getMeasurementFieldName(label, 'left'),
      rightMeasurementCustomField: this.getMeasurementFieldName(label, 'right') + '_custom',
      leftMeasurementCustomField: this.getMeasurementFieldName(label, 'left') + '_custom',
      rightEndfeelField: this.getEndfeelFieldName(label, 'right'),
      leftEndfeelField: this.getEndfeelFieldName(label, 'left'),
      rightEndfeelCustomField: this.getEndfeelFieldName(label, 'right') + '_custom',
      leftEndfeelCustomField: this.getEndfeelFieldName(label, 'left') + '_custom',
      measurementOptions: this.getMeasurementOptionsForLabel(label)
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

    // Add measurement and endfeel controls for each label (right and left) with initial values
    this.labels.forEach(label => {
      const rightMeasurement = this.getMeasurementFieldName(label, 'right');
      const leftMeasurement = this.getMeasurementFieldName(label, 'left');
      const rightEndfeel = this.getEndfeelFieldName(label, 'right');
      const leftEndfeel = this.getEndfeelFieldName(label, 'left');

      const rightMeasurementValue = this.initialData?.[rightMeasurement] || 'not_tested';
      const leftMeasurementValue = this.initialData?.[leftMeasurement] || 'not_tested';
      const rightEndfeelValue = this.initialData?.[rightEndfeel] || 'not_tested';
      const leftEndfeelValue = this.initialData?.[leftEndfeel] || 'not_tested';

      if (!this.formGroup.get(rightMeasurement)) {
        this.formGroup.addControl(rightMeasurement, this.fb.control(rightMeasurementValue));
      }
      if (!this.formGroup.get(leftMeasurement)) {
        this.formGroup.addControl(leftMeasurement, this.fb.control(leftMeasurementValue));
      }
      if (!this.formGroup.get(rightEndfeel)) {
        this.formGroup.addControl(rightEndfeel, this.fb.control(rightEndfeelValue));
      }
      if (!this.formGroup.get(leftEndfeel)) {
        this.formGroup.addControl(leftEndfeel, this.fb.control(leftEndfeelValue));
      }

      // Add custom text controls for measurement fields
      const rightMeasurementCustomField = rightMeasurement + '_custom';
      const leftMeasurementCustomField = leftMeasurement + '_custom';
      const rightMeasurementCustomValue = this.initialData?.[rightMeasurementCustomField] || '';
      const leftMeasurementCustomValue = this.initialData?.[leftMeasurementCustomField] || '';

      if (!this.formGroup.get(rightMeasurementCustomField)) {
        this.formGroup.addControl(rightMeasurementCustomField, this.fb.control(rightMeasurementCustomValue));
      }
      if (!this.formGroup.get(leftMeasurementCustomField)) {
        this.formGroup.addControl(leftMeasurementCustomField, this.fb.control(leftMeasurementCustomValue));
      }

      // Add custom text controls for endfeel fields
      const rightEndfeelCustomField = rightEndfeel + '_custom';
      const leftEndfeelCustomField = leftEndfeel + '_custom';
      const rightEndfeelCustomValue = this.initialData?.[rightEndfeelCustomField] || '';
      const leftEndfeelCustomValue = this.initialData?.[leftEndfeelCustomField] || '';

      if (!this.formGroup.get(rightEndfeelCustomField)) {
        this.formGroup.addControl(rightEndfeelCustomField, this.fb.control(rightEndfeelCustomValue));
      }
      if (!this.formGroup.get(leftEndfeelCustomField)) {
        this.formGroup.addControl(leftEndfeelCustomField, this.fb.control(leftEndfeelCustomValue));
      }

      // Initialize visibility based on initial values
      this.customFieldVisible[rightMeasurementCustomField] = this.isCustomValue(rightMeasurementValue);
      this.customFieldVisible[leftMeasurementCustomField] = this.isCustomValue(leftMeasurementValue);
      this.customFieldVisible[rightEndfeelCustomField] = this.isCustomValue(rightEndfeelValue);
      this.customFieldVisible[leftEndfeelCustomField] = this.isCustomValue(leftEndfeelValue);
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
      // Listen to right measurement select
      this.formGroup.get(mapping.rightMeasurementField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.rightMeasurementCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.rightMeasurementCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });

      // Listen to left measurement select
      this.formGroup.get(mapping.leftMeasurementField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.leftMeasurementCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.leftMeasurementCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });

      // Listen to right endfeel select
      this.formGroup.get(mapping.rightEndfeelField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.rightEndfeelCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.rightEndfeelCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });

      // Listen to left endfeel select
      this.formGroup.get(mapping.leftEndfeelField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.leftEndfeelCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.leftEndfeelCustomField)?.setValue('', { emitEvent: false });
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
   * Example: fieldPrefix='hip_prom_', label='Flexion', side='right' => 'hip_prom_flexion_right'
   */
  getMeasurementFieldName(label: string, side: 'right' | 'left'): string {
    return generateMeasurementFieldName(this.fieldPrefix, label, side);
  }

  /**
   * Generate form control name for an endfeel field
   * Example: fieldPrefix='hip_prom_', label='Flexion', side='right' => 'hip_prom_flexion_right_endfeel'
   */
  getEndfeelFieldName(label: string, side: 'right' | 'left'): string {
    return generateEndfeelFieldName(this.fieldPrefix, label, side);
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
   * Get measurement options for Apply to All dropdown
   * Returns applyToAllMeasurementOptions if provided, otherwise falls back to measurementOptions
   */
  getApplyToAllMeasurementOptions(): any[] {
    return this.applyToAllMeasurementOptions || this.measurementOptions;
  }

  /**
   * Get measurement options for a specific label
   * Returns specialMeasurementOptions[label] if provided, otherwise falls back to measurementOptions
   */
  getMeasurementOptionsForLabel(label: string): any[] {
    if (this.specialMeasurementOptions && this.specialMeasurementOptions[label]) {
      return this.specialMeasurementOptions[label];
    }
    return this.measurementOptions;
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
            this.applyValueToAllMeasurementFields(value);
          }
        });
    }
  }

  /**
   * Apply a value to all measurement fields (not endfeel)
   */
  private applyValueToAllMeasurementFields(value: string): void {
    const updates: any = {};
    this.labels.forEach(label => {
      const rightField = this.getMeasurementFieldName(label, 'right');
      const leftField = this.getMeasurementFieldName(label, 'left');
      updates[rightField] = value;
      updates[leftField] = value;
    });
    this.formGroup.patchValue(updates, { emitEvent: false });
  }
}

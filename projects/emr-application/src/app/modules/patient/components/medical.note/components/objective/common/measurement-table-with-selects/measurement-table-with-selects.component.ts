import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TopSelect } from '../../range-of-motion/config';
import { generateMeasurementFieldName } from '../form-field-utils';

interface LabelMapping {
  label: string;
  rightField: string;
  leftField: string;
  rightCustomField: string;
  leftCustomField: string;
  options: any[];
}

interface TopSelectMapping {
  label: string;
  fieldName: string;
  customField: string;
  options: any[];
}

@Component({
  selector: 'measurement-table-with-selects',
  templateUrl: './measurement-table-with-selects.component.html',
  styleUrls: ['./measurement-table-with-selects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementTableWithSelectsComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = []; // Row labels like ['Flexion', 'Extension']
  @Input() options: any[] = []; // Default options for all measurement selects
  @Input() specialOptions?: { [labelName: string]: any[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() topSelects: TopSelect[] = []; // Multiple selects at the top
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;
  @Input() initialData?: any; // Initial values for controls

  // Pre-computed field mappings
  labelMappings: LabelMapping[] = [];
  topSelectMappings: TopSelectMapping[] = [];
  computedCommentsFieldName: string = '';

  // Track which fields currently have 'custom' selected
  customFieldVisible: { [fieldName: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.computedCommentsFieldName = this.getCommentsFieldName();

    // Pre-compute top select mappings
    this.topSelectMappings = this.topSelects.map(select => ({
      label: select.label,
      fieldName: select.fieldName,
      customField: select.fieldName + '_custom',
      options: select.options
    }));

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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    // Add top select controls and their custom fields
    this.topSelectMappings.forEach(select => {
      const initialValue = this.initialData?.[select.fieldName] || '';
      const customValue = this.initialData?.[select.customField] || '';

      if (!this.formGroup.get(select.fieldName)) {
        if(this.fieldPrefix ==='gross_muscle_tests_'){
          console.log('select.fieldName' , select.fieldName)
        }
        this.formGroup.addControl(select.fieldName, this.fb.control(initialValue));
      }
      if (!this.formGroup.get(select.customField)) {
        this.formGroup.addControl(select.customField, this.fb.control(customValue));
      }

      // Initialize visibility
      this.customFieldVisible[select.customField] = this.isCustomValue(initialValue);
    });

    // Add measurement controls for each label (right and left) with custom fields
    this.labelMappings.forEach(mapping => {
      const rightValue = this.initialData?.[mapping.rightField] || 'not_tested';
      const leftValue = this.initialData?.[mapping.leftField] || 'not_tested';
      const rightCustomValue = this.initialData?.[mapping.rightCustomField] || '';
      const leftCustomValue = this.initialData?.[mapping.leftCustomField] || '';

      if (!this.formGroup.get(mapping.rightField)) {
        this.formGroup.addControl(mapping.rightField, this.fb.control(rightValue));
      }
      if (!this.formGroup.get(mapping.leftField)) {
        this.formGroup.addControl(mapping.leftField, this.fb.control(leftValue));
      }
      if (!this.formGroup.get(mapping.rightCustomField)) {
        this.formGroup.addControl(mapping.rightCustomField, this.fb.control(rightCustomValue));
      }
      if (!this.formGroup.get(mapping.leftCustomField)) {
        this.formGroup.addControl(mapping.leftCustomField, this.fb.control(leftCustomValue));
      }

      // Initialize visibility
      this.customFieldVisible[mapping.rightCustomField] = this.isCustomValue(rightValue);
      this.customFieldVisible[mapping.leftCustomField] = this.isCustomValue(leftValue);
    });

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
    // Listen to top select changes
    this.topSelectMappings.forEach(select => {
      this.formGroup.get(select.fieldName)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[select.customField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(select.customField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });
    });

    // Listen to measurement select changes
    this.labelMappings.forEach(mapping => {
      this.formGroup.get(mapping.rightField)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.customFieldVisible[mapping.rightCustomField] = this.isCustomValue(value);
          if (!this.isCustomValue(value)) {
            this.formGroup.get(mapping.rightCustomField)?.setValue('', { emitEvent: false });
          }
          this.cdr.markForCheck();
        });

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

  /**
   * Generate form control name for a measurement field
   */
  getFieldName(label: string, side: 'right' | 'left'): string {
    return generateMeasurementFieldName(this.fieldPrefix, label, side);
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
  getOptionsForLabel(label: string): any[] {
    if (this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }

  trackByLabel(index: number, item: LabelMapping): string {
    return item.label;
  }

  trackBySelect(index: number, item: TopSelectMapping): string {
    return item.fieldName;
  }

  trackByValue(index: number, item: any): string {
    return item.value;
  }
}

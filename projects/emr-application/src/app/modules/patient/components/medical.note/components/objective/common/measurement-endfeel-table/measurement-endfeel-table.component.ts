import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateMeasurementFieldName, generateEndfeelFieldName } from '../form-field-utils';

@Component({
  selector: 'measurement-endfeel-table',
  templateUrl: './measurement-endfeel-table.component.html',
  styleUrls: ['./measurement-endfeel-table.component.css']
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

  @Output() controlsReady = new EventEmitter<void>(); // Emit when dynamic controls are created

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ensureFormControlsExist();
    if (this.showApplyToAll) {
      this.setupApplyToAllListener();
    }

    // Emit after controls are created and ready
    this.controlsReady.emit();
  }

  /**
   * Dynamically add form controls if they don't exist
   */
  private ensureFormControlsExist(): void {
    // Add Apply to All control if needed
    if (this.showApplyToAll) {
      const applyToAllFieldName = this.getApplyToAllFieldName();
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(''));
      }
    }

    // Add measurement and endfeel controls for each label (right and left)
    this.labels.forEach(label => {
      const rightMeasurement = this.getMeasurementFieldName(label, 'right');
      const leftMeasurement = this.getMeasurementFieldName(label, 'left');
      const rightEndfeel = this.getEndfeelFieldName(label, 'right');
      const leftEndfeel = this.getEndfeelFieldName(label, 'left');

      if (!this.formGroup.get(rightMeasurement)) {
        this.formGroup.addControl(rightMeasurement, this.fb.control('not_tested'));
      }
      if (!this.formGroup.get(leftMeasurement)) {
        this.formGroup.addControl(leftMeasurement, this.fb.control('not_tested'));
      }
      if (!this.formGroup.get(rightEndfeel)) {
        this.formGroup.addControl(rightEndfeel, this.fb.control('not_tested'));
      }
      if (!this.formGroup.get(leftEndfeel)) {
        this.formGroup.addControl(leftEndfeel, this.fb.control('not_tested'));
      }
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

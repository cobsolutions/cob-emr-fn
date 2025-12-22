import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { generateMeasurementFieldName } from '../form-field-utils';

@Component({
  selector: 'measurement-input-table',
  templateUrl: './measurement-input-table.component.html',
  styleUrls: ['./measurement-input-table.component.css']
})
export class MeasurementInputTableComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllPlaceholder: string = 'Enter value for all...';
  @Input() applyToAllFieldName?: string; // Optional custom apply to all field name
  @Input() commentsFieldName?: string; // Optional custom comments field name
  @Input() placeholderMapping: { [labelName: string]: string } = {}; // Custom placeholders for specific labels
  @Input() defaultPlaceholder: string = 'Enter measurement...'; // Default placeholder

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(''));
      }
    }

    // Add controls for each label (right and left)
    this.labels.forEach(label => {
      const rightField = this.getFieldName(label, 'right');
      const leftField = this.getFieldName(label, 'left');

      if (!this.formGroup.get(rightField)) {
        this.formGroup.addControl(rightField, this.fb.control(''));
      }
      if (!this.formGroup.get(leftField)) {
        this.formGroup.addControl(leftField, this.fb.control(''));
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
   * Get placeholder for a specific label
   * Returns placeholderMapping[label] if provided, otherwise falls back to defaultPlaceholder
   */
  getPlaceholderForLabel(label: string): string {
    if (this.placeholderMapping && this.placeholderMapping[label]) {
      return this.placeholderMapping[label];
    }
    return this.defaultPlaceholder;
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
          if (value !== null && value !== undefined && value !== '') {
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

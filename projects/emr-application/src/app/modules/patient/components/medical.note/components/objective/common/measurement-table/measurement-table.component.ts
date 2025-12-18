import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'measurement-table',
  templateUrl: './measurement-table.component.html',
  styleUrls: ['./measurement-table.component.css']
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

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (this.showApplyToAll) {
      this.setupApplyToAllListener();
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
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
    return `${this.fieldPrefix}${normalizedLabel}_${side}`;
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

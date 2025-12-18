import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'measurement-endfeel-table',
  templateUrl: './measurement-endfeel-table.component.html',
  styleUrls: ['./measurement-endfeel-table.component.css']
})
export class MeasurementEndfeelTableComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() measurementOptions: any[] = [];
  @Input() endfeelOptions: any[] = [];
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string;
  @Input() commentsFieldName?: string;

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
   * Example: fieldPrefix='hip_prom_', label='Flexion', side='right' => 'hip_prom_flexion_right'
   */
  getMeasurementFieldName(label: string, side: 'right' | 'left'): string {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
    return `${this.fieldPrefix}${normalizedLabel}_${side}`;
  }

  /**
   * Generate form control name for an endfeel field
   * Example: fieldPrefix='hip_prom_', label='Flexion', side='right' => 'hip_prom_flexion_right_endfeel'
   */
  getEndfeelFieldName(label: string, side: 'right' | 'left'): string {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
    return `${this.fieldPrefix}${normalizedLabel}_${side}_endfeel`;
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

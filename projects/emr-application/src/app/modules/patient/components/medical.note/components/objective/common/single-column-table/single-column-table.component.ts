import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'single-column-table',
  templateUrl: './single-column-table.component.html',
  styleUrls: ['./single-column-table.component.css']
})
export class SingleColumnTableComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() options: any[] = [];
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
   * Generate form control name for a field
   * Example: fieldPrefix='cervical_arom_', label='Forward Bending' => 'cervical_arom_forward_bending'
   */
  getFieldName(label: string): string {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '_');
    return `${this.fieldPrefix}${normalizedLabel}`;
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

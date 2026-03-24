import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { generateMeasurementFieldName, normalizeLabel } from '../form-field-utils';

export interface RowConfig {
  label: string;
  inputCount: number;   // number of text inputs per side (1 for single input rows)
  type: 'input' | 'textarea';
}

interface FieldMapping {
  label: string;
  inputCount: number;
  type: 'input' | 'textarea';
  rightFields: string[];
  leftFields: string[];
}

@Component({
  selector: 'measurement-table-rl-input-columns',
  templateUrl: './measurement-table-rl-input-columns.component.html',
  styleUrls: ['./measurement-table-rl-input-columns.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementTableRlInputColumnsComponent implements OnInit, OnDestroy {
  @Input() rows: RowConfig[] = [];
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showComments: boolean = false;
  @Input() commentsLabel: string = 'Comments';
  @Input() commentsFieldName?: string;
  @Input() initialData?: any;

  fieldMappings: FieldMapping[] = [];
  computedCommentsFieldName: string = '';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  trackByLabel(index: number, item: FieldMapping): string {
    return item.label;
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.computedCommentsFieldName = this.commentsFieldName || `${this.fieldPrefix}comments`;

    this.fieldMappings = this.rows.map(row => {
      const rightFields: string[] = [];
      const leftFields: string[] = [];

      for (let i = 0; i < row.inputCount; i++) {
        const suffix = row.inputCount > 1 ? `_${i + 1}` : '';
        if (row.label) {
          rightFields.push(generateMeasurementFieldName(this.fieldPrefix, row.label, 'right') + suffix);
          leftFields.push(generateMeasurementFieldName(this.fieldPrefix, row.label, 'left') + suffix);
        } else {
          rightFields.push(`${this.fieldPrefix}right${suffix}`);
          leftFields.push(`${this.fieldPrefix}left${suffix}`);
        }
      }

      return {
        label: row.label,
        inputCount: row.inputCount,
        type: row.type,
        rightFields,
        leftFields
      };
    });

    this.ensureFormControlsExist();
  }

  private ensureFormControlsExist(): void {
    this.fieldMappings.forEach(mapping => {
      [...mapping.rightFields, ...mapping.leftFields].forEach(field => {
        const initialValue = this.initialData?.[field] || '';
        if (!this.formGroup.get(field)) {
          this.formGroup.addControl(field, this.fb.control(initialValue));
        }
      });
    });

    if (this.showComments) {
      const initialValue = this.initialData?.[this.computedCommentsFieldName] || '';
      if (!this.formGroup.get(this.computedCommentsFieldName)) {
        this.formGroup.addControl(this.computedCommentsFieldName, this.fb.control(initialValue));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { generateMeasurementFieldName } from '../form-field-utils';
interface CheckboxOption {
  value: string;
  label: string;
}
@Component({
  selector: 'measurement-check-table',
  templateUrl: './measurement-check-table.component.html',
  styleUrls: ['./measurement-check-table.component.css']
})
export class MeasurementCheckTableComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() options: CheckboxOption[] = []; // Checkbox options for all measurement rows
  @Input() applyToAllOptions?: CheckboxOption[]; // Options for Apply to All checkboxes
  @Input() specialOptions?: { [labelName: string]: CheckboxOption[] }; // Override options for specific labels
  @Input() formGroup!: FormGroup;
  @Input() fieldPrefix: string = '';
  @Input() showApplyToAll: boolean = true;
  @Input() showComments: boolean = true;
  @Input() commentsLabel: string = 'Comments';
  @Input() applyToAllLabel: string = 'Apply to All';
  @Input() applyToAllFieldName?: string; // Optional custom apply to all field name
  @Input() commentsFieldName?: string; // Optional custom comments field name
  @Input() allowMultipleSelections: boolean = true; // Allow multiple checkboxes to be selected

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ensureFormControlsExist();
  }

  /**
   * Dynamically add form controls if they don't exist
   * For checkboxes, we store selected values as comma-separated strings
   */
  private ensureFormControlsExist(): void {
    // Add Apply to All control if needed - store as comma-separated string
    if (this.showApplyToAll) {
      const applyToAllFieldName = this.getApplyToAllFieldName();
      if (!this.formGroup.get(applyToAllFieldName)) {
        this.formGroup.addControl(applyToAllFieldName, this.fb.control(''));
      }
    }

    // Add controls for each label (right and left) - store as comma-separated strings
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
   * Get options for Apply to All checkboxes
   */
  getApplyToAllOptions(): CheckboxOption[] {
    return this.applyToAllOptions || this.options;
  }

  /**
   * Get options for a specific label
   */
  getOptionsForLabel(label: string): CheckboxOption[] {
    if (this.specialOptions && this.specialOptions[label]) {
      return this.specialOptions[label];
    }
    return this.options;
  }

  /**
   * Check if a checkbox option is selected for Apply to All
   */
  isApplyToAllOptionSelected(optionValue: string): boolean {
    const applyToAllValue = this.formGroup.get(this.getApplyToAllFieldName())?.value || '';
    const selectedValues = applyToAllValue.split(',').filter(v => v.trim());
    return selectedValues.includes(optionValue);
  }

  /**
   * Check if a checkbox option is selected for a specific label and side
   */
  isOptionSelected(label: string, side: 'right' | 'left', optionValue: string): boolean {
    const fieldName = this.getFieldName(label, side);
    const fieldValue = this.formGroup.get(fieldName)?.value || '';
    const selectedValues = fieldValue.split(',').filter(v => v.trim());
    return selectedValues.includes(optionValue);
  }

  /**
   * Toggle Apply to All checkbox selection
   */
  toggleApplyToAllOption(event: Event, optionValue: string): void {
    const checkbox = event.target as HTMLInputElement;
    const applyToAllField = this.getApplyToAllFieldName();
    const currentValue = this.formGroup.get(applyToAllField)?.value || '';
    let selectedValues = currentValue.split(',').filter(v => v.trim());
    
    if (checkbox.checked) {
      if (!selectedValues.includes(optionValue)) {
        selectedValues.push(optionValue);
      }
    } else {
      selectedValues = selectedValues.filter(v => v !== optionValue);
    }
    
    this.formGroup.get(applyToAllField)?.setValue(selectedValues.join(','));
    
    // Apply the selected options to all fields
    if (checkbox.checked) {
      this.applySelectedOptionsToAll(optionValue, true);
    } else {
      this.applySelectedOptionsToAll(optionValue, false);
    }
  }

  /**
   * Toggle checkbox selection for a specific label and side
   */
  toggleOption(event: Event, label: string, side: 'right' | 'left', optionValue: string): void {
    const checkbox = event.target as HTMLInputElement;
    const fieldName = this.getFieldName(label, side);
    const currentValue = this.formGroup.get(fieldName)?.value || '';
    let selectedValues = currentValue.split(',').filter(v => v.trim());
    
    if (checkbox.checked) {
      if (!this.allowMultipleSelections) {
        // If only single selection is allowed, clear all others
        selectedValues = [optionValue];
      } else if (!selectedValues.includes(optionValue)) {
        selectedValues.push(optionValue);
      }
    } else {
      selectedValues = selectedValues.filter(v => v !== optionValue);
    }
    
    this.formGroup.get(fieldName)?.setValue(selectedValues.join(','));
  }

  /**
   * Apply selected options to all measurement fields
   */
  private applySelectedOptionsToAll(optionValue: string, isChecked: boolean): void {
    const updates: any = {};
    
    this.labels.forEach(label => {
      const rightField = this.getFieldName(label, 'right');
      const leftField = this.getFieldName(label, 'left');
      
      // Get current values for each field
      const rightValue = this.formGroup.get(rightField)?.value || '';
      const leftValue = this.formGroup.get(leftField)?.value || '';
      
      // Update values based on checkbox state
      updates[rightField] = this.updateValueList(rightValue, optionValue, isChecked);
      updates[leftField] = this.updateValueList(leftValue, optionValue, isChecked);
    });
    
    this.formGroup.patchValue(updates, { emitEvent: false });
  }

  /**
   * Update a comma-separated value list based on checkbox state
   */
  private updateValueList(currentValue: string, optionValue: string, isChecked: boolean): string {
    let values = currentValue.split(',').filter(v => v.trim());
    
    if (isChecked) {
      if (!values.includes(optionValue)) {
        values.push(optionValue);
      }
    } else {
      values = values.filter(v => v !== optionValue);
    }
    
    return values.join(',');
  }

}

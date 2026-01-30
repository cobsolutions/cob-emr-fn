import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface CheckboxOption {
  label: string;
  value: string;
  childType: 'text' | 'textarea';
  childPlaceholder?: string;
  childRows?: number;
  checkboxOnly?: boolean;
}

@Component({
  selector: 'list-checkbox-with-child',
  templateUrl: './list-checkbox-with-child.component.html',
  styleUrls: ['./list-checkbox-with-child.component.css']
})
export class ListCheckboxWithChildComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() title: string = '';
  @Input() options: CheckboxOption[] = [];
  @Input() displayTitle: string = ''; // Optional display title, defaults to title if not provided
  @Input() extraOptions: CheckboxOption[] = [];
  @Input() extraTitle: string = '';

  prefixedOptions: {
    label: string;
    value: string;
    checkboxControlName: string;
    childControlName: string;
    childType: 'text' | 'textarea';
    childPlaceholder?: string;
    childRows?: number;
    checkboxOnly?: boolean;
  }[] = [];

  optionColumns: typeof this.prefixedOptions[] = [];
  private extraPrefixedOptions: typeof this.prefixedOptions = [];
  useMultiColumn: boolean = false;
  private subscriptions: Subscription[] = [];
  private extraSubscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    this.processMainOptions();
    this.processExtraOptions();
    this.rebuildColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['extraOptions'] && !changes['extraOptions'].firstChange && this.formGroup) {
      this.processExtraOptions();
      this.rebuildColumns();
    }
  }

  private processMainOptions(): void {
    const prefix = this.convertToPrefix(this.title);

    this.prefixedOptions = this.options.map(option => {
      const checkboxControlName = `${prefix}_${option.value}_checkbox`;
      const childControlName = `${prefix}_${option.value}_text`;

      if (!this.formGroup.contains(checkboxControlName)) {
        this.formGroup.addControl(checkboxControlName, new FormControl(false));
      }

      if (!option.checkboxOnly) {
        if (!this.formGroup.contains(childControlName)) {
          this.formGroup.addControl(childControlName, new FormControl(''));
        }

        const checkboxControl = this.formGroup.get(checkboxControlName);
        const childControl = this.formGroup.get(childControlName);

        if (checkboxControl && childControl) {
          const subscription = checkboxControl.valueChanges.subscribe(isChecked => {
            if (!isChecked) {
              childControl.setValue('');
            }
          });
          this.subscriptions.push(subscription);
        }
      }

      return {
        label: option.label,
        value: option.value,
        checkboxControlName,
        childControlName,
        childType: option.childType,
        childPlaceholder: option.childPlaceholder,
        childRows: option.childRows || 3,
        checkboxOnly: option.checkboxOnly
      };
    });
  }

  private processExtraOptions(): void {
    this.extraSubscriptions.forEach(sub => sub.unsubscribe());
    this.extraSubscriptions = [];

    if (!this.extraOptions || this.extraOptions.length === 0) {
      this.extraPrefixedOptions = [];
      return;
    }

    const prefix = this.convertToPrefix(this.extraTitle || 'extra');

    this.extraPrefixedOptions = this.extraOptions.map(option => {
      const checkboxControlName = `${prefix}_${option.value}_checkbox`;
      const childControlName = `${prefix}_${option.value}_text`;

      if (!this.formGroup.contains(checkboxControlName)) {
        this.formGroup.addControl(checkboxControlName, new FormControl(false));
      }

      if (!option.checkboxOnly) {
        if (!this.formGroup.contains(childControlName)) {
          this.formGroup.addControl(childControlName, new FormControl(''));
        }

        const checkboxControl = this.formGroup.get(checkboxControlName);
        const childControl = this.formGroup.get(childControlName);

        if (checkboxControl && childControl) {
          const subscription = checkboxControl.valueChanges.subscribe(isChecked => {
            if (!isChecked) {
              childControl.setValue('');
            }
          });
          this.extraSubscriptions.push(subscription);
        }
      }

      return {
        label: option.label,
        value: option.value,
        checkboxControlName,
        childControlName,
        childType: option.childType,
        childPlaceholder: option.childPlaceholder,
        childRows: option.childRows || 3,
        checkboxOnly: option.checkboxOnly
      };
    });
  }

  private rebuildColumns(): void {
    if (this.prefixedOptions.length > 10) {
      this.splitIntoColumns();
    } else {
      this.optionColumns = [this.prefixedOptions];
    }

    // Append extra options as an additional column
    if (this.extraPrefixedOptions.length > 0) {
      this.optionColumns.push(this.extraPrefixedOptions);
    }

    this.useMultiColumn = this.optionColumns.length > 1;
  }

  private splitIntoColumns(): void {
    const totalOptions = this.prefixedOptions.length;
    const numColumns = Math.ceil(totalOptions / 10);
    const optionsPerColumn = Math.ceil(totalOptions / numColumns);

    this.optionColumns = [];
    for (let i = 0; i < totalOptions; i += optionsPerColumn) {
      this.optionColumns.push(this.prefixedOptions.slice(i, i + optionsPerColumn));
    }
  }

  // Convert title to lowercase with underscores
  private convertToPrefix(title: string): string {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  // Check if checkbox is checked to show/hide child input
  isCheckboxChecked(controlName: string): boolean {
    return this.formGroup.get(controlName)?.value === true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.extraSubscriptions.forEach(sub => sub.unsubscribe());
  }

}

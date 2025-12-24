import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface CheckboxOption {
  label: string;
  value: string;
  childType: 'text' | 'textarea';
  childPlaceholder?: string;
  childRows?: number;
}

@Component({
  selector: 'list-checkbox-with-child',
  templateUrl: './list-checkbox-with-child.component.html',
  styleUrls: ['./list-checkbox-with-child.component.css']
})
export class ListCheckboxWithChildComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() title: string = '';
  @Input() options: CheckboxOption[] = [];
  @Input() displayTitle: string = ''; // Optional display title, defaults to title if not provided

  prefixedOptions: {
    label: string;
    value: string;
    checkboxControlName: string;
    childControlName: string;
    childType: 'text' | 'textarea';
    childPlaceholder?: string;
    childRows?: number;
  }[] = [];

  optionColumns: typeof this.prefixedOptions[] = [];
  useMultiColumn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const prefix = this.convertToPrefix(this.title);

    this.prefixedOptions = this.options.map(option => {
      const checkboxControlName = `${prefix}_${option.value}_checkbox`;
      const childControlName = `${prefix}_${option.value}_text`;

      // Add form controls if they don't exist
      if (!this.formGroup.contains(checkboxControlName)) {
        this.formGroup.addControl(checkboxControlName, new FormControl(false));
      }
      if (!this.formGroup.contains(childControlName)) {
        this.formGroup.addControl(childControlName, new FormControl(''));
      }

      return {
        label: option.label,
        value: option.value,
        checkboxControlName,
        childControlName,
        childType: option.childType,
        childPlaceholder: option.childPlaceholder,
        childRows: option.childRows || 3
      };
    });

    // Split into columns if more than 10 options
    if (this.prefixedOptions.length > 10) {
      this.useMultiColumn = true;
      this.splitIntoColumns();
    } else {
      this.useMultiColumn = false;
      this.optionColumns = [this.prefixedOptions];
    }
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

}

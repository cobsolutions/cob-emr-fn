import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HierarchyCheckboxOption } from '../interface/hierarchy-checkbox-option';

@Component({
  selector: 'app-plan-hierarchy-checkbox-list',
  templateUrl: './plan-hierarchy-checkbox-list.component.html',
  styleUrls: ['./plan-hierarchy-checkbox-list.component.css']
})
export class PlanHierarchyCheckboxListComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() prefix!: string;
  @Input() options: HierarchyCheckboxOption[] = [];
  @Input() initialData: any = null;

  constructor() { }

  ngOnInit(): void {
    this.createFormControls();
    this.setupValueChangeListeners();
    this.populateFormWithData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && changes['initialData'].currentValue && this.formGroup) {
      this.populateFormWithData();
    }
  }

  createFormControls(): void {
    this.options.forEach(option => {
      this.createControlsForOption(option, 0);
    });
  }

  private createControlsForOption(option: HierarchyCheckboxOption, depth: number): void {
    // Create checkbox control
    if (!this.formGroup.contains(option.formControlName)) {
      const initialValue = option.childType === 'select' ? '' : false;
      this.formGroup.addControl(option.formControlName, new FormControl(initialValue));
    }

    // Create notes textarea control only for top-level options
    if (depth === 0) {
      const notesControlName = option.formControlName + '_notes';
      if (!this.formGroup.contains(notesControlName)) {
        this.formGroup.addControl(notesControlName, new FormControl(''));
      }
    }

    // Recursively create child controls if they exist
    if (option.children) {
      option.children.forEach(child => {
        this.createControlsForOption(child, depth + 1);
      });
    }
  }

  setupValueChangeListeners(): void {
    this.options.forEach(option => {
      this.setupListenerForOption(option);
    });
  }

  private setupListenerForOption(option: HierarchyCheckboxOption): void {
    this.formGroup.get(option.formControlName)?.valueChanges.subscribe(checked => {
      option.showChildren = checked;

      if (!checked) {
        // Recursively clear all child controls
        this.clearChildControls(option);
        // Always clear notes textarea
        this.formGroup.get(option.formControlName + '_notes')?.setValue('');
      }
    });

    // Recursively set up listeners for children that have their own children
    if (option.children) {
      option.children.forEach(child => {
        if (child.children && child.children.length > 0) {
          this.setupListenerForOption(child);
        }
      });
    }
  }

  private clearChildControls(option: HierarchyCheckboxOption): void {
    if (option.children) {
      option.children.forEach(child => {
        // Clear checkbox (set to false) or select (set to empty string)
        const clearValue = child.childType === 'select' ? '' : false;
        this.formGroup.get(child.formControlName)?.setValue(clearValue, { emitEvent: false });
        child.showChildren = false;
        // Recursively clear grandchildren
        this.clearChildControls(child);
      });
    }
  }

  populateFormWithData(): void {
    if (!this.initialData || !this.formGroup) {
      return;
    }

    // Patch the form with initial data without emitting events to prevent listener interference
    this.formGroup.patchValue(this.initialData, { emitEvent: false });

    // Update showChildren based on checkbox values recursively
    this.options.forEach(option => {
      this.updateShowChildrenRecursively(option);
    });
  }

  private updateShowChildrenRecursively(option: HierarchyCheckboxOption): void {
    const value = this.formGroup.get(option.formControlName)?.value;
    if (value === true) {
      option.showChildren = true;
    }

    // Recursively update children
    if (option.children) {
      option.children.forEach(child => {
        this.updateShowChildrenRecursively(child);
      });
    }
  }

  // Method to check if children should be shown - uses form value directly
  isChecked(option: HierarchyCheckboxOption): boolean {
    return this.formGroup.get(option.formControlName)?.value === true;
  }

  // Toggle checkbox when clicking the label text
  toggleCheckbox(option: HierarchyCheckboxOption): void {
    const control = this.formGroup.get(option.formControlName);
    if (control) {
      control.setValue(!control.value);
    }
  }

}

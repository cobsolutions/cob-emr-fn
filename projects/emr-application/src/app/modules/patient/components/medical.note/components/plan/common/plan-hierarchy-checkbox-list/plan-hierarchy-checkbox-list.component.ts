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
      // Create parent checkbox control
      if (!this.formGroup.contains(option.formControlName)) {
        this.formGroup.addControl(option.formControlName, new FormControl(false));
      }

      // Create notes textarea control
      const notesControlName = option.formControlName + '_notes';
      if (!this.formGroup.contains(notesControlName)) {
        this.formGroup.addControl(notesControlName, new FormControl(''));
      }

      // Create child controls if they exist
      if (option.children) {
        option.children.forEach(child => {
          if (!this.formGroup.contains(child.formControlName)) {
            // Initialize checkbox as false, select as empty string
            const initialValue = child.childType === 'select' ? '' : false;
            this.formGroup.addControl(child.formControlName, new FormControl(initialValue));
          }
        });
      }
    });
  }

  setupValueChangeListeners(): void {
    this.options.forEach(option => {
      this.formGroup.get(option.formControlName)?.valueChanges.subscribe(checked => {
        option.showChildren = checked;

        if (!checked) {
          // Clear child controls if they exist
          if (option.children) {
            option.children.forEach(child => {
              // Clear checkbox (set to false) or select (set to empty string)
              const clearValue = child.childType === 'select' ? '' : false;
              this.formGroup.get(child.formControlName)?.setValue(clearValue);
            });
          }
          // Always clear notes textarea
          this.formGroup.get(option.formControlName + '_notes')?.setValue('');
        }
      });
    });
  }

  populateFormWithData(): void {
    if (!this.initialData || !this.formGroup) {
      return;
    }

    // Patch the form with initial data
    this.formGroup.patchValue(this.initialData);

    // Update showChildren based on checkbox values
    this.options.forEach(option => {
      const value = this.formGroup.get(option.formControlName)?.value;
      if (value === true) {
        option.showChildren = true;
      }
    });
  }

}

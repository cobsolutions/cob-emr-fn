import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HierarchyCheckboxOption } from '../interface/hierarchy-checkbox-option';

@Component({
  selector: 'app-plan-hierarchy-checkbox-list',
  templateUrl: './plan-hierarchy-checkbox-list.component.html',
  styleUrls: ['./plan-hierarchy-checkbox-list.component.css']
})
export class PlanHierarchyCheckboxListComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() prefix!: string;
  @Input() options: HierarchyCheckboxOption[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setupValueChangeListeners();
  }

  setupValueChangeListeners() {
    this.options.forEach(option => {
      this.formGroup.get(option.formControlName)?.valueChanges.subscribe(checked => {
        option.showChildren = checked;

        if (!checked) {
          // Clear child checkboxes if they exist
          if (option.children) {
            option.children.forEach(child => {
              this.formGroup.get(child.formControlName)?.setValue(false);
            });
          }
          // Always clear notes textarea
          this.formGroup.get(option.formControlName + '_notes')?.setValue('');
        }
      });
    });
  }

}

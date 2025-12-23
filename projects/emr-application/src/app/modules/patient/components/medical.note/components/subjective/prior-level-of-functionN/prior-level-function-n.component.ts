import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckboxHierarchy } from '../common/hierarchy-checkbox/interface/checkbox-hierarchy';

@Component({
  selector: 'subjective-prior-level-function-n',
  templateUrl: './prior-level-function-n.component.html',
  styleUrls: ['./prior-level-function-n.component.css']
})
export class PriorLevelFunctionNComponent implements OnInit {
  onSelectionChange(data: CheckboxHierarchy[]): void {
    console.log('Selected items:', data);
    // Handle selection changes here
  }
  checkboxData: CheckboxHierarchy[] = [
    {
      title: 'Self Care',
      collapsed: true, // Expanded by default since not checked
      items: [
        {
          id: 'self-care-1',
          label: 'Hygiene',
          checked: false,
          indeterminate: false,
          collapsed: true, // Collapsed by default
          children: [
            {
              id: 'hygiene-1',
              label: 'Grooming',
              checked: false,
              indeterminate: false,
              collapsed: true
            },
            // ... other children
          ]
        },
        // ... other items
      ]
    },
    // ... other categories with collapsed: false
  ];
  priorLevelFunctionForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.priorLevelFunctionForm);
  }
  initForm() {
    this.priorLevelFunctionForm = this.fb.group({})
  }
  setupValueChangeListeners() {
    throw new Error('Method not implemented.');
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'right-left-check',
  templateUrl: './right-left-check.component.html',
  styleUrls: ['./right-left-check.component.css']
})
export class RightLeftCheckComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentFieldName!: string;
  form!: FormGroup;

  @Input() controlR: any[] = [];
  @Input() controlL: any[] = [];

  @Input() rightLabel: string = 'Right';
  @Input() leftLabel: string = 'Left';
  @Input() showLabel: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});

    // Initialize Right controls
    if (this.controlR?.length > 0) {
      this.controlR.forEach(control => {
        const key = this.getControlName('right', control.label);
        this.form.addControl(key, new FormControl([]));
        this.handleValueChanges(key);
      });
    }

    // Initialize Left controls
    if (this.controlL?.length > 0) {
      this.controlL.forEach(control => {
        const key = this.getControlName('left', control.label);
        this.form.addControl(key, new FormControl([]));
        this.handleValueChanges(key);
      });
    }

    // Patch parent form values if exist
    setTimeout(() => {
      const existing = this.parentForm.get(this.parentFieldName)?.value;
      if (existing) {
        this.form.patchValue(existing);
      }
    }, 10);
  }

  /** Converts label into camelCase */
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (_, group1) => group1.toUpperCase());
  }

  /** Returns standardized control name */
  getControlName(side: 'right' | 'left', label: string): string {
    return `${side}_${this.toCamelCase(label)}_${this.parentFieldName}`;
  }

  /** Toggle checkbox value internally */
  toggleCheckbox(controlName: string, value: string): void {
    const control = this.form.get(controlName);
    const arr = control?.value || [];
    if (arr.includes(value)) {
      control?.setValue(arr.filter((v: string) => v !== value));
    } else {
      control?.setValue([...arr, value]);
    }
  }

  /** Sync internal form to parent */
  private handleValueChanges(controlName: string): void {
    const sub = this.form.get(controlName)?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    if (sub) this.subscriptions.push(sub);
  }
}

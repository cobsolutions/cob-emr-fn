import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rom-test-right-left',
  templateUrl: './rom-test.component.html',
  styleUrls: ['./rom-test.component.css']
})
export class RomTestComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  /*
    @Input() controlR: any[]
    @Input() controlL: any[]
    [
      {
        "label":"control label",
        ""value:[
          {
            "val":"val",
            "view":"view"
        }
        ]
      }
    ]
  */
  @Input() controlR: any[]
  @Input() controlL: any[]
  @Input() columns: number;
  @Input() rightLabel: string
  @Input() leftLabel: string
  @Input() testStyle: string;
  private subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    if (this.columns === 1) {
      this.controlR.forEach(control => {
        const controlName = `right_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(controlName, new FormControl(control.value[0].val));

        this.handleValueChanges(controlName);
      });
    }

    if (this.columns === 2) {
      this.controlR.forEach(control => {
        const controlName = `right_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(controlName, new FormControl(control.value[0].val));
        this.handleValueChanges(controlName);
      });

      this.controlL.forEach(control => {
        const controlName = `left_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(controlName, new FormControl(control.value[0].val));
        this.handleValueChanges(controlName);
      });
    }
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  private handleValueChanges(controlName: string) {
    const sub = this.form.get(controlName).valueChanges.subscribe(value => {
      const customControlName = `${controlName}_custom`;
  
      if (value === 'Custom' && !this.form.get(customControlName)) {
        // ✅ Add the input FormControl
        this.form.addControl(customControlName, new FormControl(''));
  
        // ✅ Subscribe to its changes as well
        const customSub = this.form.get(customControlName).valueChanges.subscribe(customValue => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
        this.subscriptions.push(customSub);
      }
  
      // ✅ If changed to non-custom value, remove control
      if (value !== 'Custom' && this.form.get(customControlName)) {
        this.form.removeControl(customControlName);
      }
  
      // ✅ Always sync parent form
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
  
    this.subscriptions.push(sub);
  }
  
  applyToAll(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (!value) return;

    const updatedValues = { ...this.form.getRawValue() };

    Object.keys(updatedValues).forEach((key) => {
      this.form.get(key).setValue(value, { emitEvent: false });
    });

    // Update parent form after all changes
    this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
  }
}

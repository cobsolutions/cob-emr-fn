import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  @Input() testStyle: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    const controls = this.columns === 1 ? this.controlR : this.controlL;
  
    controls.forEach(control => {
      const side = this.columns === 1 ? 'right' : 'left';
      const controlName = `${side}_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
      const defaultVal = control.value?.[0]?.val ?? ''; // fallback to empty if not present
      this.form.addControl(controlName, new FormControl(defaultVal));
  
      this.form.get(controlName).valueChanges.subscribe(val => {
        this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
      });
    });
  
    // Sync form initially
    this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
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

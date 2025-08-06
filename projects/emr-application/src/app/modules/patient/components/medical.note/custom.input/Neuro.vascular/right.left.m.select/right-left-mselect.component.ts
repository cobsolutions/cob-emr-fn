import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'right-left-mselect',
  templateUrl: './right-left-mselect.component.html',
  styleUrls: ['./right-left-mselect.component.css']
})
export class RightLeftMSelectComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() topControls: any[] = [];
  @Input() controlR: any[] = [];
  @Input() controlL: any[] = [];

  @Input() columns: number = 2;
  @Input() rightLabel: string = 'Right';
  @Input() leftLabel: string = 'Left';
  @Input() showLabel: boolean = true;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.showLabel === undefined)
      this.showLabel = true
    if (this.topControls !== undefined)
      this.topControls.forEach(control => {
        const key = `top_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control.value[0].val));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });

    // Right controls
    if (this.controlR.length > 0)
      this.controlR.forEach(control => {
        const key = `right_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control?.value[0].val));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });

    // Left controls
    if (this.controlL.length > 0)
      this.controlL.forEach(control => {
        const key = `left_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control?.value[0].val));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  getControlName(side: 'right' | 'left' | 'top', label: string): string {
    return `${side}_${this.toCamelCase(label)}_${this.parentFieldName}`;
  }

}

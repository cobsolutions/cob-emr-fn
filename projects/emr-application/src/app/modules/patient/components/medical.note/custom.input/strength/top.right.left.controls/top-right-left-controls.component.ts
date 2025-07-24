import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'top-right-left-controls',
  templateUrl: './top-right-left-controls.component.html',
  styleUrls: ['./top-right-left-controls.component.css']
})
export class TopRightLeftControlsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() topControls: any[] = [];
  @Input() controlR: any[] = [];
  @Input() controlL: any[] = [];

  @Input() columns: number = 2;
  @Input() rightLabel: string = 'Right';
  @Input() leftLabel: string = 'Left';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.topControls !== undefined )
      this.topControls.forEach(control => {
        const key = `top_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control.value[0].val));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });
    
      this.controlR.forEach(control => {
        const key = `right_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control.type === 'select' ? this.controlR[0].value[0].val: null));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });
  
      // Left controls
      this.controlL.forEach(control => {
        const key = `left_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control.type === 'select' ? this.controlR[0].value[0].val: null));
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

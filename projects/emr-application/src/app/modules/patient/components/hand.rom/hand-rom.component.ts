import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hand-rom',
  templateUrl: './hand-rom.component.html',
  styleUrls: ['./hand-rom.component.css']
})
export class HandROMComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() controlR1: any[]
  @Input() controlR2: any[]

  @Input() controlL1: any[]
  @Input() controlL2: any[]

  @Input() rightLabel: string
  @Input() leftLabel: string
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.controlR1.forEach(control => {
      this.form.addControl(`right1_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`, new FormControl(control.type === 'select' ? this.controlR1[0].value[0].val: null));
      this.form.get(`right1_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    })

    this.controlR2.forEach(control => {
      this.form.addControl(`right2_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`, new FormControl(control.type === 'select' ? this.controlR2[0].value[0].val: null));
      this.form.get(`right2_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    })

    this.controlL1.forEach(control => {
      this.form.addControl(`left1_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`, new FormControl(control.type === 'select' ? this.controlL1[0].value[0].val: null));
      this.form.get(`left1_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    });
    this.controlL2.forEach(control => {
      this.form.addControl(`left2_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`, new FormControl(control.type === 'select' ? this.controlL2[0].value[0].val: null));
      this.form.get(`left2_${this.toCamelCase(control.label) + "_" + this.parentFieldName}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    });
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  getOptions(source: any[], label: string): any[] {
    return source.find(x => x.label === label)?.value || [];
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

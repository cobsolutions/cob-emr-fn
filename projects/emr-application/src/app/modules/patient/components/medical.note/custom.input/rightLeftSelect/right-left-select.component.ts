import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'right-left-select',
  templateUrl: './right-left-select.component.html',
  styleUrls: ['./right-left-select.component.css']
})
export class RightLeftSelectComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() labels:string[]
  @Input() content:any[];
  @Input() testStyle: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.labels.forEach(label => {
      this.form.addControl(`right_${this.toCamelCase(label)}`, new FormControl(this.content[0].val));
      this.form.addControl(`left_${this.toCamelCase(label)}`, new FormControl(this.content[0].val));

      this.form.get(`right_${this.toCamelCase(label)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
      this.form.get(`left_${this.toCamelCase(label)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    });
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }

}

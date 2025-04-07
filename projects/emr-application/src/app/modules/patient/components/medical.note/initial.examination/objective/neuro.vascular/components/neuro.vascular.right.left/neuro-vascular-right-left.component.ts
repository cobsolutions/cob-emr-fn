import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface SelectValue {
  view: string,
  val: string
}
@Component({
  selector: 'neuro-vascular-right-left',
  templateUrl: './neuro-vascular-right-left.component.html',
  styleUrls: ['./neuro-vascular-right-left.component.css']
})
export class NeuroVascularRightLeftComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string;
  @Input() topSelect: string[];
  @Input() bodySelect: string[];
  @Input() selectValues: SelectValue[]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    if (this.topSelect)
      this.topSelect.forEach(field => {
        this.form.addControl(`${this.toCamelCase(field)}`, new FormControl(this.selectValues[0].val));
        this.form.get(`${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.value);
        })
      })

    if (this.bodySelect)
      this.bodySelect.forEach(field => {
        this.form.addControl(`right_${this.toCamelCase(field)}`, new FormControl(this.selectValues[0].val));
        this.form.addControl(`left_${this.toCamelCase(field)}`, new FormControl(this.selectValues[0].val));

        this.form.get(`right_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.value);
        })
        this.form.get(`left_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.value);
        })
      });
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

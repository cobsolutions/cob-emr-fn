import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
interface SelectValue {
  view: string,
  val: string
}
@Component({
  selector: 'app-gross-muscle-test',
  templateUrl: './gross-muscle-test.component.html',
  styleUrls: ['./gross-muscle-test.component.css']
})
export class GrossMuscleTestComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  selectValues: SelectValue[] = [
    { "view": "Good", "val": "good" }, { "view": "Fair", "val": "fair" }, { "view": "Poor", "val": "poor" }]
  @Input() topSelect: string[];
  @Input() bodySelect: string[]
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

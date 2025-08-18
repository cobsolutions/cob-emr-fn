import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'multiple-text-input',
  templateUrl: './multiple-text-input.component.html',
  styleUrls: ['./multiple-text-input.component.css']
})
export class MultipleTextInputComponent implements OnInit {
  form: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() values: any
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.values.forEach(field => {
      this.form.addControl(`right_${this.toCamelCase(field)}`, new FormControl(''));
      this.form.addControl(`left_${this.toCamelCase(field)}`, new FormControl(''));
    });
    this.ddd();
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  private ddd() {
    this.values.forEach(field => {
      this.form.get(`right_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
      this.form.get(`left_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    })
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }

}

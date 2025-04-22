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
  measurementFields = ['Upper Arm', 'Mid Biceps', 'Elbow Flexion Crease', 'Forearm', 'Wrist'];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.measurementFields.forEach(field => {
      this.form.addControl(`right_${this.toCamelCase(field)}`, new FormControl(''));
      this.form.addControl(`left_${this.toCamelCase(field)}`, new FormControl(''));
    });
    this.ddd();
    setTimeout(() => {
      console.log(this.parentFieldName)
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  private ddd() {
    this.measurementFields.forEach(field => {
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

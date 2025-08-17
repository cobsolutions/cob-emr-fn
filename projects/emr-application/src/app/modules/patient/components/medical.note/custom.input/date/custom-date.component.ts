import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'custom-date',
  templateUrl: './custom-date.component.html',
  styleUrls: ['./custom-date.component.css']
})
export class CustomDateComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() label: string
  @Input() labelStyle: string;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days: number[] = [];
  years: number[] = [];

  selectedMonth: string = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      month: [''],
      day: [''],
      year: ['']
    });
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    this.form.get('month').valueChanges.subscribe(v => {
      this.parentForm.get(this.parentFieldName).setValue(this.getAllFormValues(this.form));
    })
    this.form.get('day').valueChanges.subscribe(v => {
      this.parentForm.get(this.parentFieldName).setValue(this.getAllFormValues(this.form));
    })
    this.form.get('year').valueChanges.subscribe(v => {
      this.parentForm.get(this.parentFieldName).setValue(this.getAllFormValues(this.form));
    })
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control); // Recursively get values from nested FormGroup
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }
}

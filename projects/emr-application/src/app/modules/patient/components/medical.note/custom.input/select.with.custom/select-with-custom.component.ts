import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'select-with-custom',
  templateUrl: './select-with-custom.component.html',
  styleUrls: ['./select-with-custom.component.css']
})
export class SelectWithCustomComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() values: any
  @Input() style: any
  form: FormGroup;
  hasCustom: boolean = false;
  customFieldName: string
  selectFieldName: string
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    // Add the main select control
    this.form = this.fb.group({});
    this.customFieldName = `${this.parentFieldName}_custom`;
    this.selectFieldName = `${this.parentFieldName}_select`;
    this.form.addControl(this.selectFieldName, new FormControl(null));
    this.form.addControl(this.customFieldName, new FormControl(''));

    // Watch for select changes
    this.form.get(this.selectFieldName)!.valueChanges.subscribe((value) => {
      console.log(value)
      if (value === 'Custom')
        this.hasCustom = true
      else
        this.hasCustom = false
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get(this.customFieldName)!.valueChanges.subscribe((value) => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    })
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  ngOnDestroy(): void {

  }
}

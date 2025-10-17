import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mutliple-check-box',
  templateUrl: './mutliple-check-box.component.html',
  styleUrls: ['./mutliple-check-box.component.css']
})
export class MutlipleCheckBoxComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() values: any
  @Input() label: string
  @Input() splitColumn: number
  @Input() labelStyle: string;
  @Input() style: string;
  @Input() checkBoxStyle: string;
  @Input() contorl_style: string
  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    // Initialize checkboxes with FormControls
    this.form = this.fb.group({});
    this.values.forEach(value => {
      this.form.addControl(value.val, this.fb.control(false));
      this.form.get(`${value.val}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
      if (value.dependencies !== undefined)
        value.dependencies.forEach(dep => {
          if (dep.fieldType === 'checkbox')
            this.form.addControl(dep.fieldFormName, this.fb.control(false));
          else
            this.form.addControl(dep.fieldFormName, this.fb.control(''));
          this.form.get(`${dep.fieldFormName}`).valueChanges.subscribe(v => {
            this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
          })
        })
    });
    if (Array.isArray(this.values)) {
      const naControl = this.values.find((item: any) => item?.val === 'na');
      if (!naControl) return;

      const naFormControl = this.form.get(naControl.val);
      if (!naFormControl) return;
      // --- Case 1: If "N/A" is selected, uncheck all others ---
      naFormControl.valueChanges.subscribe((v: boolean) => {
        if (v) {
          console.log('na is selected');

          this.values.forEach((item: any) => {
            if (item.val !== 'na') {
              const control = this.form.get(item.val);
              if (control) {
                control.setValue(false, { emitEvent: false });
              }
            }
          });
        }
      });
      // --- Case 2: If any other is selected, uncheck "N/A" ---
      this.values.forEach((item: any) => {
        if (item.val !== 'na') {
          const control = this.form.get(item.val);
          if (control) {
            control.valueChanges.subscribe((v: boolean) => {
              if (v && naFormControl.value) {
                naFormControl.setValue(false, { emitEvent: false });
              }
            });
          }
        }
      });
    }


    if (this.labelStyle === null || this.labelStyle === undefined) {
      this.labelStyle = "display: flex;align-items: center;gap: 10px;margin-bottom: 1px;margin-left: 400px;max-width:500px;"
    }
    if (this.checkBoxStyle == null || this.checkBoxStyle === undefined)
      this.checkBoxStyle = 'margin-left: 510px;'

    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toggleAdditionalControl(conditionKey: string) {
    const isChecked = this.form.get(conditionKey)?.value;
    if (!isChecked) {
      this.form.get(conditionKey)?.reset();
    }
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

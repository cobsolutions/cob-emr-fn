import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'multiple-columns-checkbox',
  templateUrl: './multiple-columns-checkbox.component.html',
  styleUrls: ['./multiple-columns-checkbox.component.css']
})
export class MultipleColumnsCheckboxComponent implements OnInit {
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
  leftColumnValues: any[] = [];
  rightColumnValues: any[] = [];
  conditionColumnValues: any = []
  showConditionColumn = false;
  constructor(private fb: FormBuilder) {
  }

  private observeConditionControl() {
    this.parentForm.get('pelvicFloorMedicalHistory').valueChanges.subscribe(val => {
      if (val === 'yes') {
        this.addConditionControls();
        this.showConditionColumn = true;
      }
      if (val === 'no') {
        this.removeConditionControls();
        this.showConditionColumn = false;
      }
    })
    if (this.parentForm.get('pelvicFloorMedicalHistory')?.value === 'yes') {
      this.addConditionControls();
      this.showConditionColumn = true;
    }
    if (this.parentForm.get('pelvicFloorMedicalHistory')?.value === 'no') {
      this.removeConditionControls();
      this.showConditionColumn = false;
    }
  }
  addConditionControls() {
    this.conditionColumnValues.forEach(val => {
      if (!this.form.contains(val.val)) {
        this.form.addControl(val.val, this.fb.control(false));

        // Add dependency controls if exist
        val.dependencies?.forEach(dep => {
          if (!this.form.contains(dep.fieldFormName)) {
            this.form.addControl(dep.fieldFormName, this.fb.control(''));
          }
        });
      }
    });
  }
  removeConditionControls() {
    this.conditionColumnValues.forEach(val => {
      if (this.form.contains(val.val)) {
        this.form.removeControl(val.val);

        // Remove dependency controls too
        val.dependencies?.forEach(dep => {
          if (this.form.contains(dep.fieldFormName)) {
            this.form.removeControl(dep.fieldFormName);
          }
        });
      }
    });
  }
  ngOnInit() {
    // Initialize checkboxes with FormControls
    this.form = this.fb.group({});
    this.leftColumnValues = this.values.filter(v => v.columnNum === 1);
    this.rightColumnValues = this.values.filter(v => v.columnNum === 2);
    this.conditionColumnValues = this.values.filter(v => v.columnNum === 3);
    this.observeConditionControl();
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

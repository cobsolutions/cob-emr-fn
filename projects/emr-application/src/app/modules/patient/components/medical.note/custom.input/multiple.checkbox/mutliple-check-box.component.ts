import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mutliple-check-box',
  templateUrl: './mutliple-check-box.component.html',
  styleUrls: ['./mutliple-check-box.component.css']
})
export class MutlipleCheckBoxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() values: any
  @Input() label: string
  @Input() splitColumn: number
  @Input() labelStyle: string;
  @Input() checkBoxStyle: string;
  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    // Initialize checkboxes with FormControls
    this.values.forEach(value => {
      this.form.addControl(value.val, this.fb.control(false));
      if (value.dependencies !== undefined)
        value.dependencies.forEach(dep => {
          this.form.addControl(dep.fieldFormName, this.fb.control(''));
        })
    });
    if (this.labelStyle === null || this.labelStyle === undefined) {
      this.labelStyle = "display: flex;align-items: center;gap: 10px;margin-bottom: 1px;margin-left: 400px;max-width:500px;"
    }
    if(this.checkBoxStyle == null || this.checkBoxStyle === undefined)
    this.checkBoxStyle = 'margin-left: 510px;'
  }
  toggleAdditionalControl(conditionKey: string) {
    const isChecked = this.form.get(conditionKey)?.value;
    if (!isChecked) {
      this.form.get(conditionKey)?.reset();
    }
  }
}

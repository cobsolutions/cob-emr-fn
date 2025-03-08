import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'mutliple-check-box',
  templateUrl: './mutliple-check-box.component.html',
  styleUrls: ['./mutliple-check-box.component.css']
})
export class MutlipleCheckBoxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() values:any
  @Input() label:string
  @Input() splitColumn:number
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
  }
  toggleAdditionalControl(conditionKey: string) {
    const isChecked = this.form.get(conditionKey)?.value;
    if (!isChecked) {
      this.form.get(conditionKey)?.reset();
    }
  }
}

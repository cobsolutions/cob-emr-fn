import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldControlStyles } from '../filed.control.style.selector/field.control.style';

@Component({
  selector: 'soap-field-builder',
  templateUrl: './soap-field-builder.component.html',
  styleUrls: ['./soap-field-builder.component.css']
})
export class SoapFieldBuilderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: any
  @Input() filedStyle: FieldControlStyles
  @Input() styles: FieldControlStyles[]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildField(this.field);
  }

  private buildField(field: any) {
    this.form.addControl(field.name, this.fb.control((field.selectValue !== undefined || field.selectValue !== null) ? field.selectValue : null));
    if (field.dependents.length > 0) {
      this.form?.get(field.name)?.valueChanges.subscribe(value => {
        if (Array.isArray(field.idField.valueChange)) {
          this.renderDependentsPerChangeValue(field, value)
        }
        else {
          this.renderDependents(field, value)
        }
      })
      field.dependents.forEach(dependent => this.buildField(dependent))
    }
    return;
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }

  private renderDependents(field: any, value: any) {
    if (value + '' === field.idField.valueChange) {
      field.dependents.forEach(dependent => {
        dependent.render = true;
        this.form.addControl(dependent.name, this.fb.control((field.selectValue !== undefined || field.selectValue !== null) ? field.selectValue : null))
      });
    } else {
      field.dependents.forEach(dependent => {
        dependent.render = false;
        this.form.removeControl(dependent.name)
      });
    }
  }
  private renderDependentsPerChangeValue(field: any, value: any) {
    const matchSelectDependents = field.dependents.filter(item => item.changeValueSelect === value);
    matchSelectDependents.forEach(dependent => {
      dependent.render = true;
      this.form.addControl(dependent.name, this.fb.control((field.selectValue !== undefined || field.selectValue !== null) ? field.selectValue : null))
    });
    const notMatchSelect = field.dependents.filter(item => item.changeValueSelect !== value);
    notMatchSelect.forEach(dependent => {
      dependent.render = false;
      this.form.removeControl(dependent.name)
    });
  }
}

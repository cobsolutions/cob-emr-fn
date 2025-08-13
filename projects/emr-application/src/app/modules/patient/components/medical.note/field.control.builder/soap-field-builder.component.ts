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
  @Input() soapModule:string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('module ' + this.soapModule)
    this.buildField(this.field);
  }

  private buildField(field: any) {
    this.form.addControl(field.name, this.fb.control((field.selectValue !== undefined || field.selectValue !== null) ? field.selectValue : null));
    if (field.dependents !== undefined && field.dependents.length > 0) {
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
    if (value === this.parseBoolean(field.idField.valueChange)) {
      field.dependents.forEach(dependent => {
        dependent.render = true;
        this.form.addControl(dependent.name, this.fb.control((dependent.selectValue !== undefined || dependent.selectValue !== null) ? dependent.selectValue : null))
      });
    } else {
      field.dependents.forEach(dependent => {
        dependent.render = false;
        this.form.removeControl(dependent.name)
      });
    }
  }
  parseBoolean(value: string): boolean | string {
    if (value === "true") return true;
    if (value === "false") return false;
    return value; // Return the original string if it's not "true" or "false"
  }
  private renderDependentsPerChangeValue(field: any, value: any) {
    const matchSelectDependents = field.dependents.filter(item => item.changeValueSelect === value);
    matchSelectDependents.forEach(dependent => {
      dependent.render = true;
      this.form.addControl(dependent.name, this.fb.control((dependent.selectValue !== undefined || dependent.selectValue !== null) ? dependent.selectValue : null))
    });
    const notMatchSelect = field.dependents.filter(item => item.changeValueSelect !== value);
    notMatchSelect.forEach(dependent => {
      dependent.render = false;
      this.form.removeControl(dependent.name)
    });
  }
}

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  @Input() soapModule: string;
  @Input() data: any
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buildField(this.field);
    this.loadIsAllData();
  }

  private buildField(field: any) {

    this.form.addControl(field.name, this.fb.control((field.selectValue !== undefined || field.selectValue !== null) ? field.selectValue : null));
    // fill Data
    if (!(this.data === null || this.data === undefined) && this.data[this.field.name] !== null) {
      this.form.get(this.field.name).setValue(this.data[this.field.name])
    } else {
      let defaultValue = null;
      if (field.type === 'date') {
        // Format today's date as YYYY-MM-DD
        const today = new Date();
        defaultValue = today.toISOString().split('T')[0];
        this.form.get(field.name)?.setValue(defaultValue)
      }
    }


    // render dependents of parent soap field  
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
        if (!(this.data === null || this.data === undefined) && this.data[dependent.name] !== null)
          this.form.get(dependent.name).setValue(this.data[dependent.name])
      });
    } else {
      field.dependents.forEach(dependent => {
        dependent.render = false;
        this.form.removeControl(dependent.name)
        if (dependent.dependents !== undefined || dependent.dependents !== null)
          dependent.dependents.forEach(subdependent => {
            this.form.removeControl(subdependent.name)
          })
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
      if (this.data !== undefined && this.data[dependent.name] !== null)
        this.form.get(dependent.name).setValue(this.data[dependent.name])
    });
    const notMatchSelect = field.dependents.filter(item => item.changeValueSelect !== value);
    notMatchSelect.forEach(dependent => {
      dependent.render = false;
      this.form.removeControl(dependent.name)
    });
  }
  clickAddAll(field: any): void {
    const isRemove = field.displayText === 'Remove All';
    field.displayText = isRemove ? field.display : 'Remove All';

    const shouldCheck = !isRemove;

    // Update parent
    const parentControl = this.form.get(field.name);
    if (parentControl) parentControl.setValue(shouldCheck);

    // Update dependents recursively
    if (field.dependents && Array.isArray(field.dependents)) {
      this.updateDependentsRecursively(field.dependents, shouldCheck);
    }

    // ✅ Force template refresh
    this.cdRef.detectChanges();
  }
  private updateDependentsRecursively(dependents: any[], value: boolean): void {
    dependents.forEach(dep => {
      // ensure control exists
      let control = this.form.get(dep.name);
      if (!control) {
        this.form.addControl(dep.name, this.fb.control(value));
      } else {
        control.setValue(value);
        control.markAsDirty();
      }

      // ✅ Trigger render logic if the dependent has its own children
      if (dep.dependents && dep.dependents.length > 0) {
        // Mark render = true so Angular will display the nested structure
        dep.render = value;

        // Call your existing renderer to handle nested dependents
        this.renderDependents(dep, value);
      }
    });

    // Force Angular to re-check the view
    this.cdRef.detectChanges();
  }

  private loadIsAllData() {
    // Only handle parent fields that have dependents
    if (this.field.dependents && Array.isArray(this.field.dependents) && this.field.isAll) {

      // Only check first-level dependents
      const allChecked = this.field.dependents.every((dep: any) => {
        const control = this.form.get(dep.name);
        // Only count the first-level dependents (ignore their dependents)
        return control ? control.value === true : false;
      });

      const noneChecked = this.field.dependents.every((dep: any) => {
        const control = this.form.get(dep.name);
        return control ? control.value === false : true;
      });

      // If all checked → "Remove All"
      // If none or partially checked → "Add All"
      if (allChecked) {
        this.field.displayText = 'Remove All';
      } else {
        this.field.displayText = this.field.display; // Usually "Add All"
      }
    }
  }
}

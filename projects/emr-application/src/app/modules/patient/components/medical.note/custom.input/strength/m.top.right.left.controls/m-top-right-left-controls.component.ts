import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'm-top-right-left-controls',
  templateUrl: './m-top-right-left-controls.component.html',
  styleUrls: ['./m-top-right-left-controls.component.css']
})
export class MTopRightLeftControlsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() columns: any[] = []

  movementLabels: string[] = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.columns.forEach(column => {
      column.controls.forEach(ctrl => {
        const key = `${column.name}_${this.toCamelCase(ctrl.label)}_${ctrl.type}_${this.parentFieldName}`;
        const initialValue = ctrl.type === 'select' ? ctrl.value?.[0]?.val ?? '' : '';
        this.form.addControl(key, new FormControl(initialValue));
        this.form.get(key)?.valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
      });
    });
  
    if (this.columns.length > 0) {
      this.movementLabels = Array.from(
        new Set(this.columns.flatMap(c => c.controls.map(ctrl => ctrl.label)))
      );
    }
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  getControls(columnName: string, label: string): any[] {
    const column = this.columns.find(col => col.name === columnName);
    return column?.controls.filter(ctrl => ctrl.label === label) || [];
  }
}

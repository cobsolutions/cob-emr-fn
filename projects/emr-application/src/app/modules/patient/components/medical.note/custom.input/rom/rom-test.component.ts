import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rom-test-right-left',
  templateUrl: './rom-test.component.html',
  styleUrls: ['./rom-test.component.css']
})
export class RomTestComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  /*
    @Input() controlR: any[]
    @Input() controlL: any[]
    [
      {
        "label":"control label",
        ""value:[
          {
            "val":"val",
            "view":"view"
        }
        ]
      }
    ]
  */
  @Input() controlR: any[]
  @Input() controlL: any[]
  @Input() columns: number;
  @Input() rightLabel:string
  @Input() leftLabel:string
  @Input() testStyle: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});    
    if (this.columns === 1) {
      this.controlR.forEach(control => {
        this.form.addControl(`right_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`, new FormControl(this.controlR[0].value[0].val));
        this.form.get(`right_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
        })
      });
    }
    if (this.columns === 2) {
      this.controlR.forEach(control => {
        this.form.addControl(`right_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`, new FormControl(this.controlR[0].value[0].val));
        this.form.get(`right_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
        })
      });
      this.controlL.forEach(control => {
        this.form.addControl(`left_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`, new FormControl(this.controlL[0].value[0].val));
        this.form.get(`left_${this.toCamelCase(control.label)+"_"+this.parentFieldName}`).valueChanges.subscribe(v => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
        })
      });
    }
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  applyToAll(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (!value) return;
  
    const updatedValues = { ...this.form.getRawValue() };
  
    Object.keys(updatedValues).forEach((key) => {
      this.form.get(key).setValue(value, { emitEvent: false });
    });
  
    // Update parent form after all changes
    this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
  }
}

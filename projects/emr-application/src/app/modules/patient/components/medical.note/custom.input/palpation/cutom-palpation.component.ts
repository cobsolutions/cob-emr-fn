import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export interface SingleSection {
  title: string;
  options: string[];
}

export interface DualSection {
  title: string;
  options: string[];
}
@Component({
  selector: 'cutom-palpation',
  templateUrl: './cutom-palpation.component.html',
  styleUrls: ['./cutom-palpation.component.css']
})
export class CutomPalpationComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() singleSections: SingleSection[] = [];
  @Input() dualSections: DualSection[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});

    // Create controls for single sections
    this.singleSections.forEach(section => {
      section.options.forEach(option => {
        const controlName = this.toCamelCase(`${section.title}_${option}`);
        this.form.addControl(controlName, this.fb.control(false));

      });
    });

    // Create controls for dual sections
    this.dualSections.forEach(section => {
      section.options.forEach(option => {
        const rightControl = `right_${this.toCamelCase(`${section.title}_${option}`)}`;
        const leftControl = `left_${this.toCamelCase(`${section.title}_${option}`)}`;
        this.form.addControl(rightControl, this.fb.control(false));
        this.form.addControl(leftControl, this.fb.control(false));
      });
    });

    // Subscribe to value changes
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).valueChanges.subscribe(() => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      });
    });
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }

  toCamelCase(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +(\w)/g, (_, c) => c.toUpperCase());
  }
}

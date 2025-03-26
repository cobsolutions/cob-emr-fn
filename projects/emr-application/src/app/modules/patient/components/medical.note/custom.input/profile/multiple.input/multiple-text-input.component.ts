import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'multiple-text-input',
  templateUrl: './multiple-text-input.component.html',
  styleUrls: ['./multiple-text-input.component.css']
})
export class MultipleTextInputComponent implements OnInit {
  @Input() form: FormGroup;
  measurementFields = ['Upper Arm', 'Mid Biceps', 'Elbow Flexion Crease', 'Forearm', 'Wrist'];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.form) {
      this.measurementFields.forEach(field => {
        this.form.addControl(`right_${this.toCamelCase(field)}`, new FormControl(''));
        this.form.addControl(`left_${this.toCamelCase(field)}`, new FormControl(''));
      });
    }
  }
   toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'movements-test',
  templateUrl: './movements-test.component.html',
  styleUrls: ['./movements-test.component.css']
})
export class MovementsTestComponent implements OnInit {
  @Input() columns: string[] = ['ROM', 'Movement Quality', 'Pain Free Movement'];
  @Input() rows: string[] = [
    'Retraction',
    'Right Rotation',
    'Left Rotation',
    'Right Lateral Flexion',
    'Left Lateral Flexion',
    'Extension'
  ];

  form: FormGroup;

  options = [
    { val: 'NT', view: 'Not Tested' },
    { val: 'T613_SAT0', view: '0 - Not Satisfactory' },
    { val: 'T613_SAT1', view: '1 - Satisfactory' },
    { val: 'Custom', view: 'Custom' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    for (let row of this.rows) {
      for (let col of this.columns) {
        const selectControl = this.getControlName(row, col);
        const inputControl = this.getInputControlName(row, col);
        this.form.addControl(selectControl, this.fb.control(this.options[0].val));
        this.form.addControl(inputControl, this.fb.control(''));
      }
    }
  }

  getControlName(row: string, col: string): string {
    return `${row}_${col}_select`.replace(/\s+/g, '_');
  }

  getInputControlName(row: string, col: string): string {
    return `${row}_${col}_input`.replace(/\s+/g, '_');
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}

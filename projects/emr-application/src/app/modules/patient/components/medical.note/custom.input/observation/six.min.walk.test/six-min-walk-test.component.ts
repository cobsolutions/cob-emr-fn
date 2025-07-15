import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'six-min-walk-test',
  templateUrl: './six-min-walk-test.component.html',
  styleUrls: ['./six-min-walk-test.component.css']
})
export class SixMinWalkTestComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() testStyle: string;
  times = ['Rest', '1 min.', '2 min.', '3 min.', '4 min.', '5 min.', '6 min.'];
  metrics = ['SpO2%', 'Heart Rate', 'Respiratory Rate', 'BORG Scale', 'feet'];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    
    this.times.forEach(time => {
      this.metrics.forEach(metric => {
        const key = this.getControlName(time, metric);
        this.form.addControl(key, new FormControl(''));
        this.form.get(key).valueChanges.subscribe(() => {
          this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
        });
      });
    });

    // Comments field
    this.form.addControl('comments', new FormControl(''));
    this.form.get('comments').valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
    });
  }
  getControlName(time: string, metric: string): string {
    return `${time.replace(/\s|\./g, '')}_${metric.replace(/\s|\(|\)|%/g, '')}`;
  }

}

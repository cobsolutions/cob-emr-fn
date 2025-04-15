import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface SelectValue {
  val: string,
  view: string
}
@Component({
  selector: 'manual-muscle-test',
  templateUrl: './manual-muscle-test.component.html',
  styleUrls: ['./manual-muscle-test.component.css']
})
export class ManualMuscleTestComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  selectValues: SelectValue[] = [
    { "view": "Not Tested", "val": "NT" },
    { "view": "5/5", "val": "MMT01" },
    { "view": "5-/5", "val": "MMT02" },
    { "view": "4+/5", "val": "MMT03" },
    { "view": "4/5", "val": "MMT04" },
    { "view": "4-/5", "val": "MMT05" },
    { "view": "3+/5", "val": "MMT06" },
    { "view": "3/5", "val": "MMT07" },
    { "view": "3-/5", "val": "MMT08" },
    { "view": "2+/5", "val": "MMT09" },
    { "view": "2/5", "val": "MMT10" },
    { "view": "2-/5", "val": "MMT11" },
    { "view": "1+/5", "val": "MMT12" },
    { "view": "1/5", "val": "MMT13" },
    { "view": "1-/5", "val": "MMT14" },
    { "view": "0/5", "val": "MMT15" },
    { "view": "Custom", "val": "Custom" }
  ]
  
  selectGroups = [
    { name: 'Group 1', fields: ['Anterior Deltoid', 'Middle Deltoid','Posterior Deltoid'] },
    { name: 'Group 2', fields: ['Upper Trapezius', 'Middle Trapezius','Lower Trapezius'] },
    { name: 'Group 3', fields: ['Pectorals'] },
    { name: 'Group 4', fields: ['Latissimus Dorsi'] },
    { name: 'Group 5', fields: ['Supraspinatus'] },
    { name: 'Group 6', fields: ['Infraspinatus Teres Minor', 'Infraspinatus','Teres Minor'] },
    { name: 'Group 7', fields: ['Teres Major'] },
    { name: 'Group 8', fields: ['Subscapularis'] },
    { name: 'Group 9', fields: ['Serratus Anterior'] },
    { name: 'Group 10', fields: ['Rhomboids'] },
    { name: 'Group 11', fields: ['Biceps'] },
    { name: 'Group 12', fields: ['Triceps'] }
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.selectGroups.forEach(group => {
      this.buildFormByGroup(group.fields);
    });
  }

  private buildFormByGroup(group:string[]){
    group.forEach(field => {
      this.form.addControl(`right_${this.toCamelCase(field)}`, new FormControl( this.selectValues[0].val));
      this.form.addControl(`left_${this.toCamelCase(field)}`, new FormControl(this.selectValues[0].val));

      this.form.get(`right_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
      this.form.get(`left_${this.toCamelCase(field)}`).valueChanges.subscribe(v => {
        this.parentForm.get(this.parentFieldName).setValue(this.form.getRawValue());
      })
    });
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface SelectValues {
  val: string,
  view: string
}
@Component({
  selector: 'upper-body-myofascial-test',
  templateUrl: './upper-body-myofascial-test.component.html',
  styleUrls: ['./upper-body-myofascial-test.component.css']
})
export class UpperBodyMyofascialTestComponent implements OnInit {
  upperBodyMyofascialForm: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  upperBodyMyofascialTypes = ['Kneeling Scapular Protraction', 'Kneeling Push Up', 'Kneeling Shoulder Extension', 'Supine Scapular Retraction', 'Supine Pull Up'];
  selectValues: SelectValues[] = [
    { "val": "NT", "view": "Not Tested" },
    { "val": "T613_BM05", "view": "5/5" },
    { "val": "T613_BM04", "view": "4/5" },
    { "val": "T613_BM03", "view": "3/5" },
    { "val": "T613_BM02", "view": "2/5" },
    { "val": "T613_BM01", "view": "1/5" },
    { "val": "Custom", "view": "Custom" }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.upperBodyMyofascialForm = this.fb.group({
      right: this.fb.group({
        KneelingScapularProtraction: [this.selectValues[0].val],
        KneelingPushUp: [this.selectValues[0].val],
        KneelingShoulderExtension: [this.selectValues[0].val],
        SupineScapularRetraction: [this.selectValues[0].val],
        SupinePullUp: [this.selectValues[0].val],
        comment: [''],
      }),
      left: this.fb.group({
        KneelingScapularProtraction: [this.selectValues[0].val],
        KneelingPushUp: [this.selectValues[0].val],
        KneelingShoulderExtension: [this.selectValues[0].val],
        SupineScapularRetraction: [this.selectValues[0].val],
        SupinePullUp: [this.selectValues[0].val],
        comment: [''],
      }),
    });
    this.onChangeRight();
    this.onChangeLeft();
  }
  onChangeRight() {
    this.upperBodyMyofascialForm.get('right').get('KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('right').get('KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('right').get('KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('right').get('SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('right').get('SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('right').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
  }
  onChangeLeft() {
    this.upperBodyMyofascialForm.get('left').get('KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('left').get('KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('left').get('KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('left').get('SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('left').get('SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })
    this.upperBodyMyofascialForm.get('left').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.value);
    })

  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

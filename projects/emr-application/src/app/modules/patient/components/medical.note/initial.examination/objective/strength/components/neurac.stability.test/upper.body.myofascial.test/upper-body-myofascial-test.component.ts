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
        comment_KneelingScapularProtraction: [''],
        KneelingPushUp: [this.selectValues[0].val],
        comment_KneelingPushUp: [''],
        KneelingShoulderExtension: [this.selectValues[0].val],
        comment_KneelingShoulderExtension: [''],
        SupineScapularRetraction: [this.selectValues[0].val],
        comment_SupineScapularRetraction: [''],
        SupinePullUp: [this.selectValues[0].val],
        comment_SupinePullUp: [''],
      }),
      left: this.fb.group({
        KneelingScapularProtraction: [this.selectValues[0].val],
        comment_KneelingScapularProtraction: [''],
        KneelingPushUp: [this.selectValues[0].val],
        comment_KneelingPushUp: [''],
        KneelingShoulderExtension: [this.selectValues[0].val],
        comment_KneelingShoulderExtension: [''],
        SupineScapularRetraction: [this.selectValues[0].val],
        comment_SupineScapularRetraction: [''],
        SupinePullUp: [this.selectValues[0].val],
        comment_SupinePullUp: [''],
      }),
    });
    this.onChangeRight();
    this.onChangeLeft();
    setTimeout(() => {
      this.upperBodyMyofascialForm.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  onChangeRight() {
    this.upperBodyMyofascialForm.get('right').get('KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
  }
  onChangeLeft() {
    this.upperBodyMyofascialForm.get('right').get('KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('right').get('comment_KneelingScapularProtraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('comment_KneelingPushUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('comment_KneelingShoulderExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('comment_SupineScapularRetraction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })
    this.upperBodyMyofascialForm.get('left').get('comment_SupinePullUp').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.upperBodyMyofascialForm.getRawValue());
    })

  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

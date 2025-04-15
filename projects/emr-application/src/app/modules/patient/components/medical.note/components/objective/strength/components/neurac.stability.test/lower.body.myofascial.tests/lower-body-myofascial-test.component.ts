import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface SelectValues {
  val: string,
  view: string
}
@Component({
  selector: 'lower-body-myofascial-test',
  templateUrl: './lower-body-myofascial-test.component.html',
  styleUrls: ['./lower-body-myofascial-test.component.css']
})
export class LowerBodyMyofascialTestComponent implements OnInit {
  lowerBodyMyofascialForm: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  lowerBodyMyofascialTypes = ['Supine Pelvic Lift',
    'Supine Bridge',
    'Supine Knee Flexion',
    'Side Lying Hip Abduction',
    'Prone Bridge',
    'Prone Hip Flexion',
    'Prone Knee Extension'];
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
    this.lowerBodyMyofascialForm = this.fb.group({
      right: this.fb.group({
        SupinePelvicLift: [this.selectValues[0].val],
        comment_SupinePelvicLift: [''],
        SupineBridge: [this.selectValues[0].val],
        comment_SupineBridge: [''],
        SupineKneeFlexion: [this.selectValues[0].val],
        comment_SupineKneeFlexion: [''],
        SideLyingHipAbduction: [this.selectValues[0].val],
        comment_SideLyingHipAbduction: [''],
        ProneBridge: [this.selectValues[0].val],
        comment_ProneBridge: [''],
        ProneHipFlexion: [this.selectValues[0].val],
        comment_ProneHipFlexion: [''],
        ProneKneeExtension: [this.selectValues[0].val],
        comment_ProneKneeExtension: [''],
      }),
      left: this.fb.group({
        SupinePelvicLift: [this.selectValues[0].val],
        comment_SupinePelvicLift: [''],
        SupineBridge: [this.selectValues[0].val],
        comment_SupineBridge: [''],
        SupineKneeFlexion: [this.selectValues[0].val],
        comment_SupineKneeFlexion: [''],
        SideLyingHipAbduction: [this.selectValues[0].val],
        comment_SideLyingHipAbduction: [''],
        ProneBridge: [this.selectValues[0].val],
        comment_ProneBridge: [''],
        ProneHipFlexion: [this.selectValues[0].val],
        comment_ProneHipFlexion: [''],
        ProneKneeExtension: [this.selectValues[0].val],
        comment_ProneKneeExtension: [''],
      }),
    });
    this.onChangeRight();
    this.onChangeLeft();
    setTimeout(() => {
      this.lowerBodyMyofascialForm.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  onChangeLeft() {
    this.lowerBodyMyofascialForm.get('left').get('SupinePelvicLift').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_SupinePelvicLift').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('SupineBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_SupineBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('SupineKneeFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_SupineKneeFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('SideLyingHipAbduction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_SideLyingHipAbduction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('ProneBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_ProneBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('ProneHipFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_ProneHipFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('ProneKneeExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('left').get('comment_ProneKneeExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
  }
  onChangeRight() {
    this.lowerBodyMyofascialForm.get('right').get('SupinePelvicLift').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_SupinePelvicLift').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('SupineBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_SupineBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('SupineKneeFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_SupineKneeFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('SideLyingHipAbduction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_SideLyingHipAbduction').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('ProneBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_ProneBridge').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('ProneHipFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_ProneHipFlexion').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('ProneKneeExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.getRawValue());
    })
    this.lowerBodyMyofascialForm.get('right').get('comment_ProneKneeExtension').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.lowerBodyMyofascialForm.value);
    })
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
}

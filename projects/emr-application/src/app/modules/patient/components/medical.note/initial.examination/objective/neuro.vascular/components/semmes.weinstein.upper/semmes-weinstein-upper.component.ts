import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'semmes-weinstein-upper',
  templateUrl: './semmes-weinstein-upper.component.html',
  styleUrls: ['./semmes-weinstein-upper.component.css']
})
export class SemmesWeinsteinUpperComponent implements OnInit {
  form: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  types = ['Radial', 'Ulnar'];
  map = {
    'Radial': 'radial',
    'Ulnar': 'ulnar'
  };
  mapTypes = {
    'Radial': [{ "val": "NT", "view": "Not Tested" }, { "val": "T542_SW1", "view": "1.65-2.83 mm (green) Normal light touch" },
    { "val": "T542_SW2", "view": "3.22-3.61 mm (blue) Diminished light touch" },
    { "val": "T542_SW3", "view": "3.84-4.31 mm (purple) Diminished protective sensation" },
    { "val": "T542_SW4", "view": "4.56-6.65 mm (red) Loss of protective sensation" },
    { "val": "T542_SW6", "view": "6.65 mm (red) Deep pressure only" },
    { "val": "T542_SW5", "view": "Greater than 6.65 mm (red lined) Untestable (no response)" }],

    'Ulnar': [{ "val": "NT", "view": "Not Tested" }, { "val": "T542_SW1", "view": "1.65-2.83 mm (green) Normal light touch" },
    { "val": "T542_SW2", "view": "3.22-3.61 mm (blue) Diminished light touch" },
    { "val": "T542_SW3", "view": "3.84-4.31 mm (purple) Diminished protective sensation" },
    { "val": "T542_SW4", "view": "4.56-6.65 mm (red) Loss of protective sensation" },
    { "val": "T542_SW6", "view": "6.65 mm (red) Deep pressure only" },
    { "val": "T542_SW5", "view": "Greater than 6.65 mm (red lined) Untestable (no response)" }]
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      right: this.fb.group({
        radial: [this.mapTypes['Radial'][0].val],
        ulnar: [this.mapTypes['Ulnar'][0].val],
        comment: [''],
      }),
      left: this.fb.group({
        radial: [this.mapTypes['Radial'][0].val],
        ulnar: [this.mapTypes['Ulnar'][0].val],
        comment: [''],
      }),
    });
    this.onChangeRight();
    this.onChangeLeft();
  }
  onChangeRight() {
    this.form.get('right').get('radial').valueChanges.subscribe(dd => {
      this.form.get(this.parentFieldName).setValue(this.form.value);
    })
    this.form.get('right').get('ulnar').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.form.value);
    })
    this.form.get('right').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.form.value);
    })

  }
  onChangeLeft() {
    this.form.get('left').get('radial').valueChanges.subscribe(dd => {
      this.form.get(this.parentFieldName).setValue(this.form.value);
    })
    this.form.get('left').get('ulnar').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.form.value);
    })
    this.form.get('left').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.form.value);
    })
  }
}

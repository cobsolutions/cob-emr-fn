import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'grip',
  templateUrl: './grip.component.html',
  styleUrls: ['./grip.component.css']
})
export class GripComponent implements OnInit {

  gripStrengthForm: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  // Grip types
  gripTypes = ['Power Grip', 'Lateral Pinch', 'Tip Pinch/Pincer', 'Tripod Pinch'];

  // Mapping grip types to form control-safe names (removing spaces and special characters)
  gripControlMap = {
    'Power Grip': 'powerGrip',
    'Lateral Pinch': 'lateralPinch',
    'Tip Pinch/Pincer': 'tipPinch',
    'Tripod Pinch': 'tripodPinch'
  };

  // Test options specific to each grip type
  testOptionsMap = {
    'Power Grip': [
      { "val": "NT", "view": "Not Tested" },
      { "val": "Custom", "view": "Custom" },
      { "val": "0", "view": "0" },
      { "val": "5", "view": "5" },
      { "val": "10", "view": "10" },
      { "val": "15", "view": "15" },
      { "val": "20", "view": "20" },
      { "val": "25", "view": "25" },
      { "val": "30", "view": "30" },
      { "val": "35", "view": "35" },
      { "val": "40", "view": "40" },
      { "val": "45", "view": "45" },
      { "val": "50", "view": "50" },
      { "val": "55", "view": "55" },
      { "val": "60", "view": "60" },
      { "val": "65", "view": "65" },
      { "val": "70", "view": "70" },
      { "val": "75", "view": "75" },
      { "val": "80", "view": "80" },
      { "val": "85", "view": "85" },
      { "val": "90", "view": "90" },
      { "val": "95", "view": "95" },
      { "val": "100", "view": "100" },
      { "val": "105", "view": "105" },
      { "val": "110", "view": "110" },
      { "val": "115", "view": "115" },
      { "val": "120", "view": "120" },
      { "val": "125", "view": "125" },
      { "val": "130", "view": "130" },
      { "val": "135", "view": "135" },
      { "val": "140", "view": "140" },
      { "val": "145", "view": "145" },
      { "val": "150", "view": "150" }
    ]
    ,
    'Lateral Pinch': [
      { "val": "NT", "view": "Not Tested" },
      { "val": "Custom", "view": "Custom" },
      { "val": "0", "view": "0" },
      { "val": "0.5", "view": "0.5" },
      { "val": "1", "view": "1" },
      { "val": "1.5", "view": "1.5" },
      { "val": "2", "view": "2" },
      { "val": "2.5", "view": "2.5" },
      { "val": "3", "view": "3" },
      { "val": "3.5", "view": "3.5" },
      { "val": "4", "view": "4" },
      { "val": "4.5", "view": "4.5" },
      { "val": "5", "view": "5" },
      { "val": "5.5", "view": "5.5" },
      { "val": "6", "view": "6" },
      { "val": "6.5", "view": "6.5" },
      { "val": "7", "view": "7" },
      { "val": "7.5", "view": "7.5" },
      { "val": "8", "view": "8" },
      { "val": "8.5", "view": "8.5" },
      { "val": "9", "view": "9" },
      { "val": "9.5", "view": "9.5" },
      { "val": "10", "view": "10" },
      { "val": "10.5", "view": "10.5" },
      { "val": "11", "view": "11" },
      { "val": "11.5", "view": "11.5" },
      { "val": "12", "view": "12" },
      { "val": "12.5", "view": "12.5" },
      { "val": "13", "view": "13" },
      { "val": "13.5", "view": "13.5" },
      { "val": "14", "view": "14" },
      { "val": "14.5", "view": "14.5" },
      { "val": "15", "view": "15" },
      { "val": "15.5", "view": "15.5" },
      { "val": "16", "view": "16" },
      { "val": "16.5", "view": "16.5" },
      { "val": "17", "view": "17" },
      { "val": "17.5", "view": "17.5" },
      { "val": "18", "view": "18" },
      { "val": "18.5", "view": "18.5" },
      { "val": "19", "view": "19" },
      { "val": "19.5", "view": "19.5" },
      { "val": "20", "view": "20" },
      { "val": "22", "view": "22" },
      { "val": "24", "view": "24" },
      { "val": "26", "view": "26" },
      { "val": "28", "view": "28" },
      { "val": "30", "view": "30" }
    ]
    ,
    'Tip Pinch/Pincer': [
      { "val": "NT", "view": "Not Tested" },
      { "val": "Custom", "view": "Custom" },
      { "val": "0", "view": "0" },
      { "val": "0.5", "view": "0.5" },
      { "val": "1", "view": "1" },
      { "val": "1.5", "view": "1.5" },
      { "val": "2", "view": "2" },
      { "val": "2.5", "view": "2.5" },
      { "val": "3", "view": "3" },
      { "val": "3.5", "view": "3.5" },
      { "val": "4", "view": "4" },
      { "val": "4.5", "view": "4.5" },
      { "val": "5", "view": "5" },
      { "val": "5.5", "view": "5.5" },
      { "val": "6", "view": "6" },
      { "val": "6.5", "view": "6.5" },
      { "val": "7", "view": "7" },
      { "val": "7.5", "view": "7.5" },
      { "val": "8", "view": "8" },
      { "val": "8.5", "view": "8.5" },
      { "val": "9", "view": "9" },
      { "val": "9.5", "view": "9.5" },
      { "val": "10", "view": "10" },
      { "val": "10.5", "view": "10.5" },
      { "val": "11", "view": "11" },
      { "val": "11.5", "view": "11.5" },
      { "val": "12", "view": "12" },
      { "val": "12.5", "view": "12.5" },
      { "val": "13", "view": "13" },
      { "val": "13.5", "view": "13.5" },
      { "val": "14", "view": "14" },
      { "val": "14.5", "view": "14.5" },
      { "val": "15", "view": "15" },
      { "val": "15.5", "view": "15.5" },
      { "val": "16", "view": "16" },
      { "val": "16.5", "view": "16.5" },
      { "val": "17", "view": "17" },
      { "val": "17.5", "view": "17.5" },
      { "val": "18", "view": "18" },
      { "val": "18.5", "view": "18.5" },
      { "val": "19", "view": "19" },
      { "val": "19.5", "view": "19.5" },
      { "val": "20", "view": "20" }
    ]
    ,
    'Tripod Pinch': [
      { "val": "NT", "view": "Not Tested" },
      { "val": "Custom", "view": "Custom" },
      { "val": "0", "view": "0" },
      { "val": "0.5", "view": "0.5" },
      { "val": "1", "view": "1" },
      { "val": "1.5", "view": "1.5" },
      { "val": "2", "view": "2" },
      { "val": "2.5", "view": "2.5" },
      { "val": "3", "view": "3" },
      { "val": "3.5", "view": "3.5" },
      { "val": "4", "view": "4" },
      { "val": "4.5", "view": "4.5" },
      { "val": "5", "view": "5" },
      { "val": "5.5", "view": "5.5" },
      { "val": "6", "view": "6" },
      { "val": "6.5", "view": "6.5" },
      { "val": "7", "view": "7" },
      { "val": "7.5", "view": "7.5" },
      { "val": "8", "view": "8" },
      { "val": "8.5", "view": "8.5" },
      { "val": "9", "view": "9" },
      { "val": "9.5", "view": "9.5" },
      { "val": "10", "view": "10" },
      { "val": "10.5", "view": "10.5" },
      { "val": "11", "view": "11" },
      { "val": "11.5", "view": "11.5" },
      { "val": "12", "view": "12" },
      { "val": "12.5", "view": "12.5" },
      { "val": "13", "view": "13" },
      { "val": "13.5", "view": "13.5" },
      { "val": "14", "view": "14" },
      { "val": "14.5", "view": "14.5" },
      { "val": "15", "view": "15" },
      { "val": "15.5", "view": "15.5" },
      { "val": "16", "view": "16" },
      { "val": "16.5", "view": "16.5" },
      { "val": "17", "view": "17" },
      { "val": "17.5", "view": "17.5" },
      { "val": "18", "view": "18" },
      { "val": "18.5", "view": "18.5" },
      { "val": "19", "view": "19" },
      { "val": "19.5", "view": "19.5" },
      { "val": "20", "view": "20" },
      { "val": "20.5", "view": "20.5" },
      { "val": "21", "view": "21" },
      { "val": "21.5", "view": "21.5" },
      { "val": "22", "view": "22" },
      { "val": "22.5", "view": "22.5" },
      { "val": "23", "view": "23" },
      { "val": "23.5", "view": "23.5" },
      { "val": "24", "view": "24" },
      { "val": "24.5", "view": "24.5" },
      { "val": "25", "view": "25" },
      { "val": "25.5", "view": "25.5" },
      { "val": "26", "view": "26" },
      { "val": "26.5", "view": "26.5" },
      { "val": "27", "view": "27" },
      { "val": "27.5", "view": "27.5" },
      { "val": "28", "view": "28" },
      { "val": "28.5", "view": "28.5" },
      { "val": "29", "view": "29" },
      { "val": "29.5", "view": "29.5" },
      { "val": "30", "view": "30" }
    ]

  };

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.gripStrengthForm = this.fb.group({
      right: this.fb.group({
        powerGrip: [this.testOptionsMap['Power Grip'][0].val],
        lateralPinch: [this.testOptionsMap['Lateral Pinch'][0].val],
        tipPinch: [this.testOptionsMap['Tip Pinch/Pincer'][0].val],
        tripodPinch: [this.testOptionsMap['Tripod Pinch'][0].val],
        comment: [''],
      }),
      left: this.fb.group({
        powerGrip: [this.testOptionsMap['Power Grip'][0].val],
        lateralPinch: [this.testOptionsMap['Lateral Pinch'][0].val],
        tipPinch: [this.testOptionsMap['Tip Pinch/Pincer'][0].val],
        tripodPinch: [this.testOptionsMap['Tripod Pinch'][0].val],
        comment: [''],
      }),
    });
    this.onChangeRight();
    this.onChangeLeft();
  }
  onChangeRight() {
    this.gripStrengthForm.get('right').get('powerGrip').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('right').get('lateralPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('right').get('tipPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('right').get('tripodPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('right').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
  }
  onChangeLeft() {
    this.gripStrengthForm.get('left').get('powerGrip').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('left').get('lateralPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('left').get('tipPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('left').get('tripodPinch').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
    this.gripStrengthForm.get('left').get('comment').valueChanges.subscribe(dd => {
      this.parentForm.get(this.parentFieldName).setValue(this.gripStrengthForm.value);
    })
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'subjective-basic-n',
  templateUrl: './basic-n.component.html',
  styleUrls: ['./basic-n.component.css']
})
export class BasicNComponent implements OnInit {
  basicForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  setupValueChangeListeners() {
    
  }
  initForm() {
    this.basicForm = this.fb.group({
      dos_date: [null], // name : Date of Initial Examination , Type Date Picker
      time:[null],  // name  Time In/Time Out , type radio
      number_of_visit:[''], // Visit Number , type : input text
      treatment_side:[], //name Treatment Side checkboxs  (N/A,Left,Right) in vertical align , Type checkbox
      specific_physician_rders:['no'], //name Specific Physician Orders , type radio box
      injury_onset_date:[null], //name Injury/Onset Date/Change of Status Date , type : date picker
      chronic:[], //check box
      Insidious:[], //check box
      new_injury:[], //check box
      surgery_performed:['no'], //Type Radio
      prior_hospitalization:['no'], //Type Radio
      from_date:[null], //Type Date
      to_date:[null], // Type Date
      pelvic_speech_profile:[], // Type Select input
      movement_based_spinal_assessment_questionnaire:['no'], //Type radio 
      history_of_present_condition_Mechanism_of_injury:[''],//Text Area
      primary_concern_chief_complaint:[''] //Text Area








    }); 
  }

}

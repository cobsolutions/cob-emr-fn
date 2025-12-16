import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'observation-n',
  templateUrl: './observation-n.component.html',
  styleUrls: ['./observation-n.component.css']
})
export class ObservationNComponent implements OnInit {
  omtForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.omtForm = this.fb.group({
      indicate_body_type: ['no'],
      vitals: ['no'],
      adl_management: ['no'],
      breathing_at_rest: ['no'],
      transfers: ['no'],
      cast_splint: ['no'],
      standing_posture: ['no'],
      protracted_scapulas: ['no'],
      scoliosis: ['no'],
      lower_extremity_structure: ['no'],
      gait: ['no'],
      six_minute_walk_test: ['no'],
      assistive_device: ['no'],
      immobilizer: ['no'],
      muscular_asymmetries: ['no'],
      muscle_guarding: ['no'],
      muscle_atrophy: ['no'],
      edema: ['no'],
      apprehension_of_movement: ['no'],
      additional_comments: ['no'],
    })
  }

}

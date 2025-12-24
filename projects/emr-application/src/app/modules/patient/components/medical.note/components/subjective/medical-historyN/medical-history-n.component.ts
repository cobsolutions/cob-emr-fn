import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'subjective-medical-history-n',
  templateUrl: './medical-history-n.component.html',
  styleUrls: ['./medical-history-n.component.css']
})
export class MedicalHistoryNComponent implements OnInit {
  medicalHistoryForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }
  showPreviousHistoryOfSimilarSymptoms:boolean= false
  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.medicalHistoryForm);
  }
  initForm() {
    this.medicalHistoryForm = this.fb.group({
      previous_history_of_similar_symptoms: ['no'],
      previous_episodes_of_same_complaints:['no'],
      previous_treatments_for_similar_symptoms:['no'],

      general_health: [''],
      occupation_social_history: ['no'],
      home_health_care: ['no'],
      history_of_falls: ['na'],
      mental_status_cognitive_function_appears_impaired: ['no'],
      unexplained_weight_loss: ['na'],
    })
  }
  setupValueChangeListeners() {
    this.medicalHistoryForm.get('previous_history_of_similar_symptoms')?.valueChanges.subscribe(value => {
      this.showPreviousHistoryOfSimilarSymptoms = value === 'yes'
    })
  }

}

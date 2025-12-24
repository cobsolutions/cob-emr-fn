import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'subjective-pain-n',
  templateUrl: './pain-n.component.html',
  styleUrls: ['./pain-n.component.css']
})
export class PainNComponent implements OnInit {
  painForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showPainScale: boolean = false;
  showRestrictionsPainAlleviators: boolean = false;

  aggravatingFactorsOptions = [
    { value: 'sitting', label: 'Sitting' },
    { value: 'standing', label: 'Standing' },
    { value: 'walking', label: 'Walking' },
    { value: 'stairs_up', label: 'Stairs - up' },
    { value: 'stairs_down', label: 'Stairs - down' },
    { value: 'sit_to_stand', label: 'Sit to stand' },
    { value: 'bending', label: 'Bending' },
    { value: 'voiding', label: 'Voiding' },
    { value: 'lying_down', label: 'Lying Down' },
    { value: 'cough_sneeze', label: 'Cough/sneeze' }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.painForm);
  }
  initForm() {
    this.painForm = this.fb.group({
      pain_scale: ['no'],
      aggravating_factors: [],
      restrictions_pain_alleviators: ['no'],
      restrictions_pain_alleviators_text: [''],
    })
  }
  setupValueChangeListeners() {
    this.painForm.get('pain_scale')?.valueChanges.subscribe(value => {
      this.showPainScale = value === 'yes'
    })
    this.painForm.get('restrictions_pain_alleviators')?.valueChanges.subscribe(value => {
      this.showRestrictionsPainAlleviators = value === 'yes'
    })
  }

}

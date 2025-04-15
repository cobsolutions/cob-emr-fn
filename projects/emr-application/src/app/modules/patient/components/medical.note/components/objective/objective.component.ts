import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { ObjectiveProfile } from './models/objective.profile';

@Component({
  selector: 'objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  objectiveForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  selectedProfile: any
  profiles: Observable<ObjectiveProfile[]>
  @Input() objectiveData: any
  @Input() isNotInitialExaminationNote: boolean = false
  objectiveCategories: string[] = [
    'inspection', "omt", 'observation', 'range_of_motion', 'strength', 'neuro_vascular', 'special_tests', 'palpation'
  ]
  objectiveCategoriesfields: { [key: string]: any } = {};
  constructor(private fb: FormBuilder
    , private medicalService: MedialNoteService) { }

  ngOnInit(): void {
    this.objectiveForm = this.fb.group({
      inspection: this.fb.group({}),
      omt: this.fb.group({}),
      observation: this.fb.group({}),
      rangeOfMotion: this.fb.group({}),
      strength: this.fb.group({}),
      neuroVascular: this.fb.group({}),
      specialTest: this.fb.group({}),
      palpation: this.fb.group({}),
      profile: new FormControl(null),
    });
    this.loadProfiles();
    if (this.objectiveData) {
      this.selectedProfile = this.objectiveData.profile;
      this.selectProfile();
    }
  }
  private loadProfiles() {
    this.profiles = this.medicalService.findObjectiveProfiles()
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.objectiveForm.setControl(section, formGroup);
  }
  next() {
    this.stepper.next();
  }
  selectProfile() {
    this.objectiveForm.get('profile').setValue(this.selectedProfile);
    this.medicalService.findSOAPFieldsByProfile(this.selectedProfile.toLowerCase()).subscribe(data => {
      this.fillFieldsMap(data)
      if (this.objectiveData)
        setTimeout(() => {
          this.objectiveForm.patchValue(this.objectiveData);
        }, 10);
      this.formReady.emit(this.objectiveForm);
    })
  }
  private fillFieldsMap(data: any) {
    for (let i = 0; i < this.objectiveCategories.length; i++) {
      const foundKey = Object.keys(data).find(key => key.includes(this.objectiveCategories[i]));

      // Get the corresponding value
      const value = foundKey ? data[foundKey] : null;
      this.objectiveCategoriesfields[this.objectiveCategories[i]] = value
    }
  }
}

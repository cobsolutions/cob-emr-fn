import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  profiles: Observable<ObjectiveProfile[]>
  selectedProfile: string = null
  constructor(private fb: FormBuilder
    , private medicalService: MedialNoteService) { }

  ngOnInit(): void {
    this.objectiveForm = this.fb.group({
      observation: this.fb.group({}),
      rangeOfMotion: this.fb.group({}),
      strength: this.fb.group({}),
      neuroVascular: this.fb.group({}),
      specialTest: this.fb.group({}),
      palpation: this.fb.group({})
    });
    this.loadProfiles()
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
    this.medicalService.findObjectivePrfile(this.selectedProfile.toLowerCase()).subscribe(dd => {
      const searchKey = "inspection";
      const foundKey = Object.keys(dd).find(key => key.includes(searchKey));

      // Get the corresponding value
      const value = foundKey ? dd[foundKey] : null;
      console.log(JSON.stringify(value))
    })
  }
}

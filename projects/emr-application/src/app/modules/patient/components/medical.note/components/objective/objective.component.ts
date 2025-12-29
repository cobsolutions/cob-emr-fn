import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { SoapService } from '../../../../services/medical.note/soap/soap.service';
import { ObjectiveProfile } from './models/objective.profile';
import { InspectionNComponent } from './inspectionN/inspectionN.component';
import { OutcomeMeasurementToolsComponent } from './outcome-measurement-tools/outcome-measurement-tools.component';
import { OutcomeMeasurementToolsModel } from './outcome-measurement-tools/models/outcome-measurement-tools.model';
import { Inspection } from './inspectionN/models/Inspection';

@Component({
  selector: 'objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  objectiveForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @ViewChild(InspectionNComponent) inspectionComponent: InspectionNComponent;
  @ViewChild(OutcomeMeasurementToolsComponent) omtComponent: OutcomeMeasurementToolsComponent;
  selectedProfile: any = null
  profiles: Observable<ObjectiveProfile[]>
  @Input() objectiveData: any
  @Input() isNotInitialExaminationNote: boolean = false
  @Input() noteType: string
  objectiveCategories: string[] = [
    'inspection', "omt", 'observation', 'range_of_motion', 'strength', 'neuro_vascular', 'special_tests', 'palpation'
  ]
  objectiveCategoriesfields: { [key: string]: any } = {};
  constructor(private fb: FormBuilder
    , private medicalService: MedialNoteService
    , private soapService: SoapService) { }

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
    this.profiles = this.soapService.findNoteObjectiveProfiles()
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.objectiveForm.setControl(section, formGroup);
  }
  next() {
    this.stepper.next();
  }
  selectProfile() {
    this.objectiveForm.get('profile').setValue(this.selectedProfile);
    this.soapService.findSOAPFieldsByProfile(this.selectedProfile.toLowerCase()).subscribe((data: any) => {
      this.fillFieldsMap(data)
      if (this.objectiveData !== null && (this.objectiveData.profile === this.selectedProfile))
        setTimeout(() => {
          const uiData = this.denormalizeObject(this.objectiveData);
          this.objectiveForm.patchValue(uiData);
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
  private denormalizeObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Primitive value
    if (typeof obj !== 'object') {
      return this.denormalizePrimitive(obj);
    }

    // Array
    if (Array.isArray(obj)) {
      return obj.map(item => this.denormalizeObject(item));
    }

    // Object
    const result: any = {};
    Object.keys(obj).forEach(key => {
      result[key] = this.denormalizeObject(obj[key]);
    });

    return result;
  }
  private denormalizePrimitive(val: any): any {
    if (val === true) return 'yes';
    if (val === false) return 'no';
    if (val === null) return 'na';
    return val;
  }

  /**
   * Get the inspection model from InspectionN component
   * Returns null if component is not available
   */
  getInspectionModel(): Inspection | null {
    if (this.inspectionComponent) {
      return this.inspectionComponent.getInspectionModel();
    }
    return null;
  }

  /**
   * Get the OMT model from OutcomeMeasurementTools component
   * Returns null if component is not available
   */
  getOmtModel(): OutcomeMeasurementToolsModel | null {
    if (this.omtComponent) {
      return this.omtComponent.getOutcomeMeasurementToolsModel();
    }
    return null;
  }
}

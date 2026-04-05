import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { SoapService } from '../../../../services/medical.note/soap/soap.service';
import { ObjectiveProfile } from './models/objective.profile';
import { InspectionNComponent } from './inspectionN/inspectionN.component';
import { OutcomeMeasurementToolsComponent } from './outcome-measurement-tools/outcome-measurement-tools.component';
import { ObservationNComponent } from './observationN/observation-n.component';
import { Inspection } from './inspectionN/models/Inspection';
import { Omt } from './outcome-measurement-tools/models/Omt';
import { Observation } from './observationN/models/Observation';
import { RangeOfMotion } from './range-of-motion/models/RangeOfMotion';
import { Strength } from './strengthN/models/Strength';
import { NeuroVascular } from './neuro-vascular/models/NeuroVascular';
import { SpecialTest } from './special-tests/model/SpecialTest';
import { Palpation } from './palpationN/model/Palpation';

@Component({
  selector: 'objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectiveComponent implements OnInit, AfterViewInit {
  objectiveForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @ViewChild(InspectionNComponent) inspectionComponent: InspectionNComponent;
  @ViewChild(OutcomeMeasurementToolsComponent) omtComponent: OutcomeMeasurementToolsComponent;
  @ViewChild(ObservationNComponent) observationComponent: ObservationNComponent;
  selectedProfile: any = null
  @Input() objectiveData: any
  @Input() isNotInitialExaminationNote: boolean = false
  @Input() noteType: string
  @Input() noteId: string
  inspectionData: Inspection | null = null;
  omtData: Omt | null = null
  observationData: Observation | null = null
  romData: RangeOfMotion | null = null;
  strengthData: Strength | null = null;
  neuroVascularData: NeuroVascular | null = null;
  specialTestData: SpecialTest | null = null;
  palpationData:Palpation | null = null;

  // Track which sections are expanded (visible) and which have been rendered at least once
  expandedSections: { [key: string]: boolean } = {};
  renderedSections: { [key: string]: boolean } = {};
  objectiveCategories: string[] = [
    'inspection', "omt", 'observation', 'range_of_motion', 'strength', 'neuro_vascular', 'special_tests', 'palpation'
  ]
  profiles: ObjectiveProfile[] = [
    { id: 1, name: 'Jaw', active: false },
    { id: 2, name: 'Cervical', active: false },
    { id: 3, name: 'Shoulder', active: false },
    { id: 4, name: 'Elbow', active: false },
    { id: 5, name: 'Wrist/Hand', active: false },
    { id: 6, name: 'Thoracic Spine Ribs', active: false },
    { id: 7, name: 'Lumbar/Pelvis', active: false },
    { id: 8, name: 'Hip', active: false },
    { id: 9, name: 'Knee', active: false },
    { id: 10, name: 'Ankle', active: false },
    { id: 11, name: 'Foot', active: false },
    { id: 12, name: 'General', active: true },
    { id: 13, name: 'Vestibular', active: false },
    { id: 14, name: 'Pelvic Health', active: false },
    { id: 15, name: 'Speech', active: false }
  ]
  isProfileSelected: boolean = false
  objectiveCategoriesfields: { [key: string]: any } = {};
  constructor(private fb: FormBuilder
    , private medicalService: MedialNoteService
    , private soapService: SoapService
    , private cdr: ChangeDetectorRef) { }

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
    this.formReady.emit(this.objectiveForm);

    // Extract inspection data if objectiveData is provided
    if (this.objectiveData?.inspection) {
      this.inspectionData = this.objectiveData.inspection;
    }

    // Extract omt data if objectiveData is provided
    if (this.objectiveData?.omt) {
      this.omtData = this.objectiveData?.omt;
    }
    if (this.objectiveData?.observation) {
      this.observationData = this.objectiveData?.observation
    }
    if (this.objectiveData?.rom) {
      this.romData = this.objectiveData?.rom
    }
    if (this.objectiveData?.strength) {
      this.strengthData = this.objectiveData?.strength
    }
    if(this.objectiveData?.neuroVascular){
      this.neuroVascularData = this.objectiveData?.neuroVascular;
    }
    if(this.objectiveData?.specialTest){
        this.specialTestData = this.objectiveData?.specialTest;
    }
    if(this.objectiveData?.palpation){
      this.palpationData = this.objectiveData?.palpation;
    }

    // Subscribe to profile form control changes and sync with selectedProfile
    // Use startWith to also handle initial value
    this.objectiveForm.get('profile')?.valueChanges
      .pipe(startWith(this.objectiveForm.get('profile')?.value))
      .subscribe(value => {
        if (value) {
          this.selectedProfile = value;
          this.isProfileSelected = true;
        }
      });
  }

  ngAfterViewInit(): void {
    // Additional check after view init to handle any timing issues
    setTimeout(() => {
      const profileValue = this.objectiveForm.get('profile')?.value;
      if (profileValue && !this.isProfileSelected) {
        this.selectedProfile = profileValue;
        this.isProfileSelected = true;
      }
    }, 100);
  }
  get activeProfiles(): ObjectiveProfile[] {
    return this.profiles.filter(p => p.active);
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.objectiveForm.setControl(section, formGroup);
  }
  next() {
    this.stepper.next();
  }
  selectProfile() {
    this.selectedProfile = this.objectiveForm.get('profile')?.value;
    this.isProfileSelected = true;
    this.formReady.emit(this.objectiveForm);
  }
  toggleSection(section: string) {
    this.expandedSections[section] = !this.expandedSections[section];
    if (this.expandedSections[section]) {
      this.renderedSections[section] = true;
    }
    this.cdr.markForCheck();
  }

  isSectionExpanded(section: string): boolean {
    return !!this.expandedSections[section];
  }

  isSectionRendered(section: string): boolean {
    return !!this.renderedSections[section];
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
  getOmtModel(): Omt | null {
    if (this.omtComponent) {
      return this.omtComponent.getOutcomeMeasurementToolsModel();
    }
    return null;
  }

  /**
   * Get the Observation model from ObservationN component
   * Returns null if component is not available
   */
  getObservationModel(): Observation | null {
    if (this.observationComponent) {
      return this.observationComponent.getObservationModel();
    }
    return null;
  }
}

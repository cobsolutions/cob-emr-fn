import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { CPTBillingConverter } from '../components/billing/util/cpt.billing.code.converter';
import { InitSubjectiveBasicMapper } from '../mapper/init.subjective.basic.mapper';
import { MedicalHistoryMapper } from '../mapper/medical.history.mapper';
import { ObjectiveComponent } from '../components/objective/objective.component';
import { SubjectiveMapperService } from '../components/subjective/services/subjective-mapper.service';

@Component({
  selector: 'initial-examination',
  templateUrl: './initial-examination.component.html',
  styleUrls: ['./initial-examination.component.css']
})
export class InitialExaminationComponent implements OnInit {

  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  initialExaminationForm: FormGroup
  @ViewChild('stepper') stepper!: MatStepper; // Get MatStepper reference
  @ViewChild(ObjectiveComponent) objectiveComponent: ObjectiveComponent;
  @Output() formReady = new EventEmitter<FormGroup>();
  visitedSteps: boolean[] = [];
  @Output() back = new EventEmitter<void>();
  @Input() medicalNoteId: number
  @Input() noteId: string
  noteCreator: string
  noteFinalizr: string
  @Input() caseId: number
  medicalNoteSOAP: any
  type: MedicalNoteType = MedicalNoteType.Initial_Examination;
  isLoaded: boolean = false;
  private finalizeSub!: Subscription;
  constructor(private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService,
    private initialExamNoteService: InitialExamNoteService,
    private subjectiveMapper: SubjectiveMapperService) {

  }
  ngOnInit(): void {
    this.finalizeSub = this.medialNoteService.finalize$.subscribe((status) => {
      if (status) {
        const request: FinalizeMedicalNoteRequest = {
          caseId: this.caseId,
          id: this.medicalNoteId,
          noteType: MedicalNoteType.Initial_Examination,
          finalizedBy: this.loggedInService.getLoggedUser().uuid
        }
        this.draftAction().subscribe(d => {
          this.initialExamNoteService.finalize(this.noteId).subscribe(v => {
            this.backtoPatientRecordActions();
          });
        });
      }
    });
    this.visitedSteps = [true, false, false, false, false]
    this.initialExaminationForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
    if (this.medicalNoteId !== undefined) {
      this.initialExamNoteService.get(this.noteId).subscribe((data: any) => {
        this.isLoaded = true
        this.noteCreator = data.createdBy;
        this.noteFinalizr = data.finalizedBy;
        this.medicalNoteSOAP = data
      })
      // this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
      //   this.isLoaded = true
      //   this.noteCreator = data.createdBy;
      //   this.noteFinalizr = data.finalizedBy;
      //   this.medicalNoteSOAP = data
      // })
    }
  }
  ngOnDestroy() {
    this.finalizeSub?.unsubscribe();
  }
  setFormValues(formGroup: FormGroup, data: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.setValue(data[key] ?? null);
      } else if (control instanceof FormGroup) {
        this.setFormValues(control, data[key] ?? {});
      } else if (control instanceof FormArray && Array.isArray(data[key])) {
        control.clear(); // Clear the existing FormArray
        data[key].forEach((item: any) => {
          if (control instanceof FormArray) {
            const group = this.fb.group({}); // Create a new FormGroup structure
            this.setFormValues(group, item);
            control.push(group);
          }
        });
      }
    });
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.initialExaminationForm.setControl(section, formGroup);
  }
  soapActions(action: string) {
    if (action === 'back')
      this.backtoPatientRecordActions()
    if (action === 'draft') {
      const formValues = this.getAllFormValues(this.initialExaminationForm);
      console.log('Form Values:', formValues.planOfCare);
      console.log('Mapped Subjective:', this.subjectiveMapper.toModel(formValues.subjective));
      // var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel();
      // console.log(medicalNoteRequest)
    }
    // this.draft();
  }
  backtoPatientRecordActions() {
    this.back.emit();
  }
  private buildMedicalNoteModel(): MedicalNoteRequest {
    var createdNote: any = this.getAllFormValues(this.initialExaminationForm)

    // Get structured models from ObjectiveComponent if available
    if (this.objectiveComponent && createdNote.objective) {
      // Get the inspection model
      const inspectionModel = this.objectiveComponent.getInspectionModel();
      if (inspectionModel) {
        createdNote.objective.inspection = inspectionModel;
      }

      // Get the OMT model
      const omtModel = this.objectiveComponent.getOmtModel();
      if (omtModel) {
        createdNote.objective.omt = omtModel;
      }
    }

    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: this.subjectiveMapper.toModel(createdNote.subjective),
      objective: Object.keys(createdNote.objective).length === 0 ? null : createdNote.objective,
      assessment: Object.keys(createdNote.assessment).length === 0 ? null : createdNote.assessment,
      planOfCare: Object.keys(createdNote.planOfCare).length === 0 ? null : createdNote.planOfCare,
      billing: Object.keys(createdNote.billing).length === 0 ? null : CPTBillingConverter.convertBillingSections(createdNote.billing)
    }
    medicalNoteRequest.dateOfService = moment(medicalNoteRequest.subjective.basic.dateOfInitialExamination).endOf('day').valueOf();
    return medicalNoteRequest;
  }
  draft() {
    this.draftAction().subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
  draftAction(): Observable<any> {
    var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel();
    return this.initialExamNoteService.draft(medicalNoteRequest, this.noteId);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        values[key] = this.normalizeValue(control.value);
      }

      else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control);
      }

      else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup
            ? this.getAllFormValues(ctrl)
            : this.normalizeValue(ctrl.value)
        );
      }
    });

    return values;
  }
  private normalizeValue(val: any): any {
    if (val === 'yes') return true;
    if (val === 'no') return false;
    if (val === 'na' || val === 'N/A') return null;
    return val;
  }

}

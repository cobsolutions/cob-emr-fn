import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { CPTBillingConverter } from '../components/billing/util/cpt.billing.code.converter';
import { InitSubjectiveBasicMapper } from '../mapper/init.subjective.basic.mapper';

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
  @Output() formReady = new EventEmitter<FormGroup>();
  visitedSteps: boolean[] = [];
  @Output() back = new EventEmitter<void>();
  @Input() medicalNoteId: number
  noteCreator: string
  noteFinalizr: string
  @Input() caseId: number
  medicalNoteSOAP: any
  type: MedicalNoteType = MedicalNoteType.Initial_Examination;
  isLoaded: boolean = false;
  private finalizeSub!: Subscription;
  constructor(private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService) {

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
          this.medialNoteService.finalizea(request).subscribe(v => {
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
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.isLoaded = true
        this.noteCreator = data.createdBy;
        this.noteFinalizr = data.finalizedBy;
        this.medicalNoteSOAP = data
      })
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
    if (action === 'draft')
      this.draft();
  }
  backtoPatientRecordActions() {
    this.back.emit();
  }
  private buildMedicalNoteModel(): MedicalNoteRequest {
    var createdNote: any = this.getAllFormValues(this.initialExaminationForm)    
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: createdNote.subjective,
      objective: Object.keys(createdNote.objective).length === 0 ? null : createdNote.objective,
      assessment: Object.keys(createdNote.assessment).length === 0 ? null : createdNote.assessment,
      planOfCare: Object.keys(createdNote.planOfCare).length === 0 ? null : createdNote.planOfCare,
      billing: Object.keys(createdNote.billing).length === 0 ? null : CPTBillingConverter.convertBillingSections(createdNote.billing)
    }
    medicalNoteRequest.dateOfService = moment(medicalNoteRequest.subjective.basic.dateOfInitialExamination).endOf('day').valueOf();
    InitSubjectiveBasicMapper.mapper(medicalNoteRequest.subjective.basic)
    return medicalNoteRequest;
  }
  draft() {
    this.draftAction().subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
  draftAction(): Observable<any> {
    var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel();
    return this.medialNoteService.draft(medicalNoteRequest);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
  
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
  
      if (control instanceof FormControl) {
        let value = control.value;
  
        // Normalize radio buttons: yes/no → true/false
        if (value === 'yes') value = true;
        else if (value === 'no') value = false;
  
        values[key] = value;
  
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control);
  
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : (
            ctrl.value === 'yes' ? true :
            ctrl.value === 'no' ? false :
            ctrl.value
          )
        );
      }
    });
    return values;
  }  
}

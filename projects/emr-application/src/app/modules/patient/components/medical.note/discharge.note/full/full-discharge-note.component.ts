import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { filter } from 'rxjs';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';

@Component({
  selector: 'full-discharge-note',
  templateUrl: './full-discharge-note.component.html',
  styleUrls: ['./full-discharge-note.component.css']
})
export class FullDischargeNoteComponent implements OnInit {
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  dischargeNoteForm: FormGroup
  visitedSteps: boolean[] = [];
  @Input() medicalNoteId: number
  @Input() caseId: number
  medicalNoteSOAP: any
  @Output() back = new EventEmitter<void>();
  noteCreator: string
  noteFinalizr: string
  type: MedicalNoteType = MedicalNoteType.Discharge_Note;
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.medialNoteService.noteType$.next('discharge')
    this.visitedSteps = [true, false, false, false, false]
    this.dischargeNoteForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.noteCreator = data.createdBy;
        this.noteFinalizr = data.finalizedBy;
        this.medicalNoteSOAP = data
      })
    this.handleNoteFinalization()
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
    var createdNote: any = this.getAllFormValues(this.dischargeNoteForm)
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: createdNote.subjective,
      objective: Object.keys(createdNote.objective).length === 0 ? null : createdNote.objective,
      assessment: Object.keys(createdNote.assessment).length === 0 ? null : createdNote.assessment,
      planOfCare: Object.keys(createdNote.planOfCare).length === 0 ? null : createdNote.planOfCare,
      billing: Object.keys(createdNote.billing).length === 0 ? null : createdNote.billing
    }
    return medicalNoteRequest;
  }
  private draft() {
    var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel()
    this.medialNoteService.draft(medicalNoteRequest).subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.dischargeNoteForm.setControl(section, formGroup);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control); // Recursively get values from nested FormGroup
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }
  private handleNoteFinalization() {
  }
}

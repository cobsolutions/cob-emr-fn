import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';

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
  @Input() caseId: number
  medicalNoteSOAP: any
  constructor(private fb: FormBuilder, private medialNoteService: MedialNoteService) {

  }
  ngOnInit(): void {
    this.visitedSteps = [true, false, false, false, false]
    this.initialExaminationForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
    this.medialNoteService.noteType$.next('init_exam')
    console.log(this.medicalNoteId)
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.medicalNoteSOAP = data
      })
    else {
    }
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
  draft() {
    var createdNote: any = this.getAllFormValues(this.initialExaminationForm)
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: createdNote.subjective,
      objective:Object.keys(createdNote.objective).length === 0 ? null : createdNote.objective,
      assessment: Object.keys(createdNote.assessment).length === 0 ? null : createdNote.assessment,
      planOfCare: Object.keys(createdNote.planOfCare).length === 0 ? null : createdNote.planOfCare,
      billing: Object.keys(createdNote.billing).length === 0 ? null : createdNote.billing
      
    }
    console.log(JSON.stringify(medicalNoteRequest))
    this.medialNoteService.draft(medicalNoteRequest).subscribe(data => {
      this.backtoPatientRecordActions();
    })
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
}

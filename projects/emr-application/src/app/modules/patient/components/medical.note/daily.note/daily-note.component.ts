import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
@Component({
  selector: 'daily-note',
  templateUrl: './daily-note.component.html',
  styleUrls: ['./daily-note.component.css']
})
export class DailyNoteComponent implements OnInit {

  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  dailyNoteForm: FormGroup
  visitedSteps: boolean[] = [];
  @Input() medicalNoteId: number
  @Input() caseId: number
  medicalNoteSOAP: any
  @Output() back = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.medialNoteService.noteType$.next('daily')
    this.visitedSteps = [true, false, false, false]
    this.dailyNoteForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
    });
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.medicalNoteSOAP = data
      })
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

  private draft() {
    var createdNote: any = this.getAllFormValues(this.dailyNoteForm)
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: createdNote.subjective,
      objective: Object.keys(createdNote.objective).length === 0 ? null : createdNote.objective,
      assessment: Object.keys(createdNote.assessment).length === 0 ? null : createdNote.assessment,
      planOfCare: Object.keys(createdNote.planOfCare).length === 0 ? null : createdNote.planOfCare,

    }
    console.log(JSON.stringify(medicalNoteRequest))
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
    this.dailyNoteForm.setControl(section, formGroup);
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

import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';

@Component({
  selector: 'progress-note',
  templateUrl: './progress-note.component.html',
  styleUrls: ['./progress-note.component.css']
})
export class ProgressNoteComponent implements OnInit {
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  progressNoteForm: FormGroup
  visitedSteps: boolean[] = [];
  @Input() medicalNoteId: number
  @Input() caseId: number
  medicalNoteSOAP: any
  @Output() back = new EventEmitter<void>();
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.medialNoteService.noteType$.next('progress')
    this.visitedSteps = [true, false, false, false, false]
    this.progressNoteForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.medicalNoteSOAP = data
        console.log(JSON.stringify(this.medicalNoteSOAP))
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
  private draft() { }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.progressNoteForm.setControl(section, formGroup);
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

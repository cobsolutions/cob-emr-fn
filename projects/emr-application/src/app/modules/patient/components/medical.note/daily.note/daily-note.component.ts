import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    console.log(this.medicalNoteId)
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

  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.dailyNoteForm.setControl(section, formGroup);
  }
}

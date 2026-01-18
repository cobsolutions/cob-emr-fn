import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MedicalNoteType } from '../../../../../models/medical.note/medical.note.type';

@Component({
  selector: 'daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrls: ['./daily-plan.component.css']
})
export class DailyPlanComponent implements OnInit {
  dailyPlanForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() planData: any
  @Input() noteId: number
  @Input() noteType: MedicalNoteType
  @Input() caseId: string
  forwardVisibility: boolean = false;
  finalizeNoteVisibility: boolean = false;
  @Input() creator: string
  @Input() noteFinalizr: string
  @Output() backToRecord = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dailyPlanForm = this.fb.group({
      instructions: ['DN1'],
      instructionTxt: [''],
    })
    if (this.planData && this.planData['instructions']) {
      this.dailyPlanForm.get('instructions').setValue(this.planData['instructions'])
    }
    if (this.planData && this.planData['instructionTxt']) {
      this.dailyPlanForm.get('instructionTxt').setValue(this.planData['instructionTxt'])
    }
    this.formReady.emit(this.dailyPlanForm);
  }
  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility
  }
  finalize() {
    this.finalizeNoteVisibility = true;
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }
  togglefinalize() {
    this.finalizeNoteVisibility = !this.finalizeNoteVisibility
  }
  changeFinalizeNoteVisibility(event: any) {
    if (event === 'no') {
      this.finalizeNoteVisibility = false
    }
    if (event === 'yes') {
      this.finalizeNoteVisibility = false
      this.toastr.success('Medical note has been finalized');
    }
  }
}

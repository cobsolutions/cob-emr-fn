import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  forwardVisibility: boolean = false;
  constructor(private fb: FormBuilder) { }

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
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrls: ['./daily-plan.component.css']
})
export class DailyPlanComponent implements OnInit {
  dailyPlanForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dailyPlanForm = this.fb.group({
      instructions: ['DN1'],
      instructionTxt: [''],
    })
  }

}

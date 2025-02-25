import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({});
  }
  next() {
    this.stepper.next();
  }
}

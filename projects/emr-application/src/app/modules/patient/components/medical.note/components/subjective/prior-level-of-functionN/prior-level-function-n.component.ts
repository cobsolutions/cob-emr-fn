import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prior-level-function-n',
  templateUrl: './prior-level-function-n.component.html',
  styleUrls: ['./prior-level-function-n.component.css']
})
export class PriorLevelFunctionNComponent implements OnInit {
  priorLevelFunctionForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.priorLevelFunctionForm);
  }
  initForm() {
    throw new Error('Method not implemented.');
  }
  setupValueChangeListeners() {
    throw new Error('Method not implemented.');
  }

}

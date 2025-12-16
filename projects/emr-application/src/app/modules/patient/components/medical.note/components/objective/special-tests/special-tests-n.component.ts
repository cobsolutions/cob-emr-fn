import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-special-tests-n',
  templateUrl: './special-tests-n.component.html',
  styleUrls: ['./special-tests-n.component.css']
})
export class SpecialTestsNComponent implements OnInit {
  specialTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  initForm() {
    throw new Error('Method not implemented.');
  }
  setupValueChangeListeners() {
    throw new Error('Method not implemented.');
  }

}

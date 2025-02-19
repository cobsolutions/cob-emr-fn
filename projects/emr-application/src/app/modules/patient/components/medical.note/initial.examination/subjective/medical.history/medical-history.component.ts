import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  medicalHistoryForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor() { }

  ngOnInit(): void {

    this.formReady.emit(this.medicalHistoryForm);
  }

}

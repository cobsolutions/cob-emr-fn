import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'plan-modalities-n',
  templateUrl: './modalities-n.component.html',
  styleUrls: ['./modalities-n.component.css']
})
export class ModalitiesNComponent implements OnInit {
  ModalitiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.formReady.emit(this.ModalitiesForm);
  }
  initForm() {
    this.ModalitiesForm = this.fb.group({});
  }

}

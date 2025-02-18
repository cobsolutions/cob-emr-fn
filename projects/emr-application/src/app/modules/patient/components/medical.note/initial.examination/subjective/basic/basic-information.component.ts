import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  basicForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      'init_date': new FormControl(null, [Validators.required]),
      'time_in_out': new FormControl(null, [Validators.required]),
      'number_of_visit': new FormControl(null, [Validators.required])

    });
    this.formReady.emit(this.basicForm);
  }

}

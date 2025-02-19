import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'prior-level-function',
  templateUrl: './prior-level-function.component.html',
  styleUrls: ['./prior-level-function.component.css']
})
export class PriorLevelFunctionComponent implements OnInit {
  priorLevelFunctionForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.priorLevelFunctionForm = this.fb.group({
      'self_care': new FormControl(null, [Validators.required]),
      'mobility': new FormControl(null, [Validators.required]),
      'other': new FormControl(null, [Validators.required]),

      'body_position': new FormControl(null, [Validators.required]),
      'handling_object': new FormControl(null, [Validators.required]),
      

    })
    this.formReady.emit(this.priorLevelFunctionForm);
  }

}

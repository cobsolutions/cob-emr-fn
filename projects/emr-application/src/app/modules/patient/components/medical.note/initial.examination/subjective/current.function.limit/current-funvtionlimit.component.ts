import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'current-functionlimit',
  templateUrl: './current-funvtionlimit.component.html',
  styleUrls: ['./current-funvtionlimit.component.css']
})
export class CurrentFunvtionlimitComponent implements OnInit {
  currentFunctionForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentFunctionForm = this.fb.group({
      'self_care': new FormControl(null, [Validators.required]),
      'mobility': new FormControl(null, [Validators.required]),
      'other': new FormControl(null, [Validators.required]),

      'body_position': new FormControl(null, [Validators.required]),
      'handling_object': new FormControl(null, [Validators.required]),


    })
    this.formReady.emit(this.currentFunctionForm);
  }

}

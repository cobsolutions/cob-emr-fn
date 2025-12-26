import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-untimed-codes-n',
  templateUrl: './untimed-codes-n.component.html',
  styleUrls: ['./untimed-codes-n.component.css']
})
export class UntimedCodesNComponent implements OnInit {
  UntimedCodes: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.UntimedCodes = this.fb.group({});
  }

}

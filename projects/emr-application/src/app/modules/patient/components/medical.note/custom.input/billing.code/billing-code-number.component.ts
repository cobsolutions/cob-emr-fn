import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'billing-code-number',
  templateUrl: './billing-code-number.component.html',
  styleUrls: ['./billing-code-number.component.css']
})
export class BillingCodeNumberComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() label: string
  @Input() value: string
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.addControl(this.value, this.fb.control(null));
  }

}

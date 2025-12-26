import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { STRAPPING_CODES_DATA } from './STRAPPING_CODES_DATA';

@Component({
  selector: 'app-strapping-n',
  templateUrl: './strapping-n.component.html',
  styleUrls: ['./strapping-n.component.css']
})
export class StrappingNComponent implements OnInit {
  StrappingForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  sctrappingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCPTCodes();
  }
  initForm() {
    this.StrappingForm = this.fb.group({});
    this.formReady.emit(this.StrappingForm);
  }
  loadCPTCodes() {
    this.sctrappingCPTCodeList = STRAPPING_CODES_DATA;
    this.sctrappingCPTCodeList.forEach(code => {
      this.checkedCodes.set(code.cpt, false);
    });
  }

}

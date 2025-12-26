import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { CALENDAR_CODES_DATA } from './CALENDAR_CODES_DATA';

@Component({
  selector: 'billing-calendar-month-n',
  templateUrl: './calendar-month-n.component.html',
  styleUrls: ['./calendar-month-n.component.css']
})
export class CalendarMonthNComponent implements OnInit {
  CalendarMonthForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
  }
  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [0];
    });

    this.CalendarMonthForm = this.fb.group(formControls);
    this.formReady.emit(this.CalendarMonthForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = CALENDAR_CODES_DATA;
  }
  hasValue(cpt: string): boolean {
    const value = this.CalendarMonthForm.get(cpt)?.value;
    return value && value > 0;
  }

}

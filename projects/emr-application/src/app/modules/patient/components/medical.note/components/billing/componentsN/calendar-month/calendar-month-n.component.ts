import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { CALENDAR_CODES_DATA } from './CALENDAR_CODES_DATA';
import { calendarMonth } from '../../model/calendarMonth';

@Component({
  selector: 'billing-calendar-month-n',
  templateUrl: './calendar-month-n.component.html',
  styleUrls: ['./calendar-month-n.component.css']
})
export class CalendarMonthNComponent implements OnInit, OnChanges {
  CalendarMonthForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() calendarMonthData: calendarMonth;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calendarMonthData'] && this.calendarMonthData && this.CalendarMonthForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.calendarMonthData?.codes || !this.CalendarMonthForm) return;
    this.calendarMonthData.codes.forEach(item => {
      const quantityControl = this.CalendarMonthForm.get(item.code);
      const notesControl = this.CalendarMonthForm.get(item.code + '_notes');
      if (quantityControl) {
        quantityControl.setValue(item.quantity || 0);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [0];
      formControls[code.cpt + '_notes'] = [''];
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

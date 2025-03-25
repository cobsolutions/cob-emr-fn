import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../../filed.control.style.selector/field.control.style';
import { CalendarMonthStyles } from './styles/calendar.month';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css']
})
export class CalendarMonthComponent implements OnInit {
  CalendarMonthForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() calendarMonthData: any
  styles: FieldControlStyles[] = CalendarMonthStyles;
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.CalendarMonthForm = this.fb.group({})
    if (this.calendarMonthData)
    setTimeout(() => {
      this.CalendarMonthForm.patchValue(this.calendarMonthData);
    }, 10);
    this.formReady.emit(this.CalendarMonthForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}

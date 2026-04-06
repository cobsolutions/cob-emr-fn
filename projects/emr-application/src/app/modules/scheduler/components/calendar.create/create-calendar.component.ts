import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { CalendarServiceService } from '../../service/calendar/calendar-service.service';

@Component({
  selector: 'create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent implements OnInit, OnDestroy {

  createCalendarForm: FormGroup
  isValidForm: boolean = false;
  isCreating: boolean = false;
  @Output() changeCreateVisibility = new EventEmitter<string>()
  @Input() clinicId: number;
  constructor(private toastrService: ToastrService, private calendarServiceService: CalendarServiceService, private loggedInService: LoggedInService) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.createClinicForm()
  }
  private createClinicForm() {
    this.createCalendarForm = new FormGroup({
      'calendar-name': new FormControl(null, [Validators.required]),
      'is-public': new FormControl(false),
    })
  }
  create() {
    if (this.createCalendarForm?.valid) {
      this.isValidForm = false;
      this.isCreating = true;
      var model: Calendar = this.buildCalendarModel();
      model.createdBy = this.loggedInService.getLoggedUser().uuid;
      model.clinicId = this.clinicId;
      this.calendarServiceService.create(model)
        .subscribe({
          next: () => {
            this.isCreating = false;
            this.toastrService.success('Calendar created successfully');
            this.changeCreateVisibility.emit('close');
          },
          error: () => {
            this.isCreating = false;
            this.toastrService.error('Failed to create calendar');
          }
        });
    } else {
      this.isValidForm = true;
      this.createCalendarForm.markAllAsTouched();
    }
  }
  cancel() {
    this.changeCreateVisibility.emit('close');
  }
  private buildCalendarModel(): Calendar {
    var calendar: Calendar = {
      name: this.createCalendarForm.controls['calendar-name'].value,
      isPublic: this.createCalendarForm.controls['is-public'].value ?? false,
    }
    return calendar;
  }
}

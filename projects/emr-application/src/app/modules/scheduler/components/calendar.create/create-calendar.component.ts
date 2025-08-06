import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs';
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
  @Output() changeCreateVisibility = new EventEmitter<string>()
  @Input() clinicId: number;
  constructor(private toastrService: ToastrService, private calendarServiceService: CalendarServiceService, private loggedInService: LoggedInService) { }
  ngOnDestroy(): void {
    console.log('Create Calendar component is destoried ')
  }

  ngOnInit(): void {
    console.log('open CreateCalendarComponent')
    this.createClinicForm()
  }
  private createClinicForm() {
    this.createCalendarForm = new FormGroup({
      'calendar-name': new FormControl(null, [Validators.required]),
      'is-public': new FormControl(null),
    })
  }
  create() {
    var model: Calendar;
    if (this.createCalendarForm?.valid) {
      this.isValidForm = false;
      model = this.buildCalendarModel();
      model.createdBy = this.loggedInService.getLoggedUser().uuid;
      model.clinicId = this.clinicId
      this.calendarServiceService.create(model)
        .subscribe(result => {
          this.changeCreateVisibility.emit('close');
        })
    } else {
      this.isValidForm = true;
    }
  }
  private buildCalendarModel(): Calendar {
    var calendar: Calendar = {
      name: this.createCalendarForm.controls['calendar-name'].value,
      isPublic: this.createCalendarForm.controls['is-public'].value,
    }
    return calendar;
  }
}

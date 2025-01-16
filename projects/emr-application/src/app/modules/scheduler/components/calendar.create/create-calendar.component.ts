import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { CalendarServiceService } from '../../service/calendar/calendar-service.service';

@Component({
  selector: 'create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent implements OnInit {

  calendarForm: FormGroup
  isValidForm: boolean = false;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private toastrService: ToastrService, private calendarServiceService: CalendarServiceService, private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.createClinicForm()
  }
  private createClinicForm() {
    this.calendarForm = new FormGroup({
      'calendar-name': new FormControl(null, [Validators.required]),
      'is-public': new FormControl(null),
    })
  }
  create() {
    var model: Calendar;
    if (this.calendarForm?.valid) {
      this.isValidForm = false;
      model = this.buildCalendarModel();
      model.createdBy = this.loggedInService.getLoggedUser().uuid;
      this.calendarServiceService.create(model)
        .subscribe(result => {
          this.changeVisibility.emit('close');
        })
    } else {
      this.isValidForm = true;
    }
  }
  private buildCalendarModel(): Calendar {
    var calendar: Calendar = {
      name: this.calendarForm.controls['calendar-name'].value,
      isPublic: this.calendarForm.controls['is-public'].value,
    }
    return calendar;
  }
}

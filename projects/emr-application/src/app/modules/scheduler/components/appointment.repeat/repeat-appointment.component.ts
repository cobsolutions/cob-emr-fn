import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DailyRepeatAppointment } from '../../models/repeat/daily.repeat.appointment';

@Component({
  selector: 'repeat-appointment',
  templateUrl: './repeat-appointment.component.html',
  styleUrls: ['./repeat-appointment.component.css']
})
export class RepeatAppointmentComponent implements OnInit {
  @Input() repeatType: string
  dailyRepeatAppointment: DailyRepeatAppointment = {}
  constructor() { }

  ngOnInit(): void {
  }

  changeDailyStartDate(startDate: Date) {
    this.dailyRepeatAppointment.start = moment(startDate).unix() * 1000
  }
  changeDailyEndDate(endDate: Date) {
    this.dailyRepeatAppointment.end = moment(endDate).unix() * 1000
  }
}

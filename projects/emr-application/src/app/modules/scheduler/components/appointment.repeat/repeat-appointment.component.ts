import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Day, WeekDays } from '../../models/constant/week.days';
import { DailyRepeatAppointment } from '../../models/repeat/daily.repeat.appointment';
import { WeeklyRepeatAppointment } from '../../models/repeat/weekly.repeat.appointment';

@Component({
  selector: 'repeat-appointment',
  templateUrl: './repeat-appointment.component.html',
  styleUrls: ['./repeat-appointment.component.css']
})
export class RepeatAppointmentComponent implements OnInit {
  @Input() repeatType: string
  days: Day[] = WeekDays;
  dailyRepeatAppointment: DailyRepeatAppointment = {}
  weeklyRepeatAppointment: WeeklyRepeatAppointment = {}
  constructor() { }

  ngOnInit(): void {
  }

  changeDailyStartDate(startDate: Date) {
    this.dailyRepeatAppointment.start = moment(startDate).unix() * 1000
  }
  changeDailyEndDate(endDate: Date) {
    this.dailyRepeatAppointment.end = moment(endDate).unix() * 1000
  }
  changeWeeklyStartDate(startDate: Date) {
    this.weeklyRepeatAppointment.start = moment(startDate).unix() * 1000
  }
  changeWeeklyEndDate(endDate: Date) {
    this.weeklyRepeatAppointment.end = moment(endDate).unix() * 1000
  }
}

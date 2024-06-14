import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Day, WeekDays } from '../../models/constant/week.days';
import { DailyRepeatAppointment } from '../../models/repeat/daily.repeat.appointment';
import { MonthlyRepeatAppointment } from '../../models/repeat/monthly.repeat.appointment';
import { WeeklyRepeatAppointment } from '../../models/repeat/weekly.repeat.appointment';
import { YearlyRepeatAppointment } from '../../models/repeat/yearly.repeat.appointment';
import { AppointmentService } from '../../service/appointment.service';
import { days, MonthlyRepetitionbuilder } from './util/monthly.day.repetition';

@Component({
  selector: 'repeat-appointment',
  templateUrl: './repeat-appointment.component.html',
  styleUrls: ['./repeat-appointment.component.css']
})
export class RepeatAppointmentComponent implements OnInit {
  @Input() repeatType: string
  days: Day[] = WeekDays;
  dayMonth: days[]
  dailyRepeatAppointment: DailyRepeatAppointment = {}
  weeklyRepeatAppointment: WeeklyRepeatAppointment = {}
  monthlyRepeatAppointment: MonthlyRepeatAppointment = {}
  yearlyRepeatAppointment: YearlyRepeatAppointment = {}
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.appointmnetStartDate$.subscribe(startDate => {
      this.dayMonth = MonthlyRepetitionbuilder.build(startDate);

    })
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
  changeMonthlyStartDate(startDate: Date) {
    this.monthlyRepeatAppointment.start = moment(startDate).unix() * 1000
  }
  changeMonthlyEndDate(endDate: Date) {
    this.monthlyRepeatAppointment.end = moment(endDate).unix() * 1000
  }
  changeYearlyStartDate(startDate: Date) {
    this.yearlyRepeatAppointment.start = moment(startDate).unix() * 1000
  }
  changeYearlEndDate(endDate: Date) {
    this.yearlyRepeatAppointment.end = moment(endDate).unix() * 1000
  }
}

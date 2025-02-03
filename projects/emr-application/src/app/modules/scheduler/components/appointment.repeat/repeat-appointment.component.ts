import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { Day, WeekDays } from '../../models/constant/week.days';
import { AppointmentRepetitionConfiguration } from '../../models/repeat/appointment.repetition.configuration';
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
  @Input() configuration: AppointmentRepetitionConfiguration
  days: Day[] = WeekDays;
  dayMonth: days[]
  dailyRepeatAppointment: DailyRepeatAppointment = {}
  weeklyRepeatAppointment: WeeklyRepeatAppointment = {}
  monthlyRepeatAppointment: MonthlyRepeatAppointment = {}
  yearlyRepeatAppointment: YearlyRepeatAppointment = {}
  startDate: Date
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.appointmnetStartDate$.pipe(
      filter(startDate => startDate !== null)
    )
      .subscribe(startDate => {
        this.startDate = startDate;
        this.dayMonth = MonthlyRepetitionbuilder.build(startDate);
        this.fillRepeatConfiguration(this.configuration);
      })
  }

  changeDailyStartDate(startDate: Date) {
    this.dailyRepeatAppointment.startDate = moment(startDate).unix() * 1000
  }
  changeDailyEndDate(endDate: Date) {
    this.dailyRepeatAppointment.endDate = moment(endDate).unix() * 1000
  }
  changeWeeklyStartDate(startDate: Date) {
    this.weeklyRepeatAppointment.startDate = moment(startDate).unix() * 1000
  }
  changeWeeklyEndDate(endDate: Date) {
    this.weeklyRepeatAppointment.endDate = moment(endDate).unix() * 1000
  }
  changeMonthlyStartDate(startDate: Date) {
    this.monthlyRepeatAppointment.startDate = moment(startDate).unix() * 1000
  }
  changeMonthlyEndDate(endDate: Date) {
    this.monthlyRepeatAppointment.endDate = moment(endDate).unix() * 1000
  }
  changeYearlyStartDate(startDate: Date) {
    this.yearlyRepeatAppointment.startDate = moment(startDate).unix() * 1000
    this.yearlyRepeatAppointment.initDate = this.yearlyRepeatAppointment.startDate;
  }
  changeYearlEndDate(endDate: Date) {
    this.yearlyRepeatAppointment.endDate = moment(endDate).unix() * 1000
  }
  private fillRepeatConfiguration(configuration: AppointmentRepetitionConfiguration) {
    switch (configuration.appointmentRepetitionType) {
      case 'Daily':
        this.dailyRepeatAppointment = configuration.daily ? configuration.daily : {};
        if (this.dailyRepeatAppointment.startDate)
          this.dailyRepeatAppointment._dateStart = moment.unix(this.dailyRepeatAppointment.startDate / 1000).toDate();
        if (this.dailyRepeatAppointment.endDate)
          this.dailyRepeatAppointment._dateEnd = moment.unix(this.dailyRepeatAppointment.endDate / 1000).toDate();
        break;
      case 'Weekly':
        this.weeklyRepeatAppointment = configuration.weekly ? configuration.weekly : {}
        if (this.weeklyRepeatAppointment.startDate)
          this.weeklyRepeatAppointment._dateStart = moment.unix(this.weeklyRepeatAppointment.startDate / 1000).toDate();
        if (this.weeklyRepeatAppointment.endDate)
          this.weeklyRepeatAppointment._dateEnd = moment.unix(this.weeklyRepeatAppointment.endDate / 1000).toDate();
        if (this.weeklyRepeatAppointment.days !== undefined)
          for (var i = 0; i < this.days.length; i++) {
            if (this.weeklyRepeatAppointment.days.includes(this.days[i].dayNumber))
              this.days[i].selected = true;
          }
        break;
      case 'Monthly':
        this.monthlyRepeatAppointment = configuration.monthly ? configuration.monthly : {}
        if (this.monthlyRepeatAppointment.startDate)
          this.monthlyRepeatAppointment._dateStart = moment.unix(this.monthlyRepeatAppointment.startDate / 1000).toDate();
        if (this.monthlyRepeatAppointment.endDate)
          this.monthlyRepeatAppointment._dateEnd = moment.unix(this.monthlyRepeatAppointment.endDate / 1000).toDate();
        break;
      case 'Yearly':
        this.yearlyRepeatAppointment = configuration.yearly ? configuration.yearly : {}
        if (this.yearlyRepeatAppointment.startDate)
          this.yearlyRepeatAppointment._dateStart = moment.unix(this.yearlyRepeatAppointment.startDate / 1000).toDate();
        if (this.yearlyRepeatAppointment.endDate)
          this.yearlyRepeatAppointment._dateEnd = moment.unix(this.yearlyRepeatAppointment.endDate / 1000).toDate();
        break;
    }

  }
}

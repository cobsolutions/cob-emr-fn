import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentRepetitionConfiguration } from '../models/repeat/appointment.repetition.configuration';
import { DailyRepeatAppointment } from '../models/repeat/daily.repeat.appointment';

@Injectable({
  providedIn: 'root'
})
export class CheckAppointmentRepetitionConfigurationService {

  constructor() { }

  check(appointment: Appointment, newDate: number, module: string) {
    switch (appointment.appointmentRepetitionConfiguration.appointmentRepetitionType) {
      case 'Daily':
        var daily: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.daily;
        var checkDay = this.isSameDay(daily.startDate, newDate);
        if (!checkDay) {
          daily.startDate = this.removeTime(newDate);
          appointment.appointmentRepetitionConfiguration.daily = daily;
        }
        if (newDate > appointment.appointmentRepetitionConfiguration.daily.endDate)
          appointment.appointmentRepetitionConfiguration.ignore = true
        break;
      case 'Weekly':
        var weekly: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.weekly;
        var checkDay = this.isSameDay(daily.startDate, newDate);
        if (!checkDay)
          weekly.startDate = newDate;
        appointment.appointmentRepetitionConfiguration.weekly = weekly;
        if (newDate > appointment.appointmentRepetitionConfiguration.weekly.endDate)
          appointment.appointmentRepetitionConfiguration.ignore = true
        break;
      case 'Monthly':
        var monthly: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.monthly;
        var checkDay = this.isSameDay(monthly.startDate, newDate);
        if (!checkDay)
          monthly.startDate = newDate;
        appointment.appointmentRepetitionConfiguration.monthly = monthly;
        if (newDate > appointment.appointmentRepetitionConfiguration.monthly.endDate)
          appointment.appointmentRepetitionConfiguration.ignore = true
        break;
      case 'Yearly':
        var yearly: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.yearly;
        var checkDay = this.isSameDay(yearly.startDate, newDate);
        if (!checkDay)
          yearly.startDate = newDate;
        appointment.appointmentRepetitionConfiguration.yearly = yearly;
        if (newDate > appointment.appointmentRepetitionConfiguration.monthly.endDate)
          appointment.appointmentRepetitionConfiguration.ignore = true
        break;
    }
    if (module === 'day')
      appointment.appointmentRepetitionConfiguration.ignore = true;
  }
  removeTime(timestamp: number): number {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0); // Set to midnight (00:00:00)
    return date.getTime(); // Return the normalized timestamp
  }
  private isSameDay(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}

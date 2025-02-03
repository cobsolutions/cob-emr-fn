import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DailyRepeatAppointment } from '../models/repeat/daily.repeat.appointment';

@Injectable({
  providedIn: 'root'
})
export class CheckAppointmentRepetitionConfigurationService {

  constructor() { }

  check(appointment: Appointment, newDate: number) {
    switch (appointment.appointmentRepetitionConfiguration.appointmentRepetitionType) {
      case 'Daily':
        var daily: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.daily;
        var checkDay = this.isSameDay(daily.startDate, newDate);
        if (!checkDay) {
          daily.startDate = this.removeTime(newDate);
          appointment.appointmentRepetitionConfiguration.daily = daily;
        }
        break;
      case 'Weekly':
        var weekly: DailyRepeatAppointment = appointment.appointmentRepetitionConfiguration.weekly;
        var checkDay = this.isSameDay(daily.startDate, newDate);
        if (!checkDay)
          weekly.startDate = newDate;
        appointment.appointmentRepetitionConfiguration.weekly = weekly;
        break;
      case 'Monthly':
        break;
      case 'Yearly':
        break;

    }
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

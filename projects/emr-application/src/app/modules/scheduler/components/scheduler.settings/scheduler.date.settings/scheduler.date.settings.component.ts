import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentDuration } from '../../../lookups/appointment.duration';
import { DayHours } from '../../../lookups/day.hours';

import { StartWeek } from '../../../lookups/start.week';
import { TimeInterval } from '../../../lookups/time.interval';

@Component({
  selector: 'SchedulerDateSettings',
  templateUrl: './scheduler.date.settings.component.html',
  styleUrls: ['./scheduler.date.settings.component.css']
})
export class SchedulerDateSettingsComponent implements OnInit {
  settingsForm: FormGroup
  startweek: string[] = StartWeek;
  timeInterval: string[] = TimeInterval;
  dayHours: string[] = DayHours;
  appointmentDuration: string[] = AppointmentDuration
  isValidForm:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.createSettingsForm()
  }

  private createSettingsForm() {
    this.settingsForm = new FormGroup({
      'time-interval': new FormControl(null, [Validators.required]),
      'start-week': new FormControl(null, [Validators.required]),
      'start-of-day': new FormControl(null, [Validators.required]),
      'end-of-day': new FormControl(null, [Validators.required]),
      'appointment-duration': new FormControl(null, [Validators.required]),
    })
  }
  save(){
    if (this.settingsForm?.valid) {
      console.log('valid')
      this.isValidForm = false;
    }else{
      this.isValidForm = true;
    }
  }
}

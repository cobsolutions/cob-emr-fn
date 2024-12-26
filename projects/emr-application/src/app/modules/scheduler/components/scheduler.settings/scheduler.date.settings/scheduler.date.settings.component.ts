import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentDuration } from '../../../lookups/appointment.duration';
import { DayHours } from '../../../lookups/day.hours';

import { StartWeek } from '../../../lookups/start.week';
import { TimeInterval } from '../../../lookups/time.interval';
import { SchedulerSettings } from '../../../model/shceduler.date.settings';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';

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
  isValidForm: boolean = false;
  model: SchedulerSettings;
  clinicId: number;
  constructor(private loggedInService: LoggedInService
    , private schedulerConfigurationService: SchedulerConfigurationService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getClinicId();
    this.createSettingsForm()
    this.getSettings();
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
  private getClinicId() {
    this.loggedInService.selectedClinic$.subscribe(clinicId => {
      this.clinicId = clinicId;
    })
  }
  save() {
    if (this.settingsForm?.valid) {
      this.isValidForm = false;
      this.fillModel();
      this.schedulerConfigurationService.createSettings(this.model).subscribe(rr=>{
        this.toastrService.success("Scheduler Settings is saved successfully");
      });
    } else {
      this.isValidForm = true;
    }
  }
  private fillModel() {
    this.model = {
      id: this.model.id,
      timeInterval: this.settingsForm.controls['time-interval'].value,
      startWeek: this.settingsForm.controls['start-week'].value,
      startDay: this.settingsForm.controls['start-of-day'].value,
      endDay: this.settingsForm.controls['end-of-day'].value,
      appointmentDuration: this.settingsForm.controls['appointment-duration'].value,
      clinicId:this.clinicId
    }
  }
  private fillForm() {
    this.settingsForm.controls['time-interval'].setValue(this.model.timeInterval)
    this.settingsForm.controls['start-week'].setValue(this.model.startWeek)
    this.settingsForm.controls['start-of-day'].setValue(this.model.startDay)
    this.settingsForm.controls['end-of-day'].setValue(this.model.endDay)
    this.settingsForm.controls['appointment-duration'].setValue(this.model.appointmentDuration)
  }
  private getSettings() {
    this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        return this.schedulerConfigurationService.findSettings(clinicId)
      })
    ).subscribe(result => {
      this.model = result;
      this.fillForm();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'SchedulerAppointmentSettings',
  templateUrl: './scheduler.appointment.settings.component.html',
  styleUrls: ['./scheduler.appointment.settings.component.css']
})
export class SchedulerAppointmentSettingsComponent implements OnInit {
  appointmentTypeForm: FormGroup
  isValidForm: boolean = false;
  public color: string = '#2889e9';
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.appointmentTypeForm = new FormGroup({
      'appointment-name': new FormControl(null, [Validators.required]),
      'appointment-color': new FormControl(null, [Validators.required]),
      'appointment-fonrt-color': new FormControl(null, [Validators.required]),
    })
  }
  public onEventLog(event: string, data: any): void {
  }
  save() {

  }
}

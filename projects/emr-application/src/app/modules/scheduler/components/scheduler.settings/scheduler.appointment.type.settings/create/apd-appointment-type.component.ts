import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentType } from '../../../../models/appointment.type';

@Component({
  selector: 'apd-appointment-type',
  templateUrl: './apd-appointment-type.component.html',
  styleUrls: ['./apd-appointment-type.component.css']
})
export class ApdAppointmentTypeComponent implements OnInit {
  appointmentTypeForm: FormGroup
  isValidForm: boolean = false;
  public appointmentType: AppointmentType = new AppointmentType();
  public color: string = '#2889e9';
  constructor() { }

  ngOnInit(): void {
    this.createForm()
  }

  private createForm() {
    this.appointmentTypeForm = new FormGroup({
      'appointment-name': new FormControl(null, [Validators.required]),
      'appointment-color': new FormControl(null, [Validators.required]),
      'appointment-font-color': new FormControl(null, [Validators.required]),
    })
  }
  private fillModel() {
    this.appointmentType.name = this.appointmentTypeForm.controls['appointment-name'].value;
    this.appointmentType.color = this.appointmentTypeForm.controls['appointment-color'].value;
    this.appointmentType.fontColor = this.appointmentTypeForm.controls['appointment-font-color'].value;

  }
  public onCahngeColor(event: string, data: any): void {
    this.appointmentTypeForm.controls['appointment-color'].setValue(data.color);
  }
  public onCahngeFontColor(event: string, data: any): void {
    this.appointmentTypeForm.controls['appointment-font-color'].setValue(data.color);
  }
  save() {
    if (this.appointmentTypeForm.valid) {
      this.fillModel()
      console.log(JSON.stringify(this.appointmentType))
      this.isValidForm = false;
    } else {
      this.isValidForm = true;
    }
  }
}

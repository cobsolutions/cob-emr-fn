import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentType } from '../../../../models/appointment.type';

@Component({
  selector: 'edit-appointment-type',
  templateUrl: './edit-appointment-type.component.html',
  styleUrls: ['./edit-appointment-type.component.css']
})
export class EditAppointmentTypeComponent implements OnInit {
  @Input() selectedType: AppointmentType
  @Output() changeVisibility = new EventEmitter<string>()
  appointmentTypeEditForm: FormGroup
  isValidForm: boolean = false;
  public color: string = '#2889e9';
  constructor() { }

  ngOnInit(): void {
    this.createForm();
    this.fillForm();
  }
  private createForm() {
    this.appointmentTypeEditForm = new FormGroup({
      'appointment-name': new FormControl(null, [Validators.required]),
      'appointment-color': new FormControl(null, [Validators.required]),
      'appointment-font-color': new FormControl(null),
    })
  }
  public onCahngeColor(event: string, data: any): void {
    this.appointmentTypeEditForm.controls['appointment-color'].setValue(data.color);
  }
  public onCahngeFontColor(event: string, data: any): void {
    this.appointmentTypeEditForm.controls['appointment-font-color'].setValue(data.color);
  }
  private fillForm() {
    this.appointmentTypeEditForm.controls['appointment-name'].setValue(this.selectedType.name)
    this.appointmentTypeEditForm.controls['appointment-color'].setValue(this.selectedType.color)
    this.appointmentTypeEditForm.controls['appointment-font-color'].setValue(this.selectedType.fontColor)
  }
  update() {

  }
}

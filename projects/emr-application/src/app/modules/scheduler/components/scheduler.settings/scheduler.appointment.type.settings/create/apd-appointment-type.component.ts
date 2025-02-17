import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentType } from '../../../../models/appointment.type';
import { AppointmentTypeService } from '../../../../service/appointment.type/appointment-type.service';

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
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private appointmentTypeService: AppointmentTypeService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createForm()
  }

  private createForm() {
    this.appointmentTypeForm = new FormGroup({
      'appointment-name': new FormControl(null, [Validators.required]),
      'appointment-color': new FormControl(null, [Validators.required]),
      'appointment-font-color': new FormControl(null),
    })
  }
  private fillModel() {
    this.appointmentType.name = this.appointmentTypeForm.controls['appointment-name'].value;
    this.appointmentType.color = this.appointmentTypeForm.controls['appointment-color'].value;
    this.appointmentType.fontColor = this.appointmentTypeForm.controls['appointment-font-color'].value === null ? '#000000' :
      this.appointmentTypeForm.controls['appointment-font-color'].value;

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
      this.appointmentTypeService.create(this.appointmentType).subscribe(result => {
        this.toastrService.success('Successfully added AppointmentType');
        this.isValidForm = false;
        this.changeVisibility.emit('close');
      }, error => {
        this.toastrService.error('Error during creating AppointmentType');
      })
    } else {
      this.isValidForm = true;
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentType } from '../../../../models/appointment.type';
import { AppointmentTypeService } from '../../../../service/appointment.type/appointment-type.service';

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
  public appointmentType: AppointmentType = new AppointmentType();
  constructor(private appointmentTypeService: AppointmentTypeService
    , private toastrService: ToastrService) { }

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
  private fillModel() {
    this.appointmentType.id = this.selectedType.id;
    this.appointmentType.name = this.appointmentTypeEditForm.controls['appointment-name'].value;
    this.appointmentType.color = this.appointmentTypeEditForm.controls['appointment-color'].value;
    this.appointmentType.fontColor = this.appointmentTypeEditForm.controls['appointment-font-color'].value === null ? '#000000' :
      this.appointmentTypeEditForm.controls['appointment-font-color'].value;

  }
  update() {
    if (this.appointmentTypeEditForm.valid) {
      this.fillModel();
      this.appointmentTypeService.create(this.appointmentType).subscribe(() => {
        this.isValidForm = true;
        this.changeVisibility.emit('close');
        this.toastrService.success('Successfully updated AppointmentType');
      }, error => {
        this.toastrService.error('Error during creating AppointmentType');
      })
    } else {
      this.isValidForm = true;
    }
  }
}

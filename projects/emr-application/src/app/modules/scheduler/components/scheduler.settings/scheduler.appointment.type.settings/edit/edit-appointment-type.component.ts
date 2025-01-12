import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentType } from '../../../../models/appointment.type';

@Component({
  selector: 'edit-appointment-type',
  templateUrl: './edit-appointment-type.component.html',
  styleUrls: ['./edit-appointment-type.component.css']
})
export class EditAppointmentTypeComponent implements OnInit {
  @Input() selectedType: AppointmentType
  @Output() changeVisibility = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

}

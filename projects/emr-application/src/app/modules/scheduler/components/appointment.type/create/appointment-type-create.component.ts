import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AppointmentType } from '../../../models/appointment.type';

@Component({
  selector: 'appointment-type-create',
  templateUrl: './appointment-type-create.component.html',
  styleUrls: ['./appointment-type-create.component.css']
})
export class AppointmentTypeCreateComponent implements OnInit {
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  public type: AppointmentType = new AppointmentType();
  constructor() { }

  ngOnInit(): void {
  }
  create() {

  }
}

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import { AppointmentType } from '../../../models/appointment.type';
import { AppointmentTypeService } from '../../../service/appointment.type/appointment-type.service';

@Component({
  selector: 'appointment-type-create',
  templateUrl: './appointment-type-create.component.html',
  styleUrls: ['./appointment-type-create.component.css']
})
export class AppointmentTypeCreateComponent implements OnInit {
  public selectedColor: string;

  public color1: string = '#2889e9';
  public color2: string = '#e920e9';
  public color3: string = '#fff500';
  public color4: string = 'rgb(236,64,64)';
  public color5: string = 'rgba(45,208,45,1)';
  public color6: string = '#1973c0';
  public color7: string = '#f200bd';
  public color8: string = '#a8ff00';
  public color9: string = '#278ce2';
  public color10: string = '#0a6211';
  public color11: string = '#f2ff00';
  public color12: string = '#f200bd';
  public color13: string = 'rgba(0,255,0,0.5)';
  public color14: string = 'rgb(0,255,255)';
  public color15: string = 'rgb(255,0,0)';
  public color16: string = '#a51ad633';
  public color17: string = '#666666';
  public color18: string = '#ff0000';
  public appointmentType: AppointmentType = new AppointmentType();
  constructor(public vcRef: ViewContainerRef
    , private cpService: ColorPickerService) { }

  ngOnInit(): void {
    this.appointmentType.color = this.selectedColor;
  }
  public onEventLog(event: string, data: any): void {
    console.log(data.color);
    this.selectedColor = data.color
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'series-appointment',
  templateUrl: './add-series-appointment.component.html',
  styleUrls: ['./add-series-appointment.component.css']
})
export class AddSeriesAppointmentComponent implements OnInit {
  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

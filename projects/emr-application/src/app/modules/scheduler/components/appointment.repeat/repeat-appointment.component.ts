import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'repeat-appointment',
  templateUrl: './repeat-appointment.component.html',
  styleUrls: ['./repeat-appointment.component.css']
})
export class RepeatAppointmentComponent implements OnInit {
  @Input() repeatType: string
  constructor() { }

  ngOnInit(): void {
  }

}

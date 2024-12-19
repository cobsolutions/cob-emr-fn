import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent implements OnInit {

  calendarForm: FormGroup
  isValidForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.createClinicForm()
  }
  private createClinicForm() {
    this.calendarForm = new FormGroup({
      'calendar-name': new FormControl(null, [Validators.required]),
      'is-public': new FormControl(null),
    })
  }
  create() {

  }
}

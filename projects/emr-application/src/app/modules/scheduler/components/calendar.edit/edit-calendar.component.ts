import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar } from '../../../administration/model/calendar/calendar';

@Component({
  selector: 'edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  @Input() calendar: Calendar
  @ViewChild('claendarName') claendarNameInput: ElementRef;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  edit() {
    this.changeVisibility.emit('close');
    console.log(this.claendarNameInput.nativeElement.value)
  }
}

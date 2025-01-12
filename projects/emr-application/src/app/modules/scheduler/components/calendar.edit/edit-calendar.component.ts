import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { CalendarServiceService } from '../../service/calendar/calendar-service.service';

@Component({
  selector: 'edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  @Input() calendar: Calendar
  @ViewChild('claendarName') claendarNameInput: ElementRef;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private toastrService: ToastrService,
    private calendarServiceService: CalendarServiceService) { }

  ngOnInit(): void {
  }
  edit() {
    this.calendar.name = this.claendarNameInput.nativeElement.value;
    this.calendarServiceService.updateName(this.calendar).subscribe(() => {
      this.changeVisibility.emit('close');
      this.toastrService.success("Calendar update.")
    })
  }
}

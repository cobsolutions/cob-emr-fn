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
  isEditing: boolean = false;
  nameEmpty: boolean = false;
  constructor(private toastrService: ToastrService,
    private calendarServiceService: CalendarServiceService) { }

  ngOnInit(): void {
  }
  edit() {
    const name = this.claendarNameInput.nativeElement.value?.trim();
    if (!name) {
      this.nameEmpty = true;
      return;
    }
    this.nameEmpty = false;
    this.isEditing = true;
    this.calendar.name = name;
    this.calendarServiceService.updateName(this.calendar).subscribe({
      next: () => {
        this.isEditing = false;
        this.toastrService.success('Calendar updated successfully');
        this.changeVisibility.emit('close');
      },
      error: () => {
        this.isEditing = false;
        this.toastrService.error('Failed to update calendar');
      }
    });
  }
  cancel() {
    this.changeVisibility.emit('close');
  }
  onNameInput() {
    if (this.nameEmpty) {
      this.nameEmpty = !this.claendarNameInput.nativeElement.value?.trim();
    }
  }
}

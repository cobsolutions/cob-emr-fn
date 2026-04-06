import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { CalendarUpdateAttributeModel } from '../../../administration/model/calendar/calendar.update.attribute.model';
import { CalendarsListModel } from '../../../administration/model/calendars.list.model';
import { ListTemplate } from '../../../common/template/list.template';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { CalendarServiceService } from '../../service/calendar/calendar-service.service';

interface SearchCriteria {
  name?: string,
  searchStartDate?: Date;
  searchEndDate?: Date
  startDate?: number,
  endDate?: number
}
@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent extends ListTemplate implements OnInit {

  searchCriteria: SearchCriteria = {};
  searchCollapsed: boolean = false;
  calendars$!: Observable<CalendarsListModel[]>;
  columns: (string | IColumn)[];
  createCalendarVisibility: boolean = false;
  clinicId: number;
  editCalendarVisibility: boolean = false;
  selectedCalednar: Calendar;
  loggedInUserUUID: string;
  deleteConfirmCalendar: CalendarsListModel | null = null;
  isDeleting: boolean = false;
  deleteError: string = '';
  constructor(private calendarServiceService: CalendarServiceService
    , private loggedInService: LoggedInService
    , private toastrService: ToastrService) { super(); }

  ngOnInit(): void {
    this.loggedInUserUUID = this.loggedInService.getLoggedUser().uuid;
    this.catchSelectedClinic();
    this.initListComponent();
    this.columns = this.constructColumns(['name', 'attached', 'isPublic', 'actions']);
    this.find();
  }
  clearFilter(filter: string) {
    if (filter === 'name')
      this.searchCriteria.name = undefined;
    if (filter === 'createdAt') {
      this.searchCriteria.searchStartDate = undefined;
      this.searchCriteria.searchEndDate = undefined;
    }
  }
  search() {

  }
  openAddCalendarModal() {
    this.createCalendarVisibility = true
  }
  openEditCalendarModal(calendar: Calendar) {
    this.selectedCalednar = calendar
    this.editCalendarVisibility = true
  }
  private catchSelectedClinic() {
    this.loggedInService.selectedClinic$.subscribe(clinicId => {
      this.clinicId = clinicId;
      this.find()
    })
  }
  private find() {
    this.calendars$ = this.calendarServiceService.findAll(this.apiParams$, this.clinicId).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }
  toggleCreate() {
    this.createCalendarVisibility = !this.createCalendarVisibility
  }
  toggleEdit() {
    this.editCalendarVisibility = !this.editCalendarVisibility
  }
  changeCreateVisibility(event: string) {
    if (event === 'close') {
      this.createCalendarVisibility = false;
      this.find()
    }
  }
  onAttachToggle(item: any) {
    const model: CalendarUpdateAttributeModel = {
      calendarAttachmentAttributes: [{
        calendarId: item.calendarId,
        userAttachmentId: item.userCalendarAttachmentId,
        isAttach: item.isAttach
      }],
      calendarAccessibilityAttributes: [],
      uuid: this.loggedInService.getLoggedUser().uuid
    };
    this.calendarServiceService.update(model).subscribe({
      next: () => {
        this.toastrService.success(item.isAttach ? 'Calendar attached' : 'Calendar detached');
      },
      error: () => {
        item.isAttach = !item.isAttach;
        this.toastrService.error('Failed to update calendar');
      }
    });
  }
  onPublicToggle(item: any) {
    const model: CalendarUpdateAttributeModel = {
      calendarAttachmentAttributes: [],
      calendarAccessibilityAttributes: [{
        calendarId: item.calendarId,
        isPublic: item.isPublic
      }],
      uuid: this.loggedInService.getLoggedUser().uuid
    };
    this.calendarServiceService.update(model).subscribe({
      next: () => {
        this.toastrService.success(item.isPublic ? 'Calendar set to public' : 'Calendar set to private');
      },
      error: () => {
        item.isPublic = !item.isPublic;
        this.toastrService.error('Failed to update calendar');
      }
    });
  }
  changeEditVisibility(event: any) {
    if (event === 'close') {
      this.editCalendarVisibility = false;
      this.find()
    }
  }
  confirmDeleteCalendar(calendar: CalendarsListModel) {
    this.deleteError = '';
    this.deleteConfirmCalendar = calendar;
  }
  cancelDelete() {
    this.deleteConfirmCalendar = null;
    this.deleteError = '';
  }
  dismissDeleteError() {
    this.deleteError = '';
  }
  deleteCalendar() {
    if (!this.deleteConfirmCalendar) return;
    this.isDeleting = true;
    this.deleteError = '';
    this.calendarServiceService.deleteCalendar(this.deleteConfirmCalendar.calendarId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.toastrService.success('Calendar deleted successfully');
        this.deleteConfirmCalendar = null;
        this.deleteError = '';
        this.find();
      },
      error: (err) => {
        this.isDeleting = false;
        this.deleteError = err?.error?.message || 'Failed to delete calendar. Please try again.';
      }
    });
  }
}

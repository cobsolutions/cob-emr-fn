import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, retry, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { CalendarAccessibilityAttributesModel } from '../../../administration/model/calendar/calendar.accessibility.attributes.model';
import { CalendarAttachmentAttributesModel } from '../../../administration/model/calendar/calendar.attachment.attributes.model';
import { CalendarUpdateAttributeModel } from '../../../administration/model/calendar/calendar.update.attribute.model';
import { CalendarsUpdateModel } from '../../../administration/model/calendar/calendar.update.model';
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
  @ViewChild('calendarsItems') calendarsItems: SmartTableComponent;
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
  updateCalendar() {
    const model = this.fillModel();
    this.calendarServiceService.update(model)
      .subscribe(() => {
        this.toastrService.success('Calender is saved successfully');
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
  private fillModel(): CalendarUpdateAttributeModel {
    var calendarAttachmentAttributes: CalendarAttachmentAttributesModel[] = []
    var calendarAccessibilityAttributes: CalendarAccessibilityAttributesModel[] = []
    this.calendarsItems.items.forEach((item: any) => {
      var calendarAttachmentAttributesModel: CalendarAttachmentAttributesModel = {
        calendarId: item.calendarId,
        userAttachmentId: item.userCalendarAttachmentId,
        isAttach: item.isAttach
      }
      calendarAttachmentAttributes.push(calendarAttachmentAttributesModel);
      var calendarAccessibilityAttributesModel: CalendarAccessibilityAttributesModel = {
        calendarId: item.calendarId,
        isPublic: item.isPublic
      }
      calendarAccessibilityAttributes.push(calendarAccessibilityAttributesModel)
    })
    return {
      calendarAttachmentAttributes: calendarAttachmentAttributes,
      calendarAccessibilityAttributes: calendarAccessibilityAttributes,
      uuid: this.loggedInService.getLoggedUser().uuid
    }
  }
}

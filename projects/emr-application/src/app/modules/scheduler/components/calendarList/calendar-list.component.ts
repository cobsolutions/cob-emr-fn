import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, retry, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
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
  calendars$!: Observable<CalendarsListModel[]>;
  columns: (string | IColumn)[];
  createCalendarVisibility: boolean = false;
  clinicId: number;
  editCalendarVisibility: boolean = false;
  selectedCalednar: Calendar;
  @ViewChild('calendarsItems') calendarsItems: SmartTableComponent;
  constructor(private calendarServiceService: CalendarServiceService
    , private loggedInService: LoggedInService
    , private toastrService: ToastrService) { super(); }

  ngOnInit(): void {
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
    })
  }
  private find() {
    this.calendars$ = this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => {
        return this.calendarServiceService.findAll(this.apiParams$, clinicId).pipe(

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
      })
    )

  }
  toggleCreate() {
    this.createCalendarVisibility = !this.createCalendarVisibility
  }
  toggleEdit() {
    this.editCalendarVisibility = !this.editCalendarVisibility
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.createCalendarVisibility = false;
      this.find()
    }
  }
  updateCalendar() {
    var model: CalendarsUpdateModel = {}

    this.calendarServiceService.update(model)
    model.uuid = this.loggedInService.getLoggedUser().uuid;
    model.clinicId = this.clinicId
    model.markAsAttached = this.markCalendarAsAttached()
    model.markAsUnAttached = this.markAlendarsAsUnAttached();
    model.markAsPublic = this.markCalendarAsPublic();
    model.markAsNotPublic = this.markCalendarAsNotPublic();
    this.calendarServiceService.update(model)
      .subscribe(() => {
        this.toastrService.success('Calender is saved successfully');
      });
  }
  private markCalendarAsAttached() {
    return this.calendarsItems.items.filter((item: any) => item.attached)
      .map((item: any) => {
        var calendar: Calendar = {
          id: item.id,
          name: item.name,
          createdBy: item.createdBy,
          isPublic: item.isPublic,
          attached: item.attached
        }
        return calendar;
      });
  }
  private markCalendarAsPublic() {
    return this.calendarsItems.items.filter((item: any) => item.isPublic)
      .map((item: any) => {
        var calendar: Calendar = {
          id: item.id,
          name: item.name,
          createdBy: item.createdBy,
          isPublic: item.isPublic,
          attached: item.attached
        }
        return calendar;
      });
  }
  private markCalendarAsNotPublic() {
    return this.calendarsItems.items.filter((item: any) => !item.isPublic)
      .map((item: any) => {
        var calendar: Calendar = {
          id: item.id,
          name: item.name,
          createdBy: item.createdBy,
          isPublic: item.isPublic,
          attached: item.attached
        }
        return calendar;
      });
  }
  private markAlendarsAsUnAttached() {
    return this.calendarsItems.items.filter((item: any) => !item.attached)
      .map((item: any) => {
        var calendar: Calendar = {
          id: item.id,
          name: item.name,
          createdBy: item.createdBy,
          isPublic: item.isPublic,
          attached: item.attached
        }
        return calendar;
      });
  }
  changeEditVisibility(event: any) {
    if (event === 'close') {
      this.editCalendarVisibility = false;
      this.find()
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { ListTemplate } from '../../../common/template/list.template';
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
  calendars$!: Observable<Calendar[]>;
  columns: (string | IColumn)[];
  createCalendarVisibility: boolean = false;
  constructor(private calendarServiceService:CalendarServiceService) { super();}

  ngOnInit(): void {
    this.initListComponent();
    this.columns = this.constructColumns(['name', 'isPublic', 'actions']);
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
  private find(){
    this.calendars$ = this.calendarServiceService.findAll(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
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
  toggle() {
    this.createCalendarVisibility = !this.createCalendarVisibility
  }
}

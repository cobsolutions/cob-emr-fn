import { Component, OnInit } from '@angular/core';
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
  constructor(private calendarServiceService:CalendarServiceService) { super();}

  ngOnInit(): void {
    this.calendarServiceService.findAll(this.apiParams$).subscribe(result=>{
      console.log(JSON.stringify(result))
    })
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
  add() {

  }
}

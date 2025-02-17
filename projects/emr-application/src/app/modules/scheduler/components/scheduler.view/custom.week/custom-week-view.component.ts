import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarWeekViewComponent } from 'angular-calendar';
interface Resource {
  id: string | number;
  name: string;
}
@Component({
  selector: 'app-custom-week-view',
  templateUrl: './custom-week-view.component.html',
  styleUrls: ['./custom-week-view.component.css']
})

export class CustomWeekViewComponent extends CalendarWeekViewComponent {
  @Input() resources: Resource[] = []; 
  groupEventsByDayAndResource(events: CalendarEvent[], days: any[], resources: Resource[]) {
    return days.map((day) => {
      const dayEvents = events.filter(
        (event) => event.start.toDateString() === day.date.toDateString()
      );
      const groupedResources = resources.map((resource) => {
        const resourceEvents = dayEvents.filter(
          (event) => event.meta?.resourceId === resource.id
        );
        return { resource, events: resourceEvents };
      });

      return { day: day.date, resources: groupedResources };
    });
  }
 
}

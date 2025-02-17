import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentTypeListComponent } from './components/appointment.type/list/appointment-type-list.component';
import { CalendarListComponent } from './components/calendarList/calendar-list.component';
import { ListSchedulerConfigurationComponent } from './components/scheduler.configuration/list/list-scheduler-configuration.component';
import { SchedulerSettingsComponent } from './components/scheduler.settings/scheduler.settings.component';
import { ViewSchdulerComponent } from './components/scheduler.view/view-schduler.component';
import { SchedulerSetupResolverService } from './service/scheduler/scheduler-setup-resolver.service';

const routes: Routes = [{
  path: '',
  data: {
    title: 'scheduler',
  },
  children: [
    {
      path: 'view',
      component: ViewSchdulerComponent,
      data: {
        title: 'view',
      },
    },
    {
      path: 'settings',
      component: SchedulerSettingsComponent,
      data: {
        title: 'settings',
      },
    },
    {
      path: 'calendar',
      component: CalendarListComponent,
      data: {
        title: 'calendars',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }

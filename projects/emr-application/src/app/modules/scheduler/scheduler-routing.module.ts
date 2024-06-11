import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentTypeListComponent } from './components/appointment.type/list/appointment-type-list.component';
import { ListSchedulerConfigurationComponent } from './components/scheduler.configuration/list/list-scheduler-configuration.component';
import { ViewSchdulerComponent } from './components/scheduler.view/view-schduler.component';

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
      path: 'configuration',
      component: ListSchedulerConfigurationComponent,
      data: {
        title: 'configuration',
      },
    },
    {
      path: 'appointment-type',
      component: AppointmentTypeListComponent,
      data: {
        title: 'appointment-type',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }

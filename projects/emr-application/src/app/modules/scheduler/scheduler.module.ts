import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CalloutModule, DatePickerModule, ListGroupModule, ModalModule, SmartPaginationModule, SmartTableModule, SpinnerModule, TimePickerModule } from '@coreui/angular-pro';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmrCommonModule } from '../common/emr-common.module';
import { AppointmentEditComponent } from './components/appintment.edit/appointment-edit.component';
import { AppointmentEditModalComponent } from './components/appintment.edit/modal/appointment-edit-modal.component';
import { AppointmentActionsComponent } from './components/appointment.actions/appointment-actions.component';
import { AppointmentActionModalComponent } from './components/appointment.actions/modal/appointment-action-modal.component';
import { AppointmentAddComponent } from './components/appointment.add/appointment-add.component';
import { AddAppobntmentModalComponent } from './components/appointment.add/modal/add-appobntment-modal.component';
import { AppointmentCancelNoshowComponent } from './components/appointment.cancel.noshow/appointment-cancel-noshow.component';
import { AppointmentCancelNoshowModalComponent } from './components/appointment.cancel.noshow/modal/appointment-cancel-noshow-modal.component';
import { AppointmentConfirmComponent } from './components/appointment.confirm/appointment-confirm.component';
import { AppointmentStatusModalComponent } from './components/appointment.status/modal/appointment-status-modal.component';
import { AppointmentTypeCreateComponent } from './components/appointment.type/create/appointment-type-create.component';
import { AppointmentTypeCreateModalComponent } from './components/appointment.type/create/modal/appointment-type-create-modal.component';
import { AppointmentTypeListComponent } from './components/appointment.type/list/appointment-type-list.component';
import { ListSchedulerConfigurationComponent } from './components/scheduler.configuration/list/list-scheduler-configuration.component';
import { ViewSchdulerComponent } from './components/scheduler.view/view-schduler.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { CreateSchedulerConfigurationComponent } from './components/scheduler.configuration/create/create-scheduler-configuration.component';
import { RepeatAppointmentComponent } from './components/appointment.repeat/repeat-appointment.component';
import { DayViewSchedulerComponent } from './components/scheduler.view/custom.day/day-view-scheduler.component';
import { CustomWeekViewComponent } from './components/scheduler.view/custom.week/custom-week-view.component';
import { CalendarListComponent } from './components/calendarList/calendar-list.component';
import { CreateCalendarComponent } from './components/calendar.create/create-calendar.component';
@NgModule({
    declarations: [
        ViewSchdulerComponent,
        AppointmentAddComponent,
        AppointmentCancelNoshowComponent,
        AppointmentConfirmComponent,
        AppointmentActionsComponent,
        AddAppobntmentModalComponent,
        AppointmentEditModalComponent,
        AppointmentEditComponent,
        AppointmentActionModalComponent,
        AppointmentStatusModalComponent,
        AppointmentCancelNoshowModalComponent,
        AppointmentTypeListComponent,
        AppointmentTypeCreateComponent,
        AppointmentTypeCreateModalComponent,
        ListSchedulerConfigurationComponent,
        CreateSchedulerConfigurationComponent,
        RepeatAppointmentComponent,
        DayViewSchedulerComponent,
        CustomWeekViewComponent,
        CalendarListComponent,
        CreateCalendarComponent,
    ],
    imports: [
        CommonModule,
        SchedulerRoutingModule,
        EmrCommonModule,
        ModalModule,
        DatePickerModule,
        TimePickerModule,
        AutocompleteLibModule,
        MatDialogModule,
        CalloutModule,
        FlatpickrModule.forRoot(),
        SpinnerModule,
        SmartTableModule,
        SmartPaginationModule,
        ListGroupModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        ColorPickerModule
    ], providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        }
    ],
})
export class SchedulerModule { }

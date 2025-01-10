import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CalloutModule, DatePickerModule, ListGroupModule, ModalModule, SmartPaginationModule, SmartTableModule, SpinnerModule, TableModule, TimePickerModule } from '@coreui/angular-pro';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmrCommonModule } from '../common/emr-common.module';
import { AppointmentEditModalComponent } from './components/appintment.edit/modal/appointment-edit-modal.component';
import { AppointmentActionModalComponent } from './components/appointment.actions/modal/appointment-action-modal.component';
import { PropmtPatientClinicsComponent } from './components/appointment.actions/modal/prompting.patient.clinic/propmt-patient-clinics.component';
import { AppointmentAddComponent } from './components/appointment.add/appointment-add.component';
import { AddAppobntmentModalComponent } from './components/appointment.add/modal/add-appobntment-modal.component';
import { AppointmentCancelNoshowComponent } from './components/appointment.cancel.noshow/appointment-cancel-noshow.component';
import { AppointmentCancelNoshowModalComponent } from './components/appointment.cancel.noshow/modal/appointment-cancel-noshow-modal.component';
import { AppointmentConfirmComponent } from './components/appointment.confirm/appointment-confirm.component';
import { RepeatAppointmentComponent } from './components/appointment.repeat/repeat-appointment.component';
import { AppointmentStatusModalComponent } from './components/appointment.status/modal/appointment-status-modal.component';
import { AppointmentTypeCreateComponent } from './components/appointment.type/create/appointment-type-create.component';
import { AppointmentTypeCreateModalComponent } from './components/appointment.type/create/modal/appointment-type-create-modal.component';
import { AppointmentTypeListComponent } from './components/appointment.type/list/appointment-type-list.component';
import { CreateCalendarComponent } from './components/calendar.create/create-calendar.component';
import { CalendarListComponent } from './components/calendarList/calendar-list.component';
import { PatientChartModalComponent } from './components/patient.chart.modal/patient-chart-modal.component';
import { CreateSchedulerConfigurationComponent } from './components/scheduler.configuration/create/create-scheduler-configuration.component';
import { ListSchedulerConfigurationComponent } from './components/scheduler.configuration/list/list-scheduler-configuration.component';
import { ApdAppointmentTypeComponent } from './components/scheduler.settings/scheduler.appointment.type.settings/create/apd-appointment-type.component';
import { ListAppointmentTypeComponent } from './components/scheduler.settings/scheduler.appointment.type.settings/list/list-appointment-type.component';
import { SchedulerAppointmentSettingsComponent } from './components/scheduler.settings/scheduler.appointment.type.settings/scheduler.appointment.settings.component';
import { SchedulerDateSettingsComponent } from './components/scheduler.settings/scheduler.date.settings/scheduler.date.settings.component';
import { SchedulerSettingsComponent } from './components/scheduler.settings/scheduler.settings.component';
import { DayViewSchedulerComponent } from './components/scheduler.view/custom.day/day-view-scheduler.component';
import { CustomWeekViewComponent } from './components/scheduler.view/custom.week/custom-week-view.component';
import { ViewSchdulerComponent } from './components/scheduler.view/view-schduler.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { FullAppointmentComponent } from './components/appointment.add/full.appointment/full-appointment.component';
import { BlockAppointmentComponent } from './components/appointment.add/block.appointment/block-appointment.component';
@NgModule({
    declarations: [
        ViewSchdulerComponent,
        AppointmentAddComponent,
        AppointmentCancelNoshowComponent,
        AppointmentConfirmComponent,

        AddAppobntmentModalComponent,
        AppointmentEditModalComponent,
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
        SchedulerSettingsComponent,
        SchedulerDateSettingsComponent,
        SchedulerAppointmentSettingsComponent,
        ListAppointmentTypeComponent,
        ApdAppointmentTypeComponent,
        PatientChartModalComponent,
        PropmtPatientClinicsComponent,
        FullAppointmentComponent,
        BlockAppointmentComponent,
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
        TableModule,
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

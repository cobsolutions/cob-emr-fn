import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { ViewSchdulerComponent } from './components/scheduler.view/view-schduler.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EmrCommonModule } from '../common/emr-common.module';
import { CalloutModule, DatePickerModule, DropdownModule, FormModule, ModalModule, SpinnerModule, TimePickerModule } from '@coreui/angular-pro';
import { AppointmentAddComponent } from './components/appointment.add/appointment-add.component';
import { AppointmentCancelNoshowComponent } from './components/appointment.cancel.noshow/appointment-cancel-noshow.component';
import { AppointmentConfirmComponent } from './components/appointment.confirm/appointment-confirm.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AppointmentActionsComponent } from './components/appointment.actions/appointment-actions.component';
import { AppointmentStatusComponent } from './components/appointment.status/appointment-status.component';
import { AddAppobntmentModalComponent } from './components/appointment.add/modal/add-appobntment-modal.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppointmentEditModalComponent } from './components/appintment.edit/modal/appointment-edit-modal.component';
import { AppointmentEditComponent } from './components/appintment.edit/appointment-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [
        ViewSchdulerComponent,
        AppointmentAddComponent,
        AppointmentCancelNoshowComponent,
        AppointmentConfirmComponent,
        AppointmentActionsComponent,
        AppointmentStatusComponent,
        AddAppobntmentModalComponent,
        AppointmentEditModalComponent,
        AppointmentEditComponent
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
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ]
})
export class SchedulerModule { }

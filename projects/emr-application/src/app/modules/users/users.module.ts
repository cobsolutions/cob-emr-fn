import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListClinicalUserComponent } from './components/clinical/list/list-clinical-user.component';
import { ListClericalUserComponent } from './components/clerical/list/list-clerical-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { EmrCommonModule } from '../common/emr-common.module';
import { CreateUserComponent } from './components/create.user/create-user.component';
import { EditUserComponent } from './components/edit.user/edit-user.component';


@NgModule({
  declarations: [
    ListClinicalUserComponent,
    ListClericalUserComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SmartPaginationModule,
    CollapseModule,
    SmartTableModule,
    EmrCommonModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  exports: [
    CreateUserComponent
  ]
})
export class UsersModule { }

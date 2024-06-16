import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListClinicalUserComponent } from './components/clinical/list/list-clinical-user.component';
import { CreateClinicalUserComponent } from './components/clinical/create/create-clinical-user.component';
import { EditClinicalUserComponent } from './components/clinical/edit/edit-clinical-user.component';
import { ListClericalUserComponent } from './components/clerical/list/list-clerical-user.component';
import { CreateClericalUserComponent } from './components/clerical/create/create-clerical-user.component';
import { EditClericalUserComponent } from './components/clerical/edit/edit-clerical-user.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CollapseModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { EmrCommonModule } from '../common/emr-common.module';


@NgModule({
  declarations: [
    ListClinicalUserComponent,
    CreateClinicalUserComponent,
    EditClinicalUserComponent,
    ListClericalUserComponent,
    CreateClericalUserComponent,
    EditClericalUserComponent
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
  ]
})
export class UsersModule { }

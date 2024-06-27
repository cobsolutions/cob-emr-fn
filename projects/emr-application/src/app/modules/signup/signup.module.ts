import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { CreateOrganizationComponent } from './components/create.organization/create-organization.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmrCommonModule } from '../common/emr-common.module';
import { MatIconModule } from '@angular/material/icon';
import { EssentialInformationComponent } from './components/essential.information/essential-information.component';
import { ClinicInformationComponent } from './components/clinic.info/clinic-information.component';
import { AdministratorInfoComponent } from './components/administrator.info/administrator-info.component';
import { UserInfoComponent } from './components/user.info/user-info.component';
import { UsersModule } from '../users/users.module';
import { OrganizationSummaryComponent } from './components/summary/organization-summary.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    EssentialInformationComponent,
    ClinicInformationComponent,
    AdministratorInfoComponent,
    UserInfoComponent,
    OrganizationSummaryComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    EmrCommonModule,
    UsersModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SignupModule { }

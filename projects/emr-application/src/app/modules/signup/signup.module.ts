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


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    EssentialInformationComponent,
    ClinicInformationComponent,
    AdministratorInfoComponent
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
  ]
})
export class SignupModule { }

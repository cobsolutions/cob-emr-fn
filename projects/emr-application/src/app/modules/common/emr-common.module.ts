import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pips/phone.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TableModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DateRangePickerModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  AlertModule,
  MultiSelectModule
} from '@coreui/angular-pro';

import { AddressComponent } from './components/address/address.component';
import { ZipcodeDirective } from './directives/zipcode.directive';
import { NumberonlyDirective } from './directives/numberonly.directive';
import { IconModule } from '@coreui/icons-angular';
import { SingleAddressComponent } from './components/single.address/single-address.component';
import { ContactComponent } from './components/contact/contact.component';
import { ViewAddressComponent } from './components/view.address/view-address.component';
import { ReadonlyFormDirective } from './directives/permissions/readonly-form.directive';
import { RoleScopeDirective } from './directives/permissions/role-scope.directive';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { SignaturePadDrawComponent } from './components/signature-pad/signature-pad-draw.component';
import { SignaturePadUploadComponent } from './components/signature-pad/signature-pad-upload.component';
import { SignaturePadTypeComponent } from './components/signature-pad/signature-pad-type.component';
import { SigningCeremonyComponent } from './components/signing-ceremony/signing-ceremony.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';

const APP_COMMON_COMPONENTS = [
  AddressComponent,
  SingleAddressComponent,
  ContactComponent,
  ViewAddressComponent,
  SignaturePadComponent,
  SignaturePadDrawComponent,
  SignaturePadUploadComponent,
  SignaturePadTypeComponent,
  SigningCeremonyComponent,
  OtpVerificationComponent
]

const APP_COMMON_PIPES = [
  PhonePipe
]

const APP_COMMON_DIRECTIVES = [
  ZipcodeDirective,
  NumberonlyDirective,
  ReadonlyFormDirective,
  RoleScopeDirective
]
const COREUI_MODULES = [
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  IconModule,
  DateRangePickerModule,
  AlertModule,
  MultiSelectModule
]
@NgModule({
  declarations: [
    APP_COMMON_COMPONENTS,
    ...APP_COMMON_PIPES,
    ...APP_COMMON_DIRECTIVES,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    SharedModule,
    FormModule,
    ButtonModule,
    TableModule,
    UtilitiesModule,
    IconModule,
    ButtonGroupModule,
    NavModule,
    TabsModule,
  ],
  exports: [
    APP_COMMON_COMPONENTS,
    ...APP_COMMON_PIPES,
    ...APP_COMMON_DIRECTIVES,
    ...COREUI_MODULES,
    ReactiveFormsModule ,FormsModule
  ],
})
export class EmrCommonModule { }

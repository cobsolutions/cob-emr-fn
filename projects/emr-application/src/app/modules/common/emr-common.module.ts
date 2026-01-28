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
import { DispalyInputDirective } from './directives/permissions/dispaly-input.directive';
import { FormScopeDirective } from './directives/permissions/form.scope.directive';
import { ReadonlyFormDirective } from './directives/permissions/readonly-form.directive';
import { DisableDatePickerDirective } from './directives/permissions/disable-date-picker.directive';
import { DisableInputDirective } from './directives/permissions/disable-input.directive';
import { DisableDateRangePickerDirective } from './directives/permissions/disable.date.range.picker.directive';
import { ReadonlyInputDirective } from './directives/permissions/readonly-input.directive';
import { MultiSelectDisableDirective } from './directives/permissions/multi-select-disable.directive';
import { HideControlDirective } from './directives/permissions/hide.input/hide-control.directive';
import { HideDivDirective } from './directives/permissions/hide.div/hide-div.directive';
import { RoleScopeDirective } from './directives/permissions/role-scope.directive';

const APP_COMMON_COMPONENTS = [
  AddressComponent,
  SingleAddressComponent,
  ContactComponent,
  ViewAddressComponent
]

const APP_COMMON_PIPES = [
  PhonePipe
]

const APP_COMMON_DIRECTIVES = [
  ZipcodeDirective,
  NumberonlyDirective,
  DispalyInputDirective,
  FormScopeDirective,
  ReadonlyFormDirective,
  DisableDatePickerDirective,
  DisableInputDirective,
  DisableDateRangePickerDirective,
  ReadonlyInputDirective,
  MultiSelectDisableDirective,
  HideControlDirective,
  HideDivDirective,
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
    ViewAddressComponent,
    HideControlDirective,
    HideDivDirective,
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

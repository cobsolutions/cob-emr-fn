import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorSignatureRoutingModule } from './doctor-signature-routing.module';
import { DoctorSignaturePageComponent } from './components/doctor-signature-page/doctor-signature-page.component';
import { SignatureSuccessComponent } from './components/signature-success/signature-success.component';
import { EmrCommonModule } from '../common/emr-common.module';

@NgModule({
  declarations: [
    DoctorSignaturePageComponent,
    SignatureSuccessComponent
  ],
  imports: [
    CommonModule,
    DoctorSignatureRoutingModule,
    EmrCommonModule
  ]
})
export class DoctorSignatureModule {}

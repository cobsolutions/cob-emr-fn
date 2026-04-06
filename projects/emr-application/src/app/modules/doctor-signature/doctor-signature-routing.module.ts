import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorSignaturePageComponent } from './components/doctor-signature-page/doctor-signature-page.component';

const routes: Routes = [
  {
    path: 'capture',
    component: DoctorSignaturePageComponent,
    data: {
      title: 'Signature Capture'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorSignatureRoutingModule {}

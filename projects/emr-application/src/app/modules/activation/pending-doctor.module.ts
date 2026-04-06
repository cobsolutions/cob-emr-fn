import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PendingDoctorComponent } from './components/pending-doctor.component';

const routes: Routes = [
  { path: '', component: PendingDoctorComponent }
];

@NgModule({
  declarations: [PendingDoctorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PendingDoctorModule {}

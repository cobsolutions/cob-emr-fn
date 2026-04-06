import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PendingActivationComponent } from './components/pending-activation.component';

const routes: Routes = [
  { path: '', component: PendingActivationComponent }
];

@NgModule({
  declarations: [PendingActivationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivationModule {}

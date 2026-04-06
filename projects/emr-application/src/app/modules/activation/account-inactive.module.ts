import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountInactiveComponent } from './components/account-inactive.component';

const routes: Routes = [
  { path: '', component: AccountInactiveComponent }
];

@NgModule({
  declarations: [AccountInactiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountInactiveModule {}

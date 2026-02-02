import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingActivationService {
  isPendingActivation$ = new BehaviorSubject<boolean>(false);
  isPendingDoctor$ = new BehaviorSubject<boolean>(false);
  isAccountInactive$ = new BehaviorSubject<boolean>(false);

  setPendingActivation(): void {
    this.isPendingActivation$.next(true);
  }

  clearPendingActivation(): void {
    this.isPendingActivation$.next(false);
  }

  setPendingDoctor(): void {
    this.isPendingDoctor$.next(true);
  }

  clearPendingDoctor(): void {
    this.isPendingDoctor$.next(false);
  }

  setAccountInactive(): void {
    this.isAccountInactive$.next(true);
  }

  clearAccountInactive(): void {
    this.isAccountInactive$.next(false);
  }

  get isPending(): boolean {
    return this.isPendingActivation$.value;
  }

  get isPendingDoctorStatus(): boolean {
    return this.isPendingDoctor$.value;
  }

  get isInactive(): boolean {
    return this.isAccountInactive$.value;
  }

  get isBlocked(): boolean {
    return this.isPendingActivation$.value || this.isPendingDoctor$.value || this.isAccountInactive$.value;
  }
}

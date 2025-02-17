import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { SchedulerConfigurationService } from '../scheduler-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerSetupResolverService implements Resolve<any> {

  constructor(private loggedInService: LoggedInService,
    private schedulerConfigurationService: SchedulerConfigurationService) { }

  resolve(): Observable<any> {
    return this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        return this.schedulerConfigurationService.findSettings(clinicId)
      })
    )
  }
}

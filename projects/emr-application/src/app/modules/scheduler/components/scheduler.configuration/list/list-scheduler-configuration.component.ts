import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { SchedulerConfiguration } from '../../../models/configuration';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';

@Component({
  selector: 'app-list-scheduler-configuration',
  templateUrl: './list-scheduler-configuration.component.html',
  styleUrls: ['./list-scheduler-configuration.component.css']
})
export class ListSchedulerConfigurationComponent implements OnInit {
  schedulerConfiguration$: Observable<SchedulerConfiguration[]>;
  constructor(private schedulerConfigurationService: SchedulerConfigurationService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.schedulerConfiguration$ = this.loggedInService.load().pipe(
      map((loggedInUser: LoggedInUser) => {
        return loggedInUser.organizationId
      })
      , switchMap((organizationId: number) => {
        return this.schedulerConfigurationService.retrieveCliniSchedulerConfigurations(organizationId)
      })
    )
  }

}

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
  addSchedulerConfigurationVisibility: boolean = false;
  editSchedulerConfigurationVisibility: boolean = false;

  toggleAddSchedulerConfiguration() {
    this.addSchedulerConfigurationVisibility = !this.addSchedulerConfigurationVisibility;
  }
  toggleEditSchedulerConfiguration() {
    this.editSchedulerConfigurationVisibility = !this.editSchedulerConfigurationVisibility;
  }

  openAddSchedulerConfigurationModal() {
    this.addSchedulerConfigurationVisibility = true;
  }
  openEditSchedulerConfigurationModal(item: any) {
    this.editSchedulerConfigurationVisibility = true;
  }
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
  public changeFacilityVisibility(event: any) {
    if (event === 'close-create')
      this.addSchedulerConfigurationVisibility = false;
    if (event === 'close-update')
      this.editSchedulerConfigurationVisibility = false;
  }
}

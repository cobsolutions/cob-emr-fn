import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
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

  selectedSchedulerConfiguration: SchedulerConfiguration;
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
    this.selectedSchedulerConfiguration = item;
    this.editSchedulerConfigurationVisibility = true;
  }
  ngOnInit(): void {
    this.schedulerConfiguration$ = this.schedulerConfigurationService
      .retrieveCliniSchedulerConfigurations(this.loggedInService.getLoggedUser().organizationId)
      , map((configurations: SchedulerConfiguration[]) => {
        for (var i = 0; i < configurations.length; i++) {
          var startHour: number = moment(configurations[i].startHour).hour();
          var endHour: number = moment(configurations[i].endHour).hour();
          configurations[i].startHourStr = startHour > 12 ? (startHour - 12) + ' PM' : startHour + ' AM'
          configurations[i].endHourStr = endHour > 12 ? (endHour - 12) + ' PM' : endHour + ' AM'
        }
        return configurations;
      })
  }
  public changeVisibility(event: any) {
    if (event === 'close-create')
      this.addSchedulerConfigurationVisibility = false;
    if (event === 'close-update')
      this.editSchedulerConfigurationVisibility = false;
    this.ngOnInit();
  }

}

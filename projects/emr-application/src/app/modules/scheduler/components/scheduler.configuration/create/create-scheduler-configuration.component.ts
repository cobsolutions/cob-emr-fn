import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { SchedulerConfiguration } from '../../../models/configuration';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';

@Component({
  selector: 'create-scheduler-configuration',
  templateUrl: './create-scheduler-configuration.component.html',
  styleUrls: ['./create-scheduler-configuration.component.css']
})
export class CreateSchedulerConfigurationComponent implements OnInit {
  @Input() mode: string;
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('createConfigurationForm') createConfigurationForm: NgForm;
  clinics$: Observable<Clinic[]>
  selectecClinic: Clinic = undefined
  startDate?: Date;
  endDate?: Date
  notValidStartDate?: boolean = false
  notValidEndDate?: boolean = false
  notValidClinic?: boolean = false
  startDateNotAfterEndDate?: boolean = false;
  fourHoursDeff?: boolean = false
  schedulerConfiguration: SchedulerConfiguration
  @Input() selectedSchedulerConfiguration: SchedulerConfiguration;
  constructor(private schedulerConfigurationService: SchedulerConfigurationService
    , private loggedInService: LoggedInService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.clinics$ = this.loggedInService.load().pipe(
      switchMap((loggedInUser: LoggedInUser) => {
        return this.schedulerConfigurationService.findNotConfigurlableClinics(loggedInUser.organizationId)
      })
    )
    if (this.mode === 'update') {
      this.fillModel();
    }
  }
  update() {
    if (this.isValidForm()) {
      this.changeVisibility.emit('close-update');
    }
  }
  private fillModel() {
    if (this.selectedSchedulerConfiguration) {
      this.startDate = moment.unix(this.selectedSchedulerConfiguration.startHour / 1000).toDate()
      this.endDate = moment.unix(this.selectedSchedulerConfiguration.endHour / 1000).toDate()
    }
  }
  create() {
    if (this.isValidForm()) {
      this.prepareSchedulerConfiguration()
      this.loggedInService.load().pipe(
        switchMap((loggedInUser: LoggedInUser) => {
          this.schedulerConfiguration.organizationId = loggedInUser.organizationId
          return this.schedulerConfigurationService.create(this.schedulerConfiguration)
        })
      ).subscribe(result => {
        this.toastr.success('Scheduler Configuration Created.');
        this.changeVisibility.emit('close-create');
      })
    }
  }
  private prepareSchedulerConfiguration() {
    this.schedulerConfiguration = {
      startHour: moment(this.startDate).unix() * 1000,
      endHour: moment(this.endDate).unix() * 1000,
      clinicId: this.selectecClinic.id
    }
  }
  private isValidForm() {
    var notValidClinic = this.validateClinic();
    var notValidStartDate = this.validateStartDate();
    var notValidEndDate = this.validateEndDate()
    var startDateNotAfterEndDate = this.checkstartDateNotAfterEndDate();
    var fourHoursDeff = this.checkFourHoursDeff()
    return !notValidClinic && !notValidStartDate && !notValidEndDate && !startDateNotAfterEndDate && !fourHoursDeff;
  }
  private validateClinic() {
    if (this.selectecClinic === undefined)
      this.notValidClinic = true
    else
      this.notValidClinic = false
    return this.notValidClinic;
  }
  private validateStartDate() {
    if (this.startDate === undefined)
      this.notValidStartDate = true;
    else
      this.notValidStartDate = false;
    return this.notValidStartDate;
  }
  private validateEndDate() {
    if (this.endDate === undefined)
      this.notValidEndDate = true;
    else
      this.notValidEndDate = false;
    return this.notValidEndDate;
  }
  private checkstartDateNotAfterEndDate() {
    const start = moment(this.startDate);
    const end = moment(this.endDate);
    if (start.isAfter(end))
      this.startDateNotAfterEndDate = true;
    else
      this.startDateNotAfterEndDate = false

    return this.startDateNotAfterEndDate;
  }
  private checkFourHoursDeff() {
    const start = moment(this.startDate);
    const end = moment(this.endDate);
    const duration = moment.duration(end.diff(start));
    if (duration.asHours() < 4)
      this.fourHoursDeff = true;
    else
      this.fourHoursDeff = false;
    return this.fourHoursDeff;
  }
}


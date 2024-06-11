import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Observable, switchMap, tap } from 'rxjs';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
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
  constructor(private schedulerConfigurationService: SchedulerConfigurationService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.clinics$ = this.loggedInService.load().pipe(
      switchMap((loggedInUser: LoggedInUser) => {
        return this.schedulerConfigurationService.findNotConfigurlableClinics(loggedInUser.organizationId)
      })
    )
  }
  update() {
    if (this.isValidForm()) {
      this.changeVisibility.emit('close-update');
    }
  }
  create() {
    if (this.isValidForm()) {
      this.changeVisibility.emit('close-create');
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


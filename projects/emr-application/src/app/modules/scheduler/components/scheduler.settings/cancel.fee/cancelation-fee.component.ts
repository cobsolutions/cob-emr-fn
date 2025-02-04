import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientCancellationFee } from '../../../models/cancellation.fee/cancellation.fee';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';

@Component({
  selector: 'cancelation-fee',
  templateUrl: './cancelation-fee.component.html',
  styleUrls: ['./cancelation-fee.component.css']
})
export class CancelationFeeComponent implements OnInit {
  enableFee: boolean = false;
  clinicId: number;
  patientCancellationFee: PatientCancellationFee = {
    feeDurationUnit: 'Day',
    isEnabled: false
  }
  constructor(private loggedInService: LoggedInService
    , private schedulerConfigurationService: SchedulerConfigurationService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getClinicId();
  }
  private getClinicId() {
    this.loggedInService.selectedClinic$.subscribe(clinicId => {
      this.clinicId = clinicId;
    })
  }
  save() {
    this.patientCancellationFee.clinicId = this.clinicId;
    this.schedulerConfigurationService.createCancelFee(this.patientCancellationFee).subscribe(result => {
      this.toastrService.success('Cancellation fee has been created')
    })  
  }
}

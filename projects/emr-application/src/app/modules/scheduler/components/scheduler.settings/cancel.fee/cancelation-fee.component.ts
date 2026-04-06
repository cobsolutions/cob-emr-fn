import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Role } from '../../../../security/model/role';
import { PatientCancellationFee } from '../../../models/cancellation.fee/cancellation.fee';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';

@Component({
  selector: 'cancelation-fee',
  templateUrl: './cancelation-fee.component.html',
  styleUrls: ['./cancelation-fee.component.css']
})
export class CancelationFeeComponent implements OnInit {
  enableFee: boolean = false;
  patientCancellationFee: PatientCancellationFee = {
    feeDurationUnit: 'Day',
    isEnabled: false
  }
  componentRole: string[] = [Role.PATIENT_PAYMENT_ROLE];
  constructor(private schedulerConfigurationService: SchedulerConfigurationService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCancelFeeSettings();
  }
  save() {
    this.schedulerConfigurationService.createCancelFee(this.patientCancellationFee).subscribe(result => {
      this.toastrService.success('Cancellation fee has been created')
    })
  }
  private getCancelFeeSettings() {
    this.schedulerConfigurationService.findCancelFee()
      .subscribe(result => {
        this.patientCancellationFee = result;
      })
  }
}

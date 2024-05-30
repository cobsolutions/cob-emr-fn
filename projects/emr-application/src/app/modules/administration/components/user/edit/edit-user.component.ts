import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ClinicEmittingService } from '../../../../common/service/emitting/clinic-emitting.service';
import { User } from '../../../model/user/user';
import { ClinicalUserService } from '../../../services/user/clinical.user/clinical-user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() uuid: string
  user: User;
  constructor(private clinicEmittingService: ClinicEmittingService
    , private clinicalUserService: ClinicalUserService) { }

  ngOnInit(): void {
    this.clinicEmittingService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clinicalUserService.getClericalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      this.user = result
    })
  }

}

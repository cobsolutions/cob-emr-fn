import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter, map, Observable, switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentType } from '../../../models/appointment.type';
import { AppointmentTypeService } from '../../../service/appointment.type/appointment-type.service';
import { AppointmentTypeCreateModalComponent } from '../create/modal/appointment-type-create-modal.component';

@Component({
  selector: 'app-appointment-type-list',
  templateUrl: './appointment-type-list.component.html',
  styleUrls: ['./appointment-type-list.component.css']
})
export class AppointmentTypeListComponent implements OnInit {
  appointmentTypes: Observable<AppointmentType[]>
  // addAppointmetTypeVisibility: boolean = false;
  constructor(private appointmentTypeService: AppointmentTypeService
    , private loggedInService: LoggedInService
    , private dialog: MatDialog
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find();
  }
  create() {
    const dialogRef = this.dialog.open(AppointmentTypeCreateModalComponent, {
      width: '30%',
      data: { action: undefined },
      position: {
        top: '8%', // Adjust as needed
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'created') {
        this.toastr.success("Appointmet Type Created")
        this.find()
      }
    })
  }
  edit(appointmetTypeId: number) {
    const dialogRef = this.dialog.open(AppointmentTypeCreateModalComponent, {
      width: '30%',
      data: { action: undefined, id: appointmetTypeId },
      position: {
        top: '8%', // Adjust as needed
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'created') {
        this.toastr.success("Appointmet Type Updated")
        this.find()
      }
    })

  }
  private find() {
    this.appointmentTypes = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.appointmentTypeService.retrieveAppointmentTypes(clinicId)),
      map((response: any) => response.records)
    )
  }
}
